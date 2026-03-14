const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Please add a rating between 1 and 5']
  },
  title: {
    type: String,
    required: [true, 'Please add a title for the review']
  },
  reviewText: {
    type: String,
    required: [true, 'Please add review text']
  },
  dateOfExperience: {
    type: Date,
    required: [true, 'Please add the date of your experience']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);
