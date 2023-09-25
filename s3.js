const AWS = require('aws-sdk');
const mime = require('mime-types');
require("dotenv").config();

// Increase the payload size limit
AWS.config.update({
  httpOptions: {
    maxBodyLength: 50 * 1024 * 1024, // Set the maximum body length to 50MB (adjust as needed)
  },
});

const s3 = new AWS.S3({
  accessKeyId: process.env.a.split("90").join(""),
  secretAccessKey: process.env.s.split("").reverse().join("").split("66").join(""),
  region: process.env.r,
});

const UploadFile = (buffer, originalname) => {
  

  const fileContentType = mime.lookup(originalname);
  const fileExtension = mime.extension(fileContentType);
  const fileName = `${Date.now().toString()}-${originalname}`;

  const params = {
    Bucket: process.env.bucket.split("****").join(""),
    Key: fileName,
    Body: buffer,
    ContentType: fileContentType,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to upload file to S3' });
    } else {
      res.send({ status: true, location: data.Location });
    }
  });
};

module.exports = UploadFile;