import mongoose from "mongoose";

const vehicleCatSchema = new mongoose.Schema({
    name:String,
    image:String,
    status:Number
})

const Vehicle_Category = mongoose.model('Vehicle_Category',vehicleCatSchema)

export default Vehicle_Category