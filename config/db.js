const mongoose = require("mongoose");
const colors = require("colors")

const connectDb = async()=>{
    try {
        //  if you want to connect online use MONGO_ONLINE_URL as variable
        await mongoose.connect(process.env.MONGO_OFFLINE_URL);
        console.log("Connect to MongoDb Database".bgMagenta )
    } catch (error) {
        console.log(error.bgred)
    }
}

module.exports = connectDb;