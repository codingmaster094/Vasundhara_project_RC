import mongoose from "mongoose";

const News_Schema = new mongoose.Schema({
    news_headline_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "news_headlines"
    },
    news: {
        type: String
    },
    delete_at: {
        type: String,
        default: null
    },
    delete_by: {
        type: String,
        default: null
    },
    position:{type:Number,default:null},
})

const News_modal = mongoose.model('News', News_Schema)
export default News_modal