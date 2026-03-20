const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
    index: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Please add a rating between 1 and 5'],
    index: true
  },
  title: {
    type: String,
    required: [true, 'Please add a title for the review'],
    trim: true,
    maxLength: 100
  },
  reviewText: {
    type: String,
    required: [true, 'Please add review text'],
    maxLength: 5000
  },
  dateOfExperience: {
    type: Date,
    required: [true, 'Please add the date of your experience']
  },
  status: {
    type: String,
    enum: ['active', 'flagged', 'removed'],
    default: 'active'
  },
  isEdited: {
    type: Boolean,
    default: false
  },
  editHistory: [
    {
      rating: Number,
      title: String,
      reviewText: String,
      editedAt: { type: Date, default: Date.now }
    }
  ],
  sentimentScore: {
    type: Number,
    default: 0 // 0 to 1, higher is more negative
  },
  isNegativeFlagged: {
    type: Boolean,
    default: false
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  flagCount: {
    type: Number,
    default: 0
  },
  reply: {
    reviewText: String,
    createdAt: { type: Date },
    isEdited: { type: Boolean, default: false },
    editedAt: Date
  }
}, {
  timestamps: true
});

// Enforce one review per user per company
reviewSchema.index({ userId: 1, companyId: 1 }, { unique: true });
reviewSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Review', reviewSchema);
