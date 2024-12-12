import mongoose from "mongoose";

const News_category_schema = new mongoose.Schema({
    name:{
        type:String,
    },
    Image:{
        type:String
    },
    status:{
        type:Number,
        default:0
    },
    delete_at:{
        type:String,
        default:null
    },
    delete_by:{ 
        type:Number,
        default:null
    },
    position:{type:Number,default:null},
},{timestamps:true})

const News_category_modal = mongoose.model('News_category', News_category_schema)
export default News_category_modal