const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a category name'],
    unique: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  icon: {
    type: String,
    default: 'Globe' // FontAwesome or Lucide icon name
  },
  description: {
    type: String,
    maxLength: 500
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);
