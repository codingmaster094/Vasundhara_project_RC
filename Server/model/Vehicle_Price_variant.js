import mongoose from "mongoose";
const Price_variant_Schema = new mongoose.Schema({
    vehicle_information_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Vehicle_Info'
    },
    name:String,
    engine:String,
    price:String,
    price_range:String,
    status:String,
    variant_image:String,
    fuel_type:String,
    ex_show_room_rice:Number,
    mileage:Number,
    on_road_price:String,
    latest_update:String,
    insurance_price:Number,
    rto_price:String,
    other_price:Number,
    review_count:Number,
    rating:Number,
    launched_at:String,
    is_scrapping:Number
})
const Price_variant = mongoose.model('pricevariants', Price_variant_Schema)
export default Price_variant