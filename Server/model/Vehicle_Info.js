import mongoose from "mongoose";

const vehInfoSchema = new mongoose.Schema({
    php_id:{type:Number},
    category_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Vehicle_Category'
    },
    brand_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Vehicle_Brand'
    },
    body_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Body_Type'
    },
    name:String,
    fuel_type:String,
    rating:Number,
    review:Number,
    min_price:Number,
    max_price:Number,
    varient_name:String,
    price_range:String,
    status:String,
    image:String,
    thumb_image:String,
    launched_at:Date,
    launched_date:Date,
    popularity:String,
    mileage:Number, 
    engine:Number,
    max_power:Number,
    showroom_price:Number,
    road_price:Number,
    rto_price:Number,
    insurance_price:Number,
    other_price:Number,
    upcoming:Number,
    latest:Number,
    content_updated:Number,
    designer_updated:Number,
    manu_des:String,
    price_des:String,
    high_des:String,
    key_specs:String,
    seo_note:String
})

const Vehicle_Info = mongoose.model('Vehicle_Info',vehInfoSchema)

export default Vehicle_Info