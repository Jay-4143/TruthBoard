const express = require('express');
const router = express.Router();
const { getCompanyReviews, createReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

router.get('/company/:companyId', getCompanyReviews);
router.post('/', protect, createReview);

module.exports = router;
