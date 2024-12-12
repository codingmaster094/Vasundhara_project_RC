import mongoose from "mongoose";

const modelColourSchema = new mongoose.Schema({
    vehicle_info:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Vehicle_Info'
    },
    name:String,
    code:String
})

const Model_Color = mongoose.model('Model_Color',modelColourSchema)

export default Model_Color