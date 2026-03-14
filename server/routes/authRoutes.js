const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const { registerUser, loginUser, getMe, updateProfile, changePassword } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validate');

router.post('/register', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], validate, registerUser);

router.post('/login', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
], validate, loginUser);

router.get('/me', protect, getMe);

router.put('/update-profile', protect, [
  check('bio', 'Bio must be less than 500 characters').optional().isLength({ max: 500 })
], validate, updateProfile);

router.put('/change-password', protect, [
  check('currentPassword', 'Current password is required').exists(),
  check('newPassword', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], validate, changePassword);

module.exports = router;
