const mongoose = require('mongoose');
const Company = require('./models/Company');
const dotenv = require('dotenv');
dotenv.config();

async function migrateLocations() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const result = await Company.updateMany(
      { location: { $exists: false } },
      { $set: { location: 'United States' } }
    );
    console.log(`Migration complete. Updated ${result.modifiedCount} companies.`);
    
    // Also check how many have 'United States' now
    const usCount = await Company.countDocuments({ location: 'United States' });
    console.log(`Total companies with location 'United States': ${usCount}`);
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

migrateLocations();
