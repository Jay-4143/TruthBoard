const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

async function fixUser() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    const email = 'info@globaltrend.co.in';
    let user = await User.findOne({ email });
    
    if (!user) {
      console.log('User not found. Creating user...');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('Global@345', salt);
      user = await User.create({
        name: 'Jay',
        email: email,
        password: hashedPassword,
        role: 'user'
      });
      console.log('User created:', user.email);
    } else {
      console.log('User found. Resetting password...');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('Global@345', salt);
      user.password = hashedPassword;
      await user.save();
      console.log('Password reset for:', user.email);
    }
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

fixUser();
