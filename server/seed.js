const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Company = require('./models/Company');
const Review = require('./models/Review');
const User = require('./models/User');

dotenv.config();

const companies = [
  {
    name: 'Apple Inc.',
    slug: 'apple',
    website: 'apple.com',
    category: 'Technology',
    description: 'Apple Inc. is an American multinational technology company that specializes in consumer electronics, software, and online services.'
  },
  {
    name: 'Amazon',
    slug: 'amazon',
    website: 'amazon.com',
    category: 'E-commerce',
    description: 'Amazon.com, Inc. is an American multinational technology company which focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence.'
  },
  {
    name: 'Samsung Electronics',
    slug: 'samsung',
    website: 'samsung.com',
    category: 'Electronics',
    description: 'Samsung Electronics Co., Ltd. is a South Korean multinational electronics corporation headquartered in Yeongtong-gu, Suwon, South Korea.'
  },
  {
    name: 'Nike',
    slug: 'nike',
    website: 'nike.com',
    category: 'Apparel',
    description: 'Nike, Inc. is an American multinational corporation that is engaged in the design, development, manufacturing, and worldwide marketing and sales of footwear, apparel, equipment, accessories, and services.'
  },
  {
    name: 'Google',
    slug: 'google',
    website: 'google.com',
    category: 'Technology',
    description: 'Google LLC is an American multinational technology company that specializes in Internet-related services and products.'
  },
  {
    name: 'Microsoft',
    slug: 'microsoft',
    website: 'microsoft.com',
    category: 'Software',
    description: 'Microsoft Corporation is an American multinational technology corporation.'
  },
  {
    name: 'Tesla',
    slug: 'tesla',
    website: 'tesla.com',
    category: 'Automotive',
    description: 'Tesla, Inc. is an American electric vehicle and clean energy company.'
  }
];

const reviews = [
  { title: 'Amazing products', text: 'I love my new iPhone, it works perfectly.', rating: 5 },
  { title: 'Great service', text: 'The customer support was very helpful and fast.', rating: 5 },
  { title: 'Good but expensive', text: 'The quality is great but prices are reaching new heights.', rating: 4 },
  { title: 'A bit disappointing', text: 'The latest update made my device slower. Hoping for a fix.', rating: 3 },
  { title: 'Terrible delivery', text: 'It took forever to arrive and the box was damaged.', rating: 1 },
  { title: 'Outstanding quality', text: 'The build quality is second to none. Worth every penny.', rating: 5 },
  { title: 'Not worth the hype', text: 'Overpriced for what it offers. There are better alternatives.', rating: 2 },
  { title: 'Best in the business', text: 'Nobody beats their ecosystem and integration.', rating: 5 },
  { title: 'Decent experience', text: 'Overall okay, but some minor issues with the software.', rating: 4 },
  { title: 'Stay away', text: 'Worst purchase of my life. Never buying from them again.', rating: 1 }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Find or create a seed user
    let user = await User.findOne({ email: 'seeduser@truthboard.com' });
    if (!user) {
      user = await User.create({
        name: 'Seed User',
        email: 'seeduser@truthboard.com',
        password: 'password123', // In a real app, this should be hashed
        role: 'user'
      });
      console.log('Created seed user');
    }

    // Insert companies
    for (const compData of companies) {
      let company = await Company.findOne({ 
        $or: [{ website: compData.website }, { slug: compData.slug }] 
      });
      
      if (!company) {
        company = await Company.create(compData);
        console.log(`Created company: ${company.name}`);
      } else {
        console.log(`Company already exists: ${company.name}`);
      }

      // Add 5-8 random reviews for each company
      const numReviews = Math.floor(Math.random() * 4) + 5;
      for (let i = 0; i < numReviews; i++) {
        const randReview = reviews[Math.floor(Math.random() * reviews.length)];
        await Review.create({
          userId: user._id,
          companyId: company._id,
          rating: randReview.rating,
          title: randReview.title,
          reviewText: randReview.text,
          dateOfExperience: new Date(Date.now() - Math.floor(Math.random() * 100 * 24 * 60 * 60 * 1000))
        });
      }
      console.log(`Added reviews for ${company.name}`);
    }

    console.log('Database seeding completed successfully!');
    process.exit();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDB();
