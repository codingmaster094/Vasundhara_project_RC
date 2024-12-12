import mongoose from "mongoose";
const VehicleSpecification = new mongoose.Schema({
    name:String,
    delete_at:{
        type:String,
        default:null
    }
})
const Vehicle_Specification = mongoose.model('specifications', VehicleSpecification)
export default Vehicle_Specification