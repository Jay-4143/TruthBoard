const mongoose = require('mongoose');
const Company = require('./models/Company');
const dotenv = require('dotenv');
dotenv.config();

async function updateLocation() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const company = await Company.findOne({ name: /Chase/i });
    if (company) {
      company.location = 'France';
      await company.save();
      console.log(`Updated ${company.name} location to France`);
    } else {
      console.log('Chase Bank not found');
    }
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

updateLocation();
