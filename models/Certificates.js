const mongoose = require('mongoose');

// Certificate Schema
const certificateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  issuedBy: {
    type: String,
    required: true,
  },
  issueDate: {
    type: Date,
    required: true,
  },
  pdfUrl: {
    type: String, // Store the URL where the PDF file is located
    required: true,
  },
});

// Create Certificate model
const Certificate = mongoose.model('Certificate', certificateSchema);

module.exports = Certificate;
