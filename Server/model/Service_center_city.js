import mongoose from "mongoose";

const Servicecitychema = new mongoose.Schema({
    state_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"service_states"
    },
    name :{
        type:String,
    },
    status :{
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

const Service_city = mongoose.model('service_citys' , Servicecitychema)

export default Service_city