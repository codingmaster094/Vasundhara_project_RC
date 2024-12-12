import mongoose from 'mongoose';
import  jwt  from 'jsonwebtoken';

const userschema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    is_type:{
        type:Number,
        default:0
    },
    user_type:{
        type:Number,
        default:0
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
},{timestamps:true})

userschema.methods.gettoken = async function () {
    const token = jwt.sign({ _id: this._id }, process.env.SCRET_KEY)
    this.tokens = this.tokens.concat({ token: token })
    await this.save()
    return token
}

const UserModel = mongoose.model('user',userschema)

export default UserModel