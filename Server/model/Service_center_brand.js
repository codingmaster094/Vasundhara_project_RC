import mongoose from "mongoose";

const Servicebrandchema = new mongoose.Schema({
    brand_name:{
        type: String,
    },
    brand_slug :{
        type:String,
    },
    brand_image :{
        type:String,
    },
    type :{
        type:Number,
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

const Service_Brand = mongoose.model('service_brands' , Servicebrandchema)

export default Service_Brand