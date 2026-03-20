const express = require('express');
const router = express.Router();
const { 
  registerBusiness, 
  loginBusiness, 
  getBusinessMe,
  checkCompanyAvailability
} = require('../controllers/businessAuthController');
const { protectBusiness } = require('../middleware/authMiddleware');

router.post('/register', registerBusiness);
router.post('/login', loginBusiness);
router.post('/check-company', checkCompanyAvailability);
router.get('/me', protectBusiness, getBusinessMe);

module.exports = router;
