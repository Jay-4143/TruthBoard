const Company = require('../models/Company');
const Category = require('../models/Category');
const mongoose = require('mongoose');

const getCompanies = async (req, res) => {
  try {
    const { category, minRating, location, cityZip, claimed, page = 1, limit = 10 } = req.query;
    const query = {};

    if (minRating) {
      query.trustScore = { $gte: parseFloat(minRating) };
    }

    if (location) {
      query.location = { $regex: new RegExp(`^${location}$`, 'i') };
    }

    if (cityZip) {
      query.location = { $regex: new RegExp(cityZip, 'i') };
    }

    if (claimed === 'true' || claimed === true) {
      query.isClaimed = true;
    }

    if (category) {
      // Find category by slug if it's not a valid ObjectId
      const categoryDoc = await Category.findOne({ 
        $or: [
          { slug: category },
          { _id: mongoose.Types.ObjectId.isValid(category) ? category : null }
        ].filter(Boolean)
      });
      if (categoryDoc) {
        query.category = categoryDoc._id;
      }
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const companies = await Company.find(query)
      .populate('category')
      .sort({ name: 1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Company.countDocuments(query);
    console.log(`GET /api/companies - Category: ${category}, Query: ${JSON.stringify(query)}, Found: ${companies.length}/${total}`);

    res.json({
      companies,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTrendingCompanies = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const companies = await Company.find({})
      .sort({ totalReviews: -1, trustScore: -1 })
      .limit(limit)
      .populate('category');
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const claimCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    if (company.isClaimed) {
      return res.status(400).json({ message: 'Company is already claimed' });
    }

    company.isClaimed = true;
    company.claimedBy = req.user._id;
    await company.save();

    res.json({ message: 'Company claimed successfully', company });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCompanyBySlug = async (req, res) => {
  try {
    const company = await Company.findOne({ slug: req.params.slug }).populate('category');
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
    
    // Use text search if query is longer than 2 chars, otherwise regex
    let companies;
    if (q.length > 2) {
      companies = await Company.find(
        { $text: { $search: q } },
        { score: { $meta: 'textScore' } }
      )
      .sort({ score: { $meta: 'textScore' } })
      .limit(limit)
      .populate('category');
    } else {
      companies = await Company.find({
        name: { $regex: q, $options: 'i' }
      })
      .limit(limit)
      .populate('category');
    }
    
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

    let cleanDomain = domain.toLowerCase().trim();
    cleanDomain = cleanDomain.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];

    const company = await Company.findOne({
      website: { $regex: cleanDomain, $options: 'i' }
    }).populate('category');

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCompanies,
  getCompanyBySlug,
  searchCompanies,
  getCompanyByDomain,
  getTrendingCompanies,
  claimCompany
};
