const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Company = require('../models/Company');
const Review = require('../models/Review');

// @desc    Get company associated with the logged in user
// @route   GET /api/business/profile
// @access  Private/Business
router.get('/profile', protect, async (req, res) => {
  try {
    const company = await Company.findOne({ claimedBy: req.user._id }).populate('category');
    
    if (!company) {
      return res.status(404).json({ message: 'No company profile found for this user.' });
    }
    
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get dashboard stats
// @route   GET /api/business/stats
// @access  Private/Business
router.get('/stats', protect, async (req, res) => {
  try {
    const company = await Company.findOne({ claimedBy: req.user._id });
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    const recentReviews = await Review.find({ companyId: company._id })
      .populate('userId', 'name avatar location')
      .sort({ createdAt: -1 })
      .limit(5);

    // Get reviews from last 30 days for growth metric
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const newReviewsCount = await Review.countDocuments({
      companyId: company._id,
      createdAt: { $gte: thirtyDaysAgo }
    });

    res.json({
      averageRating: company.averageRating,
      totalReviews: company.totalReviews,
      trustScore: company.trustScore,
      ratingDistribution: company.ratingDistribution,
      newReviewsLast30Days: newReviewsCount,
      recentReviews,
      company: {
        name: company.name,
        logo: company.logo,
        website: company.website
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create company profile (Onboarding)
// @route   POST /api/business/create-profile
// @access  Private/Business
router.post('/create-profile', protect, async (req, res) => {
  try {
    const { name, website, category, description, logo, location, contactEmail } = req.body;

    // Check if company with same name or website exists
    const existingCompany = await Company.findOne({ 
      $or: [{ name }, { website: website.toLowerCase() }] 
    });

    if (existingCompany) {
      return res.status(400).json({ message: 'A company with this name or website already exists.' });
    }

    // Generate slug from name
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const company = await Company.create({
      name,
      slug,
      website: website.toLowerCase(),
      category,
      description,
      logo,
      location,
      contactEmail: contactEmail || req.user.email,
      isClaimed: true,
      claimedBy: req.user._id
    });

    // Update user record with company information
    const User = require('../models/User');
    await User.findByIdAndUpdate(req.user._id, {
      companyName: name,
      website: website.toLowerCase(),
      role: 'companyOwner'
    });

    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get all reviews for the company
// @route   GET /api/business/reviews
// @access  Private/Business
router.get('/reviews', protect, async (req, res) => {
  try {
    const company = await Company.findOne({ claimedBy: req.user._id });
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    const { status, rating, page = 1, limit = 10 } = req.query;
    const query = { companyId: company._id };

    if (status === 'unreplied') {
      query.reply = { $exists: false };
    } else if (status === 'replied') {
      query.reply = { $exists: true };
    }

    if (rating) {
      query.rating = parseInt(rating);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const reviews = await Review.find(query)
      .populate('userId', 'name avatar location')
      .sort({ createdAt: -1 })
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
});

// @desc    Reply to a review
// @route   POST /api/business/reviews/:id/reply
// @access  Private/Business
router.post('/reviews/:id/reply', protect, async (req, res) => {
  try {
    const { reviewText } = req.body;
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Verify the company belongs to the user
    const company = await Company.findOne({ _id: review.companyId, claimedBy: req.user._id });
    if (!company) {
      return res.status(401).json({ message: 'Not authorized to reply to this review' });
    }

    review.reply = {
      reviewText,
      createdAt: new Date(),
      isEdited: false
    };

    await review.save();
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
