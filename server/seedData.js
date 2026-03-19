const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category');
const Company = require('./models/Company');
const connectDB = require('./config/db');

dotenv.config();

const categories = [
  { name: 'Banks', slug: 'banks', icon: 'BuildingLibrary', description: 'Banking and financial institutions' },
  { name: 'Insurance', slug: 'insurance', icon: 'ShieldCheck', description: 'Insurance providers' },
  { name: 'Car Dealer', slug: 'car-dealer', icon: 'Car', description: 'Buy and sell automobiles' },
  { name: 'Jewelry Store', slug: 'jewelry-store', icon: 'Gem', description: 'Fine jewelry and watches' },
  { name: 'Electronics', slug: 'electronics', icon: 'Smartphone', description: 'Gadgets and electronics' },
  { name: 'Real Estate', slug: 'real-estate', icon: 'Home', description: 'Property and housing' },
  { name: 'Energy Supplier', slug: 'energy-supplier', icon: 'Zap', description: 'Electricity and gas providers' },
  { name: 'Fitness & Nutrition', slug: 'fitness-nutrition', icon: 'Dumbbell', description: 'Gyms, health, and wellness' },
  { name: 'Pet Store', slug: 'pet-store', icon: 'Dog', description: 'Supplies for your furry friends' }
];

const companiesData = [
  { name: 'Chase Bank', slug: 'chase-bank', website: 'chase.com', category: 'Banks', totalReviews: 1250, averageRating: 4.2, trustScore: 4.3 },
  { name: 'Geico', slug: 'geico', website: 'geico.com', category: 'Insurance', totalReviews: 3200, averageRating: 4.5, trustScore: 4.6 },
  { name: 'Tesla', slug: 'tesla', website: 'tesla.com', category: 'Car Dealer', totalReviews: 5400, averageRating: 4.8, trustScore: 4.9 },
  { name: 'Apple', slug: 'apple', website: 'apple.com', category: 'Electronics', totalReviews: 12000, averageRating: 4.9, trustScore: 5.0 },
  { name: 'Zillow', slug: 'zillow', website: 'zillow.com', category: 'Real Estate', totalReviews: 850, averageRating: 3.8, trustScore: 3.9 },
  { name: 'Shell Energy', slug: 'shell-energy', website: 'shellenergy.co.uk', category: 'Energy Supplier', totalReviews: 420, averageRating: 3.5, trustScore: 3.5 },
  { name: 'Anytime Fitness', slug: 'anytime-fitness', website: 'anytimefitness.com', category: 'Fitness & Nutrition', totalReviews: 1100, averageRating: 4.4, trustScore: 4.5 },
  { name: 'Petco', slug: 'petco', website: 'petco.com', category: 'Pet Store', totalReviews: 2100, averageRating: 4.1, trustScore: 4.2 },
  { name: 'Blue Nile', slug: 'blue-nile', website: 'bluenile.com', category: 'Jewelry Store', totalReviews: 600, averageRating: 4.7, trustScore: 4.7 }
];

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing categories
    await Category.deleteMany();
    console.log('Categories cleared');

    // Insert new categories
    const createdCategories = await Category.insertMany(categories);
    console.log(`${createdCategories.length} categories seeded`);

    // Clear existing companies to prevent duplicates with this seed
    await Company.deleteMany();
    console.log('Companies cleared');

    // Insert new companies with category references
    const companiesToInsert = companiesData.map(c => {
      const cat = createdCategories.find(catDoc => catDoc.name === c.category);
      return { ...c, category: cat ? cat._id : null };
    });

    await Company.insertMany(companiesToInsert);
    console.log(`${companiesToInsert.length} companies seeded`);

    console.log('Seeding completed successfully');
    process.exit();
  } catch (error) {
    console.error(`Error with seeding: ${error.message}`);
    process.exit(1);
  }
};

seedData();
