const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: function() {
      return !this.phoneNumber; // Password only required if no phone number
    }
  },
  phoneNumber: {
    type: String,
    unique: true,
    sparse: true
  },
  avatar: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    enum: ['user', 'companyOwner', 'admin'],
    default: 'user'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  bio: {
    type: String,
    default: '',
    maxLength: 500
  },
  location: {
    type: String,
    default: ''
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  language: {
    type: String,
    default: 'English (United States)'
  },
  notificationPreferences: {
    marketing: { type: Boolean, default: true },
    personalizedRecs: { type: Boolean, default: true },
    latestInsights: { type: Boolean, default: true },
    newsletter: { type: Boolean, default: true },
    featureUpdates: { type: Boolean, default: true },
    aboutTruthBoard: { type: Boolean, default: true },
    reviewMilestones: { type: Boolean, default: true },
    reviewInvitations: { type: Boolean, default: true }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
