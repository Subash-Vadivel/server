const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  certificates: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Certificate',
  }],
  userType: {
    type: String,
    default: 'level-1',
  },
});

// Create User model
const User = mongoose.model('User', userSchema);

module.exports = User;
