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

module.exports = {
  getCompanyReviews,
  createReview
};
