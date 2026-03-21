const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BusinessAccount',
    required: true
  },
  type: {
    type: String,
    enum: ['NEW_REVIEW', 'GENERAL', 'NEGATIVE_REVIEW', 'REVIEW_REPLY', 'REVIEW_FLAGGED'],
    default: 'NEW_REVIEW'
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  link: {
    type: String // URL or internal route
  },
  read: {
    type: Boolean,
    default: false
  },
  reviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Notification', notificationSchema);
