const mongoose = require('mongoose');
const Company = require('./models/Company');
const Category = require('./models/Category');
const dotenv = require('dotenv');
dotenv.config();

async function checkBanks() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const category = await Category.findOne({ slug: 'banks' });
    if (category) {
      const companies = await Company.find({ category: category._id });
      console.log(`--- COMPANIES IN ${category.name} ---`);
      companies.forEach(c => {
        console.log(`Name: ${c.name} | Location: ${c.location} | ID: ${c._id}`);
      });
      console.log('---------------------------');
    } else {
      console.log('Banks category not found');
    }
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

checkBanks();
