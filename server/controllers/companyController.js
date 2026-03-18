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

const getCompanyByDomain = async (req, res) => {
  try {
    const { domain } = req.params;
    if (!domain) {
      return res.status(400).json({ message: 'Domain is required' });
    }

    console.log('Search request for domain:', domain);
    // Clean domain: remove http, https, www
    let cleanDomain = domain.toLowerCase().trim();
    cleanDomain = cleanDomain.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];
    console.log('Cleaned domain:', cleanDomain);

    // Find company by website
    console.log('Searching for company in DB...');
    const company = await Company.findOne({
      website: { $regex: cleanDomain, $options: 'i' }
    });
    console.log('Company found:', company ? company.name : 'NOT FOUND');

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    // Get reviews and calculate stats
    console.log('Fetching reviews for:', company._id);
    const Review = require('../models/Review');
    const reviews = await Review.find({ companyId: company._id });
    console.log('Reviews count:', reviews.length);
    
    const count = reviews.length;
    const averageRating = count > 0 
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / count).toFixed(1)
      : 0;

    console.log('Calculated stats:', { averageRating, count });
    res.json({
      name: company.name,
      website: company.website,
      averageRating: parseFloat(averageRating),
      reviewCount: count,
      slug: company.slug
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCompanies,
  getCompanyBySlug,
  searchCompanies,
  getCompanyByDomain
};
