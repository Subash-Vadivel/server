const Certificate=require("../models/Certificates")
exports.addCertificate=async (req, res) => {
    try {
      const certificateData = req.body;
      const available=await Certificate.findOne({certificateHash:req.body.certificateHash})
      if(available){
        res.status(400).json({ error: "Already Exsist" });
      }
      const certificate = new Certificate(certificateData);
      await certificate.save();
      res.status(201).json(certificate);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }