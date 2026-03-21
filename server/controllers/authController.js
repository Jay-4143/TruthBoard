const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const admin = require('../config/firebase-admin.config');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

const registerUser = async (req, res) => {
  try {
    const fs = require('fs');
    fs.appendFileSync('debug.log', `[${new Date().toISOString()}] Registration Body: ${JSON.stringify(req.body)}\n`);
    console.log('Registration Request Body:', req.body);
    const { name, email, password, idToken, role, companyName, website, jobTitle } = req.body;

    if (!idToken) {
      return res.status(400).json({ message: 'Phone verification token is required' });
    }

    // Verify Firebase ID Token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const phoneNumber = decodedToken.phone_number;

    if (!phoneNumber) {
      return res.status(400).json({ message: 'Invalid phone number in token' });
    }

    const userExists = await User.findOne({ $or: [{ email }, { phoneNumber }] });
    if (userExists) {
      return res.status(400).json({ 
        message: userExists.email === email 
          ? 'User with this email already exists' 
          : 'User with this phone number already exists' 
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const finalRole = (role === 'companyOwner' || role === 'admin') ? role : 'user';
    
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phoneNumber,
      isVerified: true,
      role: finalRole,
      companyName: companyName || '',
      website: website || '',
      jobTitle: jobTitle || ''
    });

    fs.appendFileSync('debug.log', `[${new Date().toISOString()}] Created User: ${user.email} with role: ${user.role}\n`);
    console.log('User created successfully:', user.email, 'Role:', user.role);

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email: rawEmail, password } = req.body;
    const email = rawEmail.toLowerCase();
    
    const fs = require('fs');
    fs.appendFileSync('debug.log', `[${new Date().toISOString()}] Login Attempt: ${email}\n`);
    
    console.log('Login attempt for email:', email);

    const user = await User.findOne({ email });
    if (!user) {
      console.log('Login failed: User not found with email:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: 'This account has been deactivated by an administrator.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match results:', isMatch);

    if (isMatch) {
      console.log('Login successful for:', user.email);
      
      // Role recovery: If user is 'user' but has a company, upgrade to 'companyOwner'
      if (user.role === 'user') {
        const Company = require('../models/Company');
        const company = await Company.findOne({ claimedBy: user._id });
        if (company) {
          user.role = 'companyOwner';
          await user.save();
          console.log('User role recovered to companyOwner for:', user.email);
        }
      }

      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        token: generateToken(user._id)
      });
    } else {
      console.log('Login failed: Password mismatch for email:', email);
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

const getMe = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.avatar = req.body.avatar || user.avatar;
    user.bio = req.body.bio !== undefined ? req.body.bio : user.bio;
    user.location = req.body.location || user.location;
    user.name = req.body.name || user.name;
    user.language = req.body.language || user.language;
    if (req.body.notificationPreferences) {
      user.notificationPreferences = { ...user.notificationPreferences, ...req.body.notificationPreferences };
    }

    const updatedUser = await user.save();
    updatedUser.password = undefined;

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect current password' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();
    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const phoneLogin = async (req, res) => {
  try {
    // 🔥 FIX: support both token & idToken
    const idToken = req.body.idToken || req.body.token;

    if (!idToken) {
      return res.status(400).json({ message: 'Token missing' });
    }

    // Verify Firebase ID Token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const phoneNumber = decodedToken.phone_number;

    if (!phoneNumber) {
      return res.status(400).json({ message: 'Invalid phone number in token' });
    }

    // Find or create user
    let user = await User.findOne({ phoneNumber });

    if (!user) {
      user = await User.create({
        name: `User ${phoneNumber.slice(-4)}`,
        phoneNumber,
        isVerified: true,
        role: 'user'
      });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: 'This account has been deactivated by an administrator.' });
    }

    // Role recovery: If user is 'user' but has a company, upgrade to 'companyOwner'
    if (user.role === 'user') {
      const Company = require('../models/Company');
      const company = await Company.findOne({ claimedBy: user._id });
      if (company) {
        user.role = 'companyOwner';
        await user.save();
        console.log('User role recovered to companyOwner (Phone Login) for:', user.phoneNumber);
      }
    }

    res.json({
      _id: user.id,
      name: user.name,
      phoneNumber: user.phoneNumber,
      role: user.role,
      token: generateToken(user._id)
    });
  } catch (error) {
    console.error('Phone login error:', error.message);
    res.status(500).json({ message: 'Authentication failed' });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const Review = require('../models/Review');
    await Review.deleteMany({ userId: req.user._id });

    await User.findByIdAndDelete(req.user._id);

    res.json({ message: 'User and all associated reviews deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  changePassword,
  phoneLogin,
  deleteUser
};