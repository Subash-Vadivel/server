const { validate, hashFile } = require("../helpers/certificateHelper");
const Certificate=require("../models/Certificates");
const UploadFile = require("../s3");
exports.addCertificate=async (req, res) => {
    try {
      const {name,user,issuedBy,issueDate,certificateHash,file,fileType}=req.body;
      const available=await Certificate.findOne({certificateHash:req.body.certificateHash})
      if(available){
        return res.status(400).json({ error: "Already Exsist" });
      }
      const pdfUrl=await UploadFile(file,name,issuedBy,fileType);
      console.log("saved URL : ",pdfUrl);
      if(!pdfUrl)
       return res.status(404).json({ error: "Not Saved" });
      const certificate = new Certificate({name,user,issuedBy,issueDate,certificateHash,pdfUrl});
      await certificate.save();
      return res.status(201).json(certificate);
    } catch (err) {
      console.log(err);
     return  res.status(500).json({ error: err });
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

  exports.validate=async(req,res)=>{
    try {
      // const hashedFile=await hashFile(req.body.file);
      const result=await validate(req.body.certificateHash);
      if (!result) {
        return res.status(400).json({ error: 'Some Thing Went Wrong' });
      }
      return res.json(result).status(200);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }