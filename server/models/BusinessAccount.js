const mongoose = require('mongoose');

const businessAccountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please add an email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    unique: true,
    required: true
  },
  companyName: {
    type: String,
    default: ''
  },
  website: {
    type: String,
    default: ''
  },
  jobTitle: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    enum: ['companyOwner', 'admin'],
    default: 'companyOwner'
  },
  isVerified: {
    type: Boolean,
    default: true
  },
  avatar: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('BusinessAccount', businessAccountSchema);
