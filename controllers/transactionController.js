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

  exports.uploads=async(req,res)=>{
    try {
        const transaction = await Transaction.find({user:req.params.id});
        if (!transaction) {
          return res.status(404).json({ error: 'transaction not found' });
        }
        res.json(transaction);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  }