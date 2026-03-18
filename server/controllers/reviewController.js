const Review = require('../models/Review');
const Company = require('../models/Company');

const createReview = async (req, res) => {
  try {
    const { companyId, rating, title, reviewText, dateOfExperience } = req.body;

    if (!companyId || !rating || !title || !reviewText || !dateOfExperience) {
      return res.status(400).json({ message: 'Please provide all review fields' });
    }

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    console.log('Create Review Request Body:', req.body);
    console.log('User status in createReview:', req.user ? req.user._id : 'NULL');

    if (!req.user || !req.user._id) {
      console.log('ERROR: req.user is NULL or missing _id');
      return res.status(401).json({ message: 'Your session has expired. Please log in again.' });
    }

    const review = await Review.create({
      userId: req.user._id,
      companyId,
      rating,
      title,
      reviewText,
      dateOfExperience
    });

    // Increment review count for user
    const User = require('../models/User');
    await User.findByIdAndUpdate(req.user._id, { $inc: { reviewCount: 1 } });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCompanyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ companyId: req.params.companyId })
      .populate('userId', 'name avatar')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.user._id })
      .populate('companyId', 'name slug website')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateReview = async (req, res) => {
  try {
    const { rating, title, reviewText, dateOfExperience } = req.body;
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized to update this review' });
    }

    review.rating = rating || review.rating;
    review.title = title || review.title;
    review.reviewText = reviewText || review.reviewText;
    review.dateOfExperience = dateOfExperience || review.dateOfExperience;

    const updatedReview = await review.save();
    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized to delete this review' });
    }

    await Review.findByIdAndDelete(req.params.id);

    // Decrement review count for user
    const User = require('../models/User');
    await User.findByIdAndUpdate(req.user._id, { $inc: { reviewCount: -1 } });

    res.json({ message: 'Review removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCompanyReviews,
  createReview,
  getMyReviews,
  updateReview,
  deleteReview
};
