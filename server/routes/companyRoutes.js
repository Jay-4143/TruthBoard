const express = require('express');
const router = express.Router();
const { getCompanies, getCompanyBySlug, searchCompanies } = require('../controllers/companyController');

router.get('/search', searchCompanies);
router.get('/', getCompanies);
router.get('/:slug', getCompanyBySlug);

module.exports = router;
