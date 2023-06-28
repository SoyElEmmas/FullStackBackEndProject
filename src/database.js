import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

mongoose.connect(process.env.MONGO_URI)
.then(db => console.log(`MongoDB Connected`) )
.catch(error => console.error(error))