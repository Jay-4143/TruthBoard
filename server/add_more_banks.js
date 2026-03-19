const mongoose = require('mongoose');
const Company = require('./models/Company');
const Category = require('./models/Category');
const dotenv = require('dotenv');
dotenv.config();

async function addBanks() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const category = await Category.findOne({ slug: 'banks' });
    if (!category) {
      console.log('Banks category not found');
      return;
    }

    const newBanks = [
      {
        name: 'LendingClub',
        slug: 'lendingclub',
        website: 'lendingclub.com',
        category: category._id,
        description: 'LendingClub is an American peer-to-peer lending company, headquartered in San Francisco, California.',
        location: 'United States',
        trustScore: 4.7,
        totalReviews: 1560
      },
      {
        name: 'BankFive',
        slug: 'bankfive',
        website: 'bankfive.com',
        category: category._id,
        description: 'BankFive is a full-service community bank that has been serving Massachusetts and Rhode Island since 1855.',
        location: 'United States',
        trustScore: 4.5,
        totalReviews: 890
      },
      {
        name: 'Wells Fargo',
        slug: 'wells-fargo',
        website: 'wellsfargo.com',
        category: category._id,
        description: 'Wells Fargo & Company is an American multinational financial services company.',
        location: 'United States',
        trustScore: 4.2,
        totalReviews: 5400
      }
    ];

    for (const bank of newBanks) {
      await Company.findOneAndUpdate(
        { slug: bank.slug },
        bank,
        { upsert: true, new: true }
      );
      console.log(`Ensured bank exists: ${bank.name}`);
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

addBanks();
