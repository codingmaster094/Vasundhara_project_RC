import mongoose from "mongoose";

const drivingcityschema = new mongoose.Schema({
    state_id:{
        type :  mongoose.Schema.Types.ObjectId,
        res:"driving_states"
    },
    city_name:{
        type:String
    },
    other_name:{
        type:String,
        default:null
    },
    latitude:{
        type:String,
        default:null
        
    },
    longitude:{
        type:String,
        default:null 
    },
    deleted_at:{
        type:String,
        default:null
    },
    deleted_by:{
        type:String,
        default:null
    }
},{timestamps:true})

const DrivindCity = mongoose.model('driving_citys', drivingcityschema)
export default DrivindCity