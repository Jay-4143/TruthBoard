const express = require('express');
const router = express.Router();
const { getNotifications, markAsRead, markAllAsRead } = require('../controllers/notificationController');
const { protectEither } = require('../middleware/authMiddleware');

router.get('/', protectEither, getNotifications);
router.put('/:id/read', protectEither, markAsRead);
router.put('/read-all', protectEither, markAllAsRead);

module.exports = router;
