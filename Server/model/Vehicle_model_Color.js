import mongoose from "mongoose";

const Vehicle_Color_Modal_Shecema = new mongoose.Schema({
    vehicle_information_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Vehicle_Info'
    },
    color_name:String,
    color_code:String,
    // image:String
})

const Vhicle_modla_color = mongoose.model('vehicle_model_colors', Vehicle_Color_Modal_Shecema)
export default Vhicle_modla_color