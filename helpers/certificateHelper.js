const { ethers } = require("ethers");
const provider = new ethers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/an7uzP8izTO_nnpBHAq5xy4xCQrGwaCC");
const abi = require("../utils/abi.json");
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const contractAddress = "0x4C2612EC307c81dbD5FB79185399c83C79C7dD68"; // Your contract's address



exports.hashFile = async (file) => {
    try {
      // Assuming 'file' is a Buffer or a Uint8Array
      console.log(file);
      const fileBytes = file instanceof Buffer ? file : new Uint8Array(file);
  
      // Calculate the certificate hash
      const certificateHash = createAlchemyWeb3.utils.keccak256(
        "0x" + [...fileBytes].map((x) => x.toString(16).padStart(2, "0")).join("")
      );1
  
      return certificateHash;
    } catch (error) {
      console.error("Error hashing file:", error);
      throw error;
    }
  };

exports.validate=(certHash)=>{
    return new Promise(async(resolve,reject)=>{
    try{
        console.log("Received hash:", certHash);

        // Verify the certificate hash
        const contract = new ethers.Contract(contractAddress, abi, provider);
        const result = await contract.verifyCertificate(certHash);
        if(result[0]){
            const unixTimestamp = Number(result[3]); // Convert BigInt to a number
            const dateObject = new Date(unixTimestamp * 1000).toLocaleDateString();
        resolve([result[0],result[1],result[2],dateObject]);
        }
        console.log("Validation result:", result);
        resolve(result);
    }
    catch(err){
        console.log(err);
        reject(false);
    }
})

}