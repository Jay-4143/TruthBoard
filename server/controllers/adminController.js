const User = require('../models/User');
const Review = require('../models/Review');
const Company = require('../models/Company');
const ReviewFlag = require('../models/ReviewFlag');

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalReviews = await Review.countDocuments();
    const totalCompanies = await Company.countDocuments();
    const flaggedReviews = await Review.countDocuments({ status: 'flagged' });

    res.json({
      totalUsers,
      totalReviews,
      totalCompanies,
      flaggedReviews
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 }).lean();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user role or status
// @route   PUT /api/admin/users/:id
const updateUser = async (req, res) => {
  try {
    const { role, isActive } = req.body;
    const user = await User.findById(req.params.id);
    if (user) {
      if (role !== undefined) user.role = role;
      if (isActive !== undefined) user.isActive = isActive;
      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new company
// @route   POST /api/admin/companies
const createCompany = async (req, res) => {
  try {
    const { name, website, category, description, logo } = req.body;
    const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    
    const company = await Company.create({
      name,
      website,
      category,
      description,
      logo,
      slug
    });
    
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a company
// @route   PUT /api/admin/companies/:id
const updateCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (company) {
      company.name = req.body.name || company.name;
      company.website = req.body.website || company.website;
      company.category = req.body.category || company.category;
      company.description = req.body.description || company.description;
      company.logo = req.body.logo || company.logo;
      company.isClaimed = req.body.isClaimed !== undefined ? req.body.isClaimed : company.isClaimed;
      
      const updatedCompany = await company.save();
      res.json(updatedCompany);
    } else {
      res.status(404).json({ message: 'Company not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a company
// @route   DELETE /api/admin/companies/:id
const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (company) {
      // Also delete all reviews for this company
      await Review.deleteMany({ companyId: req.params.id });
      await Company.findByIdAndDelete(req.params.id);
      res.json({ message: 'Company and its reviews deleted' });
    } else {
      res.status(404).json({ message: 'Company not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get flagged reviews
// @route   GET /api/admin/flagged-reviews
const getFlaggedReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ status: 'flagged' })
      .populate('userId', 'name email')
      .populate('companyId', 'name')
      .sort({ createdAt: -1 })
      .lean();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Moderate review (approve/reject)
// @route   PUT /api/admin/reviews/:id/moderate
const moderateReview = async (req, res) => {
  try {
    const { status } = req.body; // 'active' or 'removed'
    const review = await Review.findById(req.params.id);
    if (review) {
      review.status = status;
      if (status === 'active') {
        review.flagCount = 0; // Reset flags if approved
      }
      await review.save();
      res.json({ message: `Review marked as ${status}` });
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStats,
  getUsers,
  updateUser,
  getFlaggedReviews,
  moderateReview,
  createCompany,
  updateCompany,
  deleteCompany
};
