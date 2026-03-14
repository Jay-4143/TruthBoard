const Company = require('../models/Company');

const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find({});
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCompanyBySlug = async (req, res) => {
  try {
    const company = await Company.findOne({ slug: req.params.slug });
    if (company) {
      res.json(company);
    } else {
      res.status(404).json({ message: 'Company not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchCompanies = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.json([]);
    }
    
    const limit = parseInt(req.query.limit) || 10;
    const companies = await Company.find({
      name: { $regex: q, $options: 'i' }
    }).limit(limit);
    
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCompanies,
  getCompanyBySlug,
  searchCompanies
};
