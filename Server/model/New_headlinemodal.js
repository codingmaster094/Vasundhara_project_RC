import mongoose from "mongoose";

const News_headline_schema = new mongoose.Schema({
    category_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "News_category"
    }],
    vehicale_category_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle_Category"
    }],
    brand_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle_Brand"
    }],
    tag_id:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "tags" 
    }],
    title:{
        type:String
    },
    news_url:{
        type:String
    },
    description:{
        type:String
    },
    date:{
        type:Date
    },
    image:{
        type:String,
        default:null
    },
    websiteimage:{
        type:String,
        default:null
    },
    is_slider:{
        type:Number,
        default:0
    },
    is_popular:{
        type:Number,
        default:0
    },
    headtag:{
        type:String,
        default:null
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
        type:String,
        default:null
    },
    position:{type:Number,default:null},
},{timestamps:true})

const News_headline_Modal = mongoose.model('News_headlines', News_headline_schema)
export default News_headline_Modal