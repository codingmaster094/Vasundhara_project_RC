import mongoose from "mongoose";

const keySpecSchema = new mongoose.Schema({
    name:String,
    image:String
})

const Key_Specs = mongoose.model('Key_Specs',keySpecSchema)

export default Key_Specs