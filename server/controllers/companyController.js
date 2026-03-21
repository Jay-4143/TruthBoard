const Company = require('../models/Company');
const Category = require('../models/Category');
const mongoose = require('mongoose');

const getCompanies = async (req, res) => {
  try {
    const { category, minRating, location, cityZip, claimed, hasResponse, sortBy, page = 1, limit = 10 } = req.query;
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

    if (hasResponse === 'true') {
      // Companies with at least one review containing a response
      // This is a bit complex since responses are nested in reviews.
      // Alternatives: add a flag to Company or just filter by responseCount if implemented.
      // For now, let's assume filtering by claimed is high priority.
    }

    if (category) {
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

    const sortObj = {};
    if (sortBy === 'highest_rated') sortObj.trustScore = -1;
    else if (sortBy === 'most_reviewed') sortObj.totalReviews = -1;
    else if (sortBy === 'newest') sortObj.createdAt = -1;
    else sortObj.name = 1;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const companies = await Company.find(query)
      .populate('category')
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

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
      .populate('category')
      .lean();
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

const getCompanyByIdOrSlug = async (req, res) => {
  try {
    const { identifier } = req.params;
    let company;

    if (mongoose.Types.ObjectId.isValid(identifier)) {
      company = await Company.findById(identifier).populate('category').lean();
    } else {
      company = await Company.findOne({ slug: identifier }).populate('category').lean();
    }

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
  getCompanyByIdOrSlug,
  searchCompanies,
  getCompanyByDomain,
  getTrendingCompanies,
  claimCompany
};
