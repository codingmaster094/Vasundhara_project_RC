import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    category_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Vehicle_Category'
    },
    name:String,
    title:String,
    driving_url:String,
    note:String,
    image:String,
    is_popular:Number
})

const Vehicle_Brand = mongoose.model('Vehicle_Brand',brandSchema)

export default Vehicle_Brand