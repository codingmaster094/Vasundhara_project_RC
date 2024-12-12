import mongoose from "mongoose";

const Vehicle_Information_image = new mongoose.Schema({
image:String
})

const Vehicle_info_image = mongoose.model('vehicle_info_images', Vehicle_Information_image)
export default Vehicle_info_image