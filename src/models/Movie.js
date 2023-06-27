import { Schema, model } from "mongoose";

const movieSchema = new Schema({
    originalTitle:String,
    originalLanguage:String
},{
    timestamps: true,
    versionKey: false
})

export default model('Movie',movieSchema)