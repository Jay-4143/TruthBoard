const mongoose = require('mongoose');
const User = require('./models/User');
const Review = require('./models/Review');
const dotenv = require('dotenv');
dotenv.config();

async function migrate() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    const sourceEmail = 'vasanijay3008@gmail.com';
    const targetEmail = 'info@globaltrend.co.in';
    
    const sourceUser = await User.findOne({ email: sourceEmail });
    const targetUser = await User.findOne({ email: targetEmail });
    
    if (!sourceUser || !targetUser) {
      console.log('User(s) not found. Migration aborted.');
      return;
    }
    
    console.log(`Moving reviews from ${sourceUser._id} to ${targetUser._id}`);
    
    const result = await Review.updateMany(
      { userId: sourceUser._id },
      { $set: { userId: targetUser._id } }
    );
    
    console.log(`Successfully moved ${result.modifiedCount} reviews.`);
    
    // Update target user review count
    const reviewCount = await Review.countDocuments({ userId: targetUser._id });
    targetUser.reviewCount = reviewCount;
    await targetUser.save();
    console.log(`Updated reviewCount for ${targetEmail} to ${reviewCount}`);

    // Update source user review count (should be 0)
    sourceUser.reviewCount = 0;
    await sourceUser.save();
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

migrate();
