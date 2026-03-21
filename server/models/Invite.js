const mongoose = require('mongoose');
const crypto = require('crypto');

const inviteSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
    index: true
  },
  sentBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BusinessAccount',
    required: true
  },
  email: {
    type: String,
    required: [true, 'Customer email is required'],
    trim: true,
    lowercase: true
  },
  token: {
    type: String,
    unique: true,
    default: () => crypto.randomUUID()
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'expired'],
    default: 'pending'
  },
  sentAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

inviteSchema.index({ token: 1 });
inviteSchema.index({ companyId: 1, email: 1 });

module.exports = mongoose.model('Invite', inviteSchema);
