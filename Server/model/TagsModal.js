import mongoose from "mongoose";

const Tags_Schema = new mongoose.Schema({
    name: {
        type: String,
        default: null
    },
    delete_at: {
        type: String,
        default: null
    },
    delete_by: {
        type: String,
        default: null
    }
})
const Tags_modal = mongoose.model("tags", Tags_Schema)
export default Tags_modal