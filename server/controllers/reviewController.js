const Review = require('../models/Review');
const Company = require('../models/Company');
const { updateCompanyStats } = require('../utils/ratingService');

const createReview = async (req, res) => {
  try {
    const { companyId, rating, title, reviewText, dateOfExperience } = req.body;

    if (!companyId || !rating || !title || !reviewText || !dateOfExperience) {
      return res.status(400).json({ message: 'Please provide all review fields' });
    }

    const experienceDate = new Date(dateOfExperience);
    const today = new Date();
    if (experienceDate > today) {
      return res.status(400).json({ message: 'Date of experience cannot be in the future' });
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

    // Update company stats
    await updateCompanyStats(companyId);

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCompanyReviews = async (req, res) => {
  try {
    const { companyId } = req.params;
    const { sort, rating, page = 1, limit = 10 } = req.query;
    
    const query = { companyId, status: { $ne: 'removed' } };
    
    if (rating) {
      query.rating = parseInt(rating);
    }

    let sortQuery = { createdAt: -1 }; // Default: newest
    if (sort === 'highest') {
      sortQuery = { rating: -1, createdAt: -1 };
    } else if (sort === 'lowest') {
      sortQuery = { rating: 1, createdAt: -1 };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const reviews = await Review.find(query)
      .populate('userId', 'name avatar location isVerified')
      .sort(sortQuery)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Review.countDocuments(query);

    res.json({
      reviews,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.user._id })
      .populate('companyId', 'name slug website logo')
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

    // Save history before updating
    review.editHistory.push({
      rating: review.rating,
      title: review.title,
      reviewText: review.reviewText,
      editedAt: new Date()
    });

    review.rating = rating || review.rating;
    review.title = title || review.title;
    review.reviewText = reviewText || review.reviewText;
    review.isEdited = true;

    if (dateOfExperience) {
      const experienceDate = new Date(dateOfExperience);
      const today = new Date();
      if (experienceDate > today) {
        return res.status(400).json({ message: 'Date of experience cannot be in the future' });
      }
      review.dateOfExperience = dateOfExperience;
    }

    const updatedReview = await review.save();
    
    // Update company stats
    await updateCompanyStats(review.companyId);

    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const flagReview = async (req, res) => {
  try {
    const { reason, description } = req.body;
    const reviewId = req.params.id;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    const ReviewFlag = require('../models/ReviewFlag');
    
    // Check if user already flagged this review
    const existingFlag = await ReviewFlag.findOne({ userId: req.user._id, reviewId });
    if (existingFlag) {
      return res.status(400).json({ message: 'You have already flagged this review' });
    }

    await ReviewFlag.create({
      reviewId,
      userId: req.user._id,
      reason,
      description
    });

    // Increment flag count on review
    review.flagCount += 1;
    if (review.flagCount >= 5) {
      review.status = 'flagged';
    }
    await review.save();

    res.json({ message: 'Review flagged successfully' });
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

    // Update company stats
    await updateCompanyStats(review.companyId);

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
  deleteReview,
  flagReview
};
