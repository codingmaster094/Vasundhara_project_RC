import mongoose from "mongoose";

const bodyTypeSchema = new mongoose.Schema({
    category_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Vehicle_Category'
    },
    name:String,
    image:String,
    status:Number
})

const Body_Type = mongoose.model('Body_Type',bodyTypeSchema)

export default Body_Type