const AWS = require('aws-sdk');
const mime = require('mime-types');
const s3 = new AWS.S3({
  accessKeyId: process.env.a.split("90").join(""),
  secretAccessKey: process.env.s.split("").reverse().join("").split("66").join(""),
  region: process.env.r,
});

const UploadFile = (file,name,issuedBy,fileType) => {
  return new Promise((resolve,reject)=>{

  
  try{
  console.log(file);

  const fileContent = Buffer.from(
    file.replace(/^data:(image\/\w+|application\/pdf);base64,/, ''),
    'base64'
  );
  
  console.log(fileType);
  const fileContentType = mime.lookup(fileType);

  const fileExtension = mime.extension(fileContentType);
  const fileName = `${Date.now().toString()}-${name}`;
  console.log(fileContentType);
  const params = {
    Bucket: process.env.bucket.split("****").join(""),
    Key: fileName,
    Body: fileContent,
    ContentType: fileContentType,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.error(err);
      reject(false);
    } else {
      console.log(data);
      resolve(data.Location);
    }
  });}
  catch(err){
    console.log(err);
    reject(false);
  }
})
};

module.exports = UploadFile;