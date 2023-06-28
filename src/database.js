import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

mongoose.connect(process.env.MONGO_URI)
.then(db => console.log(`MongoDB Connected`) )
.catch(error => console.error(error))

/*const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        console.log('Mongo URI: '+process.env.MONGO_URI);
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = connectDB*/ 