import mongoose from "mongoose";

const vehicle_color_image = new mongoose.Schema({
    Color_Modal_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"vehicle_model_colors"
    },
    Modal_color_image:String
})
const vehicle_imfo_color_image = mongoose.model('vehicle_info_color_images' , vehicle_color_image)
export default vehicle_imfo_color_image