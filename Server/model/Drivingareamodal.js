import mongoose from "mongoose"

const drivingAreaschema = new mongoose.Schema({
    city_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "driving_citys"
    },
    area_name:{
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
    zip_code:{
        type:Number,
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

const Drivind_area = mongoose.model('driving_areas', drivingAreaschema)
export default Drivind_area
