import mongoose from "mongoose";

const Traffic_Ruleschema = new mongoose.Schema({
    traffic_state_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"traffic_states"
    },
    offence :{
        type:String,
        default:null
    },
    panalty :{
        type:String,
        default:null
    },
    deleted_at:{
        type:String,
        default:null
    }
},{timestamps:true})

const Traffic_rule = mongoose.model('Traffic_rules' , Traffic_Ruleschema)

export default Traffic_rule