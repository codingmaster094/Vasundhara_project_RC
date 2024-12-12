import mongoose from "mongoose";

const colorImgSchema = new mongoose.Schema({
    model_color:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Model_Color'
    },
    image:String
})

const Color_Image = mongoose.model('Color_Image',colorImgSchema)

export default Color_Image