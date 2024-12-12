import mongoose from "mongoose";

const traffic_languageSchema = new mongoose.Schema({
    lable:{
        type:String
    },
    or:{
        type:String,
        default:null
    },
    bn:{
        type:String,
        default:null
    },
    kn:{
        type:String,
        default:null
    },
    ml:{
        type:String,
        default:null
    },
    te:{
        type:String,
        default:null
    },
    ta:{
        type:String,
        default:null
    },
    pa:{
        type:String,
        default:null
    },
    mr:{
        type:String,
        default:null
    },
    hi:{
        type:String,
        default:null
    },
    gu:{
        type:String,
        default:null
    }
},{timestamps:true})

const traffic_Language = mongoose.model('traffic_languages',traffic_languageSchema)
export default traffic_Language