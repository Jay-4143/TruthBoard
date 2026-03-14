const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Company = require('./models/Company');
const Review = require('./models/Review');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Company.deleteMany();
    await Review.deleteMany();

    const createdUsers = await User.insertMany([
      {
        name: 'Admin User',
        email: 'admin@truthboard.com',
        password: 'password123'
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      }
    ]);

    const adminUserId = createdUsers[0]._id;

    const createdCompanies = await Company.insertMany([
      {
        name: 'Perigold',
        slug: 'perigold',
        website: 'https://www.perigold.com',
        category: 'Home & Furniture',
        description: 'Luxury home furnishings and decor.'
      },
      {
        name: 'Wayfair',
        slug: 'wayfair',
        website: 'https://www.wayfair.com',
        category: 'Home & Furniture',
        description: 'Everything home for every budget.'
      },
      {
        name: 'Amazon',
        slug: 'amazon',
        website: 'https://www.amazon.com',
        category: 'Electronics',
        description: 'Online retailer, manufacturer of electronic book readers, and Web services provider.'
      },
      {
        name: 'Tesla',
        slug: 'tesla',
        website: 'https://www.tesla.com',
        category: 'Automotive',
        description: 'Electric vehicles, giant batteries and solar panels.'
      },
      {
        name: 'Apple',
        slug: 'apple',
        website: 'https://www.apple.com',
        category: 'Electronics',
        description: 'Think Different.'
      },
      {
        name: 'Nike',
        slug: 'nike',
        website: 'https://www.nike.com',
        category: 'Fashion',
        description: 'Just Do It.'
      },
      {
        name: 'TechFlow Solutions',
        slug: 'techflow-solutions',
        website: 'https://techflow.example.com',
        category: 'Software Development',
        description: 'TechFlow Solutions is an industry leader in providing enterprise scalable software.'
      },
      {
        name: 'Bright Horizons Banking',
        slug: 'bright-horizons-banking',
        website: 'https://brighthorizons.example.com',
        category: 'Finance',
        description: 'Your trusted partner in financial growth and modern banking solutions.'
      },
      {
        name: 'GreenEarth Coffee',
        slug: 'greenearth-coffee',
        website: 'https://greenearth.example.com',
        category: 'Food & Beverage',
        description: 'Sustainably sourced, ethically brewed. Best coffee in town.'
      }
    ]);

    await Review.insertMany([
      {
        userId: createdUsers[1]._id,
        companyId: createdCompanies[0]._id,
        rating: 5,
        title: 'Amazing software team!',
        reviewText: 'Their developers were incredibly professional and delivered our application ahead of schedule.',
        dateOfExperience: new Date()
      },
      {
        userId: adminUserId,
        companyId: createdCompanies[0]._id,
        rating: 4,
        title: 'Great service',
        reviewText: 'Solid work overall, minor bugs but quickly fixed.',
        dateOfExperience: new Date()
      },
      {
        userId: createdUsers[1]._id,
        companyId: createdCompanies[1]._id,
        rating: 1,
        title: 'Terrible customer service',
        reviewText: 'Waited on hold for 3 hours just to update my address. Unacceptable.',
        dateOfExperience: new Date()
      }
    ]);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
