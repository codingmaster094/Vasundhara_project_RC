import mongoose from "mongoose";

const Fuel_state = new mongoose.Schema({
    state:{
        type :String,
    },
    deleted_at:{
        type:String,
        default:null
    },
},{timestamps:true})

const Fuel_state_Data = mongoose.model('fuel_states', Fuel_state)
export default Fuel_state_Data