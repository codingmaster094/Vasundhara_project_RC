import ResponseMassage from "../Response/All_Response.js"
import Tags_modal from "../model/TagsModal.js"

const create_tags = async(req,res)=>{
    try {
        console.log('req.body', req.body)
        const data = {
            name:req.body.name
        }
        const result =  Tags_modal(data)
        const SavData = await result.save() 
        res.send(await ResponseMassage.ResponseSuccessMsg(SavData))     
    } catch (error) {
        console.log(error)
    }
}

const Get_tags = async(req,res)=>{
    try {
        const Find = await Tags_modal.find()
        if(Find !=0){
            res.send(await ResponseMassage.ResponseSuccess(Find))
        }else{
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }

    } catch (error) {
        console.log(error)
    }
}

const Get_tags_ID = async(req,res)=>{
    try {
        const Find = await Tags_modal.find({ _id: req.params.id })
        if (Find.length !== 0) {
            res.send(await ResponseMassage.ResponseSuccess(Find))
        } else {
            res.send(await ResponseMassage.ResponseErrorDataMsg("ID Not Found", Find))
        }
    } catch (error) {
        console.log(error)
    }
}


const Update_tags = async(req,res)=>{
    try {
        const data = {
            name:req.body.name
        }
        var Result = await Tags_modal.findByIdAndUpdate(req.params.id, data, { new: true })
       if (Result) {
           res.send(await ResponseMassage.ResponseSuccess(Result))
       } else {
           res.send(await ResponseMassage.ResponseErrorMsg("ID Not Found"))
       }
    } catch (error) {
        console.log(error)
    }
}
const Delete_tags = async(req,res)=>{
    try {
        const result = await Tags_modal.findByIdAndDelete(req.body.id)
        if (result) {
            res.send(await ResponseMassage.ResponseSuccess(result))
        } else {
            res.send(await ResponseMassage.ResponseErrorMsg("ID Not Found"))
        }
    } catch (error) {
        console.log(error)
    }
}
export default {
    create_tags , Get_tags ,Get_tags_ID , Update_tags , Delete_tags
}