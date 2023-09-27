const ethers = require("ethers");
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const abi = require("../utils/abi.json");
const { hashFile } = require("./certificateHelper");
const contractAddress = "0x4C2612EC307c81dbD5FB79185399c83C79C7dD68"; // Your contract's address
const privateKey="0c147fbae2742cae52245a5b95c01914e14d74508cc674a6ede44c35ee1eec4d";
const API_URL="https://eth-sepolia.g.alchemy.com/v2/an7uzP8izTO_nnpBHAq5xy4xCQrGwaCC";
const myAddress = '0xBDA6614191Ccdb3963E8576B610956F20Ad6598e';

const web3 = createAlchemyWeb3(API_URL);

// const provider = new ethers.JsonRpcProvider(API_URL);
// const wallet = new ethers.Wallet(privateKey, provider);
// const contract = new ethers.Contract(contractAddress, abi, wallet);
const contract = new web3.eth.Contract(abi, contractAddress);


exports.mint=async(req)=>{
    return new Promise(async(resolve,reject)=>{
      
    try{

        
        const { name, issuer, date ,certificateHash} = req.body;
        console.log(name, issuer, date ,certificateHash)
        // const certificateHash=await hashFile(file);
        const unixTimestamp = date;

        const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // nonce starts counting from 0
        const functionAbi = contract.methods.addCertificate(certificateHash, name, issuer, unixTimestamp).encodeABI();
        const transaction = {
          to: contractAddress,
          value: 0, // You can set the value to 0 for function calls (unless you need to send Ether along with the call)
          gas: 300000, // Adjust the gas limit as needed
          nonce: nonce,
          data: functionAbi, // The encoded function call data
        };
        
        const signedTx = await web3.eth.accounts.signTransaction(transaction,privateKey);
        
        web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
          if (!error) {
            console.log("🎉 Transaction hash:", hash);
            const url=hash;
            resolve(url);
            // You can monitor the transaction status using this hash
          } else {
            console.log("❗ Something went wrong while submitting your transaction:", error);
            reject()

          }
        });
   
    }
    catch(err){
        console.log(err);
        reject();
    }
      
})
}