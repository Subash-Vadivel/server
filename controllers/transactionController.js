const Transaction=require("../models/Transactions")

exports.log=async (req, res) => {
    const transactionData = req.body;
    console.log(transactionData);
  
    try {
      const transaction = new Transaction(transactionData);
  // Save the user document to the database
  await transaction.save();
      console.log(transaction);
      res.status(201).json(transaction);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }