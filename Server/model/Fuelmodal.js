import mongoose from "mongoose";

const fuelschema = new mongoose.Schema({
    main_id:{
        type :  String,
        default:1
    },
    company_id:{
        type :  String,
        default:"BPCL"
    },
    state:{
        type :  mongoose.Schema.Types.ObjectId,
        res:"fuel_states"
    },
    city:{
        type :  mongoose.Schema.Types.ObjectId,
        res:"fuel_citys"
    },
    petrol_price:{
        type:String,
        default:-1
    },
    extra_premium_petrol_price:{
        type:String,
        default:-1
        
    },
    petrol_diff:{
        type:String,
        default:-1 
    },
    diesel_price:{
        type:String,
        default:-1 
    },
    extra_premium_diesel_price:{
        type:String,
        default:-1
        
    },
    diesel_diff:{
        type:String,
        default:-1 
    },
    cng_price:{
        type:String,
        default:-1 
    },
    lpg_price:{
        type:String,
        default:-1 
    },
    cng_diff:{
        type:String,
        default: 0 
    },
    lpg_diff:{
        type:String,
        default: 0   
    },
    date:{
        type:Date,
    },
},{timestamps:true})

const FuelModal = mongoose.model('fuels_price', fuelschema)
export default FuelModal