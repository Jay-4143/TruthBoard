const express = require('express');
const router = express.Router();
const { getCategories, getCategoryBySlug, createCategory } = require('../controllers/categoryController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.get('/', getCategories);
router.get('/:slug', getCategoryBySlug);

// Only admins can create categories
router.post('/', protect, authorize('admin'), createCategory);

module.exports = router;
