import mongoose from "mongoose";

mongoose.connect//(process.env.MONGO_URI)
                ('mongodb+srv://emmanuelreyesp:gajOb2A5DPs1bSMS@practices01.n9ecvg6.mongodb.net/Movies?retryWrites=true&w=majority')
.then(db => console.log(`MongoDB Connected`) )
.catch(error => console.error(error))

/* const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = connectDB */