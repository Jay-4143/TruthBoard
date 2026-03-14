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

    const review = await Review.create({
      userId: req.user.id,
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
