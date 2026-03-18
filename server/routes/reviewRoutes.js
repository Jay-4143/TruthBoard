const express = require('express');
const router = express.Router();
const { getCompanyReviews, createReview, getMyReviews, updateReview, deleteReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

router.get('/company/:companyId', getCompanyReviews);
router.get('/me', protect, getMyReviews);
router.post('/', protect, createReview);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;
