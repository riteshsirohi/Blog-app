const mongoose = require('mongoose')
const colors = require('colors');

const connectDB = async() =>{
    try {
       const connectionInstance =  await mongoose.connect(process.env.MONGO_URI);
       console.log(`connected to db ,${connectionInstance.connection.host}`);

    } catch (error) {
        console.log(`mongo connect error ${error}`.bgRed.white)
    }
}
module.exports = connectDB;