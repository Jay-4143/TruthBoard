const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a company name'],
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  website: {
    type: String
  },
  category: {
    type: String
  },
  description: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Company', companySchema);
