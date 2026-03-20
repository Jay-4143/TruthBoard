const express = require('express');
const router = express.Router();
const { getCompanyReviews, createReview, getMyReviews, updateReview, deleteReview, flagReview } = require('../controllers/reviewController');
const { protect, protectEither } = require('../middleware/authMiddleware');

router.get('/company/:companyId', getCompanyReviews);
router.get('/me', protect, getMyReviews);
router.post('/', protect, createReview);
router.post('/:id/flag', protectEither, flagReview);
router.put('/:id', protect, updateReview);
router.delete('/:id', protectEither, deleteReview);

module.exports = router;
