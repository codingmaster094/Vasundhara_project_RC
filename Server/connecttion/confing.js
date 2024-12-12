
import mongoose from "mongoose";
const MongoDBURl = "mongodb+srv://gawaledipak109:Headbase@cluster0.uenyjwn.mongodb.net/RTO_API?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(MongoDBURl).then(()=>{
    console.log("DataBase Connected")
}).catch(err => console.log(err))