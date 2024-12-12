import mongoose from "mongoose";

const varientSchema = new mongoose.Schema({
    name:String,
    engine:Number,
    price:Number,
    price_range:String,
    review:Number,
    rating:Number,
    status:String,
    fuel_type:String,
    showroom_price:String,
    mileage:String,
    rto_price:String,
    insurance_price:String,
    other_price:String,
    road_price:String,
    latest_update:String,
    launched_at:Date,
    image:String
})

const Price_Varient = mongoose.model('Price_Varient',varientSchema)

export default Price_Varient