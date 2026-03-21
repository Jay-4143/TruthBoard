const express = require('express');
const router = express.Router();
const { protectBusiness } = require('../middleware/authMiddleware');
const {
  sendInvite,
  sendBulkInvite,
  getInviteHistory,
  verifyInviteToken
} = require('../controllers/inviteController');

// Protected business routes
router.post('/', protectBusiness, sendInvite);
router.post('/bulk', protectBusiness, sendBulkInvite);
router.get('/history', protectBusiness, getInviteHistory);

// Public route — verify invite token (no auth needed, customer clicks link)
router.get('/verify/:token', verifyInviteToken);

module.exports = router;
