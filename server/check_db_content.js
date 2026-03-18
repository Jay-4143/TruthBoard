const mongoose = require('mongoose');
const User = require('./models/User');
const Review = require('./models/Review');
const dotenv = require('dotenv');
dotenv.config();

async function checkReviews() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    const allReviews = await Review.find({}).populate('userId', 'email name');
    console.log(`Total reviews found in system: ${allReviews.length}`);
    
    allReviews.forEach(r => {
      console.log(`Review by: ${r.userId? r.userId.email : 'Unknown User'} | Title: ${r.title} | Rating: ${r.rating}`);
    });

    const allUsers = await User.find({});
    console.log(`Total users found in system: ${allUsers.length}`);
    allUsers.forEach(u => {
      console.log(`User: ${u.email} | Name: ${u.name} | ReviewCount Field: ${u.reviewCount} | ID: ${u._id}`);
    });
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

checkReviews();
