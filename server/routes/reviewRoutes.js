const express = require('express');
const router = express.Router();
const { getCompanyReviews, createReview, getMyReviews, updateReview, deleteReview, flagReview } = require('../controllers/reviewController');
const { protect, protectEither } = require('../middleware/authMiddleware');

router.get('/company/:companyId', getCompanyReviews);
router.get('/me', protectEither, getMyReviews);
router.post('/', protectEither, createReview);
router.post('/:id/flag', protectEither, flagReview);
router.put('/:id', protectEither, updateReview);
router.delete('/:id', protectEither, deleteReview);

module.exports = router;
