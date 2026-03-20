const express = require('express');
const router = express.Router();
const { getCompanies, getCompanyByIdOrSlug, searchCompanies, getCompanyByDomain, getTrendingCompanies, claimCompany } = require('../controllers/companyController');
const { protect } = require('../middleware/authMiddleware');

router.get('/trending', getTrendingCompanies);
router.get('/search', searchCompanies);
router.get('/domain/:domain', getCompanyByDomain);
router.get('/', getCompanies);
router.get('/:identifier', getCompanyByIdOrSlug);

// Protected routes
router.post('/:id/claim', protect, claimCompany);

module.exports = router;
