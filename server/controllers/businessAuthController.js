const BusinessAccount = require('../models/BusinessAccount');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const admin = require('../config/firebase-admin.config');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

const registerBusiness = async (req, res) => {
  try {
    const { name, email, password, idToken, companyName, website, jobTitle } = req.body;

    if (!idToken) {
      return res.status(400).json({ message: 'Phone verification token is required' });
    }

    // Verify Firebase ID Token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const phoneNumber = decodedToken.phone_number;

    if (!phoneNumber) {
      return res.status(400).json({ message: 'Invalid phone number in token' });
    }

    const accountExists = await BusinessAccount.findOne({ $or: [{ email }, { phoneNumber }] });
    if (accountExists) {
      return res.status(400).json({ 
        message: accountExists.email === email 
          ? 'Business account with this email already exists' 
          : 'Business account with this phone number already exists' 
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const account = await BusinessAccount.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phoneNumber,
      isVerified: true,
      companyName: companyName || '',
      website: website || '',
      jobTitle: jobTitle || ''
    });

    if (account) {
      res.status(201).json({
        _id: account.id,
        name: account.name,
        email: account.email,
        role: account.role,
        companyName: account.companyName,
        website: account.website,
        token: generateToken(account._id)
      });
    } else {
      res.status(400).json({ message: 'Invalid business account data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginBusiness = async (req, res) => {
  try {
    const { email: rawEmail, password } = req.body;
    const email = rawEmail.toLowerCase();

    const account = await BusinessAccount.findOne({ email });
    if (!account) {
      return res.status(401).json({ message: 'Invalid business credentials' });
    }

    const isMatch = await bcrypt.compare(password, account.password);

    if (isMatch) {
      res.json({
        _id: account.id,
        name: account.name,
        email: account.email,
        role: account.role,
        companyName: account.companyName,
        website: account.website,
        token: generateToken(account._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid business credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBusinessMe = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
       // This will be populated by a protectBusiness middleware
      return res.status(401).json({ message: 'Not authorized as business' });
    }
    const account = await BusinessAccount.findById(req.user._id).select('-password');
    res.json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const checkCompanyAvailability = async (req, res) => {
  try {
    const { companyName, website } = req.body;
    const Company = require('../models/Company');

    const existingCompany = await Company.findOne({ 
      $or: [
        { name: companyName }, 
        { website: website ? website.toLowerCase() : '' }
      ] 
    });

    if (existingCompany && existingCompany.isClaimed) {
      return res.status(400).json({ 
        message: 'This company is already registered and claimed by another business user.' 
      });
    }

    res.json({ available: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerBusiness,
  loginBusiness,
  getBusinessMe,
  checkCompanyAvailability
};
