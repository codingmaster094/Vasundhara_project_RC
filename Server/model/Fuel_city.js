import mongoose from "mongoose";

const Fuel_city = new mongoose.Schema({
    city:{
        type :String,
    },
    state_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"fuel_states"
    },
},{timestamps:true})

const Fuel_city_Data = mongoose.model('fuel_citys', Fuel_city)
export default Fuel_city_Data