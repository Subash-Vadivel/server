const { mint } = require("../helpers/transactionHeler");
const Transaction=require("../models/Transactions")

exports.log=async (req, res) => {
    const transactionData = req.body;
  
    try {
      const transaction = new Transaction(transactionData);
  // Save the user document to the database
  await transaction.save();
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

  exports.addBlock=async(req,res)=>{
    try{
         const result=await mint(req);
         console.log(result);
         res.status(201).json({message:"Success",transactionHash:result});

    }
    catch(error){
      console.log(error);
      res.status(500).json({ error});

    }
  }