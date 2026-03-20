const express = require('express');
const router = express.Router();
const { getBusinessNotifications, markAsRead, markAllAsRead } = require('../controllers/notificationController');
const { protectBusiness } = require('../middleware/authMiddleware');

router.get('/', protectBusiness, getBusinessNotifications);
router.put('/:id/read', protectBusiness, markAsRead);
router.put('/read-all', protectBusiness, markAllAsRead);

module.exports = router;
