const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const { registerUser, loginUser, getMe, updateProfile, changePassword, phoneLogin, deleteUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validate');
const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // Limit each IP to 10 login attempts per 15 mins
  message: 'Too many login attempts, please try again after 15 minutes',
});

router.post('/register', authLimiter, [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], validate, registerUser);

router.post('/login', loginLimiter, [
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

router.post('/phone-login', loginLimiter, [
  check('idToken', 'ID Token is required').not().isEmpty()
], validate, phoneLogin);

router.delete('/delete-account', protect, deleteUser);

module.exports = router;
