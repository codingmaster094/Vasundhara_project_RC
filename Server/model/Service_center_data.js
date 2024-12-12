import mongoose from "mongoose";

const serviceDatashcema = new mongoose.Schema({
    city_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "service_citys"
    },
    brand_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "service_brands"
    }],
    name:{
        type:String,
    },
    address:{
        type:String,
    },
    zipcode:{
        type:Number,
        default:null
    },
    website:{
        type:String,
        default:null 
    },
    number:{
        type:String,
        default:null 
    },
    email:{
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
    featured:{    
        type:Number,
        default:null
    },
    type:{
        type:Number,
    },
    paymentMode:[{
        type:String,
        default:null
    }],
    sun:{
        type:String,
    },
    mon:{
        type:String,
    },
    tue:{
        type:String,
    },
    wed:{
        type:String,
    },
    thu:{
        type:String,
    },
    fri:{
        type:String,
    },
    sat:{
        type:String,
    },
    status:{
        type:Number,
        default:0
    },
    deleted_at:{
        type:String,
        default:null
    },
    added_by:{
        type:Number,
        default:0
    },
    deleted_by:{
        type:String,
        default:null
    },
},{timestamps:true})

const service_center_Data = mongoose.model('service_center_datas', serviceDatashcema)
export default service_center_Data