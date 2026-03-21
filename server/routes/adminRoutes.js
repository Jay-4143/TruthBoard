const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const { 
  getStats, 
  getUsers, 
  updateUser, 
  getFlaggedReviews, 
  moderateReview,
  createCompany,
  updateCompany,
  deleteCompany
} = require('../controllers/adminController');

// All routes are protected and require admin role
router.use(protect);
router.use(admin);

router.get('/stats', getStats);
router.get('/users', getUsers);
router.put('/users/:id', updateUser);
router.get('/flagged-reviews', getFlaggedReviews);
router.put('/reviews/:id/moderate', moderateReview);

// Company Management
router.post('/companies', createCompany);
router.put('/companies/:id', updateCompany);
router.delete('/companies/:id', deleteCompany);

module.exports = router;
