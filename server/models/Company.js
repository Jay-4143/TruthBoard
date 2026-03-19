const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a company name'],
    unique: true,
    trim: true,
    index: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  website: {
    type: String,
    required: [true, 'Please add a website URL'],
    unique: true,
    lowercase: true,
    trim: true
  },
  logo: {
    type: String,
    default: null
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: false
  },
  description: {
    type: String,
    maxLength: 1000
  },
  isClaimed: {
    type: Boolean,
    default: false
  },
  claimedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  contactEmail: {
    type: String,
    trim: true,
    lowercase: true
  },
  averageRating: {
    type: Number,
    default: 0
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  ratingDistribution: {
    1: { type: Number, default: 0 },
    2: { type: Number, default: 0 },
    3: { type: Number, default: 0 },
    4: { type: Number, default: 0 },
    5: { type: Number, default: 0 }
  },
  trustScore: {
    type: Number,
    default: 0
  },
  location: {
    type: String,
    default: 'United States'
  }
}, {
  timestamps: true
});

// Create text index for search
companySchema.index({ name: 'text', description: 'text', website: 'text' });

module.exports = mongoose.model('Company', companySchema);
