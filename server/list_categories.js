const mongoose = require('mongoose');
const Category = require('./models/Category');
const dotenv = require('dotenv');
dotenv.config();

async function listCategories() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const categories = await Category.find({});
    console.log('--- DATABASE CATEGORIES ---');
    categories.forEach(c => {
      console.log(`Name: ${c.name} | Slug: ${c.slug}`);
    });
    console.log('---------------------------');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

listCategories();
