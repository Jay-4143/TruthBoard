const mongoose = require('mongoose');

const reviewFlagSchema = new mongoose.Schema({
  reviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
    required: true,
    index: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reason: {
    type: String,
    required: [true, 'Please provide a reason for flagging'],
    enum: ['unauthentic', 'spam', 'abusive', 'privacy', 'other']
  },
  description: {
    type: String,
    maxLength: 500
  },
  status: {
    type: String,
    enum: ['pending', 'resolved', 'dismissed'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// One flag per user per review
reviewFlagSchema.index({ userId: 1, reviewId: 1 }, { unique: true });

module.exports = mongoose.model('ReviewFlag', reviewFlagSchema);
