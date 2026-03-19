const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Company = require('./models/Company');
const Category = require('./models/Category');
const connectDB = require('./config/db');

dotenv.config();

const check = async () => {
  await connectDB();
  const companyCount = await Company.countDocuments();
  const categoryCount = await Category.countDocuments();
  console.log(`Company Count: ${companyCount}`);
  console.log(`Category Count: ${categoryCount}`);
  if (companyCount > 0) {
    const sample = await Company.findOne().populate('category');
    console.log('Sample Company Category:', JSON.stringify(sample.category));
  }
  process.exit();
};

check();
