const mongoose = require('mongoose');

// Transaction Schema
const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  certificateName: {
    type: String,
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
  blockAddress: {
    type: String,
    required: true,
  }, // You can add this field for blockchain address
  transactionStatus: {
    type: String,
    required: true,
  },
  // Additional fields related to transactions
});

// Create Transaction model
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
