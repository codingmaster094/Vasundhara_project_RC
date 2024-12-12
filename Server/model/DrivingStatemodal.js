import mongoose from "mongoose";

const drivingStateschema = new mongoose.Schema({
    state_name:{
        type:String
    },
    state_code :{
        type:String
    },
    state_Live :{
        type:Number,
        default:1
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

const DrivingState = mongoose.model('driving_states' , drivingStateschema)

export default DrivingState