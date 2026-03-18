const mongoose = require('mongoose');
const User = require('./server/models/User');
const dotenv = require('dotenv');
dotenv.config({ path: './server/.env' });

async function checkUser() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    const email = 'info@globaltrend.co.in';
    const user = await User.findOne({ email });
    
    if (user) {
      console.log('User found:');
      console.log('ID:', user._id);
      console.log('Email:', user.email);
      console.log('Name:', user.name);
      console.log('Has Password Hash:', !!user.password);
    } else {
      console.log('User not found with email:', email);
      
      // List all users to see what emails are there
      const allUsers = await User.find({}, 'email');
      console.log('All user emails:', allUsers.map(u => u.email));
    }
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

checkUser();
