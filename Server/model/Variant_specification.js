import mongoose from "mongoose";

const variant_speciShchema = new mongoose.Schema({
  category_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"vehicle_categories"
  }, 

  brand_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"vehicle_brands"
  },

  Vehicle_name_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"vehicle_infos"
  },

  Vehicle_Variant_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"pricevariants"
  },

  specification:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"specifications"
  },

  key_specification:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"key_specs"
  },

  specification_name:String,
  specification_value:String,
  is_feature:Number,
  is_specification:Number,
  is_overview:Number



})

const Variant_specification = mongoose.model('variant_specifications' , variant_speciShchema)
export default Variant_specification