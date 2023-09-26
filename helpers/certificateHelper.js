const { ethers } = require("ethers");
const provider = new ethers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/an7uzP8izTO_nnpBHAq5xy4xCQrGwaCC");
const abi = require("../utils/abi.json");
const contractAddress = "0x4C2612EC307c81dbD5FB79185399c83C79C7dD68"; // Your contract's address


exports.hashFile = async (file) => {
    const reader = new FileReader();
    return new Promise((resolve) => {
      reader.onload = async (e) => {
        const fileBuffer = e.target.result;
        const fileBytes = new Uint8Array(fileBuffer);

        const certificateHash = await web3.utils.keccak256(
          "0x" +
            [...fileBytes].map((x) => x.toString(16).padStart(2, "0")).join("")
        );
        resolve(certificateHash);
      };
      reader.readAsArrayBuffer(file);
    });
  };

exports.validate=async(certHash)=>{
    try{
        console.log("Received hash:", certHash);

        // Verify the certificate hash
        const contract = new ethers.Contract(contractAddress, abi, provider);
        const result = await contract.verifyCertificate(certHash);
        console.log("Validation result:", result);
        return result;
    }
    catch(err){
        console.log(err);
        return false;
    }

}