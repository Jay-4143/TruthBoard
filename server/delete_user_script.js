const mongoose = require('mongoose');
const User = require('./models/User');
const Company = require('./models/Company');
const Review = require('./models/Review');
const dotenv = require('dotenv');

dotenv.config();

const deleteAccount = async (email) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const user = await User.findOne({ email });
    if (!user) {
      console.log(`User ${email} not found`);
      process.exit(0);
    }

    const userId = user._id;
    console.log(`Found user ${user.name} (${userId})`);

    // 1. Delete reviews by this user
    const deletedReviews = await Review.deleteMany({ userId });
    console.log(`Deleted ${deletedReviews.deletedCount} reviews`);

    // 2. Delete companies claimed by this user
    const deletedCompanies = await Company.deleteMany({ claimedBy: userId });
    console.log(`Deleted ${deletedCompanies.deletedCount} companies`);

    // 3. Delete the user
    await User.findByIdAndDelete(userId);
    console.log(`Deleted user ${email}`);

    console.log('Account removal complete');
    process.exit(0);
  } catch (error) {
    console.error('Error deleting account:', error);
    process.exit(1);
  }
};

const email = 'info@globaltrend.co.in';
deleteAccount(email);
