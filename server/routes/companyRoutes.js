const express = require('express');
const router = express.Router();
const { getCompanies, getCompanyBySlug, searchCompanies, getCompanyByDomain } = require('../controllers/companyController');

router.get('/search', searchCompanies);
router.get('/domain/:domain', getCompanyByDomain);
router.get('/', getCompanies);
router.get('/:slug', getCompanyBySlug);

module.exports = router;
