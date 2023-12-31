const mongoose = require('mongoose');
mongoose.set('strictQuery', false); 
mongoose.connect(process.env.DB_URL);
const conn = mongoose.connection;

conn.on('open', ()=>{
    console.log('Database Connected...');
});
conn.on('error',(err)=>{
    console.log("Error Connection",err);
})
module.exports = conn;