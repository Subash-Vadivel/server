const Certificate=require("../models/Certificates")
exports.addCertificate=async (req, res) => {
    try {
      const certificateData = req.body;
      console.log(req.body);
      const available=await Certificate.findOne({certificateHash:req.body.certificateHash})
      if(available){
        return res.status(400).json({ error: "Already Exsist" });
      }
      const certificate = new Certificate(certificateData);
      await certificate.save();
      return res.status(201).json(certificate);
    } catch (error) {
     return  res.status(500).json({ error: error.message });
    }
  }

  exports.getCertificate=async(req,res)=>{
    try {
        const certificate = await Certificate.find({user:req.params.id});
        if (!certificate) {
          return res.status(404).json({ error: 'Certificate not found' });
        }
        res.json(certificate).status(200);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  }