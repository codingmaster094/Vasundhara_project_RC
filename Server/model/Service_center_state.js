import mongoose from "mongoose";

const ServiceStateschema = new mongoose.Schema({
    name:{
        type:String
    },
    status :{
        type:Number,
        default:1
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

const Service_State = mongoose.model('service_states' , ServiceStateschema)

export default Service_State