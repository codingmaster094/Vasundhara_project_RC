
import ResponseMassage from "../Response/All_Response.js"
import DrivingStatemodal from "../model/DrivingStatemodal.js"
import Drivingcitymodal from "../model/DrivigCitymodal.js"
import Drivingareamodal from "../model/Drivingareamodal.js"
import Drivingdetailsmodal from "../model/Drivingdetailsmodal.js"
import mongoose from "mongoose"


// Driving State APIS
const create_state = async (req, res) => {
    try {
        const data = {
            state_name: req.body.state_name,
            state_code: req.body.state_code,
        }

        const result = DrivingStatemodal(data)
        var Data = await result.save()
        res.send(await ResponseMassage.ResponseSuccessMsg(Data))
    } catch (error) {
        console.log(error)
    }
}

const Get_state = async (req, res) => {
    try {
        const Find = await DrivingStatemodal.find()
        if (Find.length !== 0) {
            res.send(await ResponseMassage.ResponseSuccess(Find))
        } else {
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }

    } catch (error) {
        console.log(error)
    }
}

const Get_state_ID = async (req, res) => {
    try {
        const Find = await DrivingStatemodal.find({ _id: req.params.id })
        console.log('Find', Find.length)
        if (Find.length !== 0) {
            res.send(await ResponseMassage.ResponseSuccess(Find))
        } else {
            res.send(await ResponseMassage.ResponseErrorDataMsg("ID Not Found" , Find))
        }
    } catch (error) {
        console.log(error)
    }
}
const Update_state = async (req, res) => {
    try {
        const Data = {
            state_name: req.body.state_name,
            state_code: req.body.state_code,
        }

        var Result = await DrivingStatemodal.findByIdAndUpdate(req.params.id, Data, { new: true })
        if (Result) {
            res.send(await ResponseMassage.ResponseSuccess(Result))
        } else {
            res.send(await ResponseMassage.ResponseErrorMsg("ID Not Found"))
        }

    } catch (error) {
        console.log(error)
    }
}
const Delete_state = async (req, res) => {
    try {
        const result = await DrivingStatemodal.findByIdAndDelete(req.body.id)
        if (result) {
            res.send(await ResponseMassage.ResponseSuccess(result))
        } else {
            res.send(await ResponseMassage.ResponseErrorMsg("ID Not Found"))
        }
    } catch (error) {
        console.log(error)
    }
}
const state_search = async(req,res)=>{
    try {
        var query = []
        if(req.body.search && req.body.search !==""){
            query.push(req.body.search ? { state_name: { $regex: ".*" + req.body.search + ".*", $options: "i" } } : {});
        }
        const Find = await DrivingStatemodal.find(query.length == 0 ? {} : {$and : query})
        if (Find.length !== 0) {
            res.send(await ResponseMassage.ResponseSuccess(Find))
        } else {
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }
    } catch (error) {
        console.log(error)
    }
}



// Driving State APIS
const create_city = async (req, res) => {
    try {
        const data = {
            state_id: req.body.state_id,
            city_name: req.body.city_name,
            other_name: req.body.other_name
        }
        const result = Drivingcitymodal(data)
        const Data = await result.save()
        res.send(await ResponseMassage.ResponseSuccessMsg(Data))
    } catch (error) {
        console.log(error)
    }
}

const Get_city = async (req, res) => {
    try {
        const Find = await Drivingcitymodal.aggregate([
            {
                $lookup: {
                    from: "driving_states",
                    localField: "state_id",
                    foreignField: "_id",
                    pipeline: [{
                        $project: { _id: 1, state_name: 1 }
                    }],
                    as: "state_id"
                }
            },
            {
                $unwind: "$state_id"
            }
        ])
        if (Find.length !== 0) {
            res.send(await ResponseMassage.ResponseSuccess(Find))
        } else {
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }
    } catch (error) {
        console.log(error)
    }
}

const Get_city_ID = async (req, res) => {
    try {
        const Find = await Drivingcitymodal.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(req.params.id) }
            },
            {
                $lookup: {
                    from: "driving_states",
                    localField: "state_id",
                    foreignField: "_id",
                    pipeline: [{
                        $project: { _id: 1, state_name: 1 }
                    }],
                    as: "state_id"
                }
            },
            {
                $unwind: "$state_id"
            }
        ])
        if (Find.length !== 0) {
            res.send(await ResponseMassage.ResponseSuccess(Find))
        } else {
            res.send(await ResponseMassage.ResponseErrorDataMsg("ID Not Found", Find))
        }
    } catch (error) {
        console.log(error)
    }
}

const Update_city = async (req, res) => {
    try {
        const data = {
            state_id: req.body.state_id,
            city_name: req.body.city_name,
            other_name: req.body.other_name
        }
        const Result = await Drivingcitymodal.findByIdAndUpdate(req.params.id, data, { new: true })
        if (Result) {
            res.send(await ResponseMassage.ResponseSuccess(Result))
        } else {
            res.send(await ResponseMassage.ResponseErrorMsg("Data Not Found"))
        }
    } catch (error) {
        console.log(error)
    }
}
const Delete_city = async (req, res) => {
    try {
        const result = await Drivingcitymodal.findByIdAndDelete(req.body.id)
        if (result) {
            res.send(await ResponseMassage.ResponseSuccess(result))
        } else {
            res.send(await ResponseMassage.ResponseErrorMsg("ID Not Found"))
        }
    } catch (error) {
        console.log(error)
    }
}

const city_search = async (req, res) => {
    try {
        let match = {}
        if (req.body.search && req.body.search !== "") {
            match.city_name = req.body.search ? { $regex: ".*" + req.body.search + ".*", $options: "i" } : {}
        }
        if (req.body.state && req.body.state !== "") {
            match.state_id = new mongoose.Types.ObjectId(req.body.state)
        }
        
        const Find = await Drivingcitymodal.aggregate([
            {
                $match: match
            },
            {
                $lookup: {
                    from: "driving_states",
                    localField: "state_id",
                    foreignField: "_id",
                    pipeline: [{
                        $project: { _id: 1, state_name: 1 }
                    }],
                    as: "state_id"
                }
            },
            {
                $unwind: "$state_id"
            }
        ])
        console.log('Find', Find)
        if (Find.length !== 0) {
            res.send(await ResponseMassage.ResponseSuccess(Find))
        } else {
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }
    } catch (error) {
        console.log(error)
    }
}

// Driving State APIS
const create_area = async (req, res) => {
    try {
        const data = {
            city_id: req.body.city_id,
            area_name: req.body.area_name,
            // other_name: req.body.other_name,
            zip_code: req.body.zip_code
        }
        console.log('data', data)
        const result = Drivingareamodal(data)
        const Data = await result.save()
        res.send(await ResponseMassage.ResponseSuccessMsg(Data))
    } catch (error) {
        console.log(error)
    }
}

const Get_area = async (req, res) => {
    try {
        const Find = await Drivingareamodal.aggregate([
            {
                $lookup: {
                    from: "driving_citys",
                    localField: "city_id",
                    foreignField: "_id",
                    pipeline: [{
                        $project: { _id: 1, city_name: 1 }
                    }],
                    as: "city_id"
                }
            },
            {
                $unwind: "$city_id"
            }
        ])
        if (Find.length !== 0) {
            res.send(await ResponseMassage.ResponseSuccess(Find))
        } else {
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }
    } catch (error) {
        console.log(error)
    }
}

const Get_area_ID = async (req, res) => {
    try {
        const Find = await Drivingareamodal.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(req.params.id) }

            },
            {
                $lookup: {
                    from: "driving_citys",
                    localField: "city_id",
                    foreignField: "_id",
                    pipeline: [{
                        $project: { _id: 1, city_name: 1 }
                    }],
                    as: "city_id"
                }
            },
            {
                $unwind: "$city_id"
            }
        ])
        if (Find.length !== 0) {
            res.send(await ResponseMassage.ResponseSuccess(Find[0]))
        } else {
            res.send(await ResponseMassage.ResponseErrorDataMsg("ID Not Found", Find))
        }
    } catch (error) {
        console.log(error)
    }
}

const Update_area = async (req, res) => {
    try {
        const data = {
            city_id: req.body.city_id,
            area_name: req.body.area_name,
            other_name: req.body.other_name,
            zip_code: req.body.zip_code
        }
        const Result = await Drivingareamodal.findByIdAndUpdate(req.params.id, data, { new: true })
        if (Result) {
            res.send(await ResponseMassage.ResponseSuccess(Result))
        } else {
            res.send(await ResponseMassage.ResponseErrorMsg("ID Not Found"))
        }
    } catch (error) {
        console.log(error)
    }
}

const Delete_area = async (req, res) => {
    try {
        const result = await Drivingareamodal.findByIdAndDelete(req.body.id)
        if (result) {
            res.send(await ResponseMassage.ResponseSuccess(result))
        } else {
            res.send(await ResponseMassage.ResponseErrorMsg("ID Not Found"))
        }
    } catch (error) {
        console.log(error)
    }
}

const area_search = async (req, res) => {
    try {
        let match = {}
        if(req.body.search && req.body.search !==""){
            match.area_name = req.body.search ? { $regex: ".*" + req.body.search + ".*", $options: "i" } : {}
        }
        // if (req.body.zipcode && req.body.zipcode !== "") {
        //     match.zip_code = parseInt(req.body.zipcode)
        // }
        if (req.body.cityid && req.body.cityid !== "") {
            match.city_id = new mongoose.Types.ObjectId(req.body.cityid)
        }

        const Find = await Drivingareamodal.aggregate([
            {
                $match: match
            },
            {
                $lookup: {
                    from: "driving_citys",
                    localField: "city_id",
                    foreignField: "_id",
                    pipeline: [{
                        $project: { _id: 1, city_name: 1 }
                    }],
                    as: "city_id"
                }
            },
            {
                $unwind: "$city_id"
            }
        ])

        if (Find.length !== 0) {
            res.send(await ResponseMassage.ResponseSuccess(Find))
        } else {
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }
    } catch (error) {
        console.log(error)
    }
}


// Driving Details APIS
const create_details = async (req, res) => {
    try {
        console.log('req.body', JSON.parse(req.body.paymentMode))
        const Payment = JSON.parse(req.body.paymentMode)
        var data = {
            city_id: req.body.city_id,
            zip_code: req.body.zip_code,
            name: req.body.name,
            address: req.body.address,
            contact_name: req.body.contact_name,
            type: req.body.type,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            open_Time: req.body.open_Time,
            close_Time: req.body.close_Time,
            close_Days: req.body.close_Days,
            contactNumber1: req.body.contactNumber1,
            contactNumber2: req.body.contactNumber2,
            // paymentMode: req.body.paymentMode,
            establishedYear: req.body.establishedYear,
            email: req.body.email,
            website: req.body.website,
            services: req.body.services,
            sun: req.body.sun,
            mon: req.body.mon,
            tue: req.body.tue,
            wed: req.body.wed,
            thu: req.body.thu,
            fri: req.body.fri,
            sat: req.body.sat
        }
        if (Payment.length !== 0) {
            data.paymentMode = Payment
        }

        const result = Drivingdetailsmodal(data)
        const Data = await result.save()
        res.send(await ResponseMassage.ResponseSuccessMsg(Data))
    } catch (error) {
        console.log(error)
    }
}

const Get_details = async (req, res) => {
    try {
        const Find = await Drivingdetailsmodal.aggregate([
            {
                $lookup: {
                    from: "driving_citys",
                    localField: "city_id",
                    foreignField: "_id",
                    pipeline: [{
                        $project: { _id: 1, city_name: 1 }
                    }],
                    as: "city_id"
                }
            },
            {
                $unwind: "$city_id"
            }
        ])
        if (Find.length !== 0) {
            res.send(await ResponseMassage.ResponseSuccess(Find))
        } else {
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }
    } catch (error) {
        console.log(error)
    }
}

const Get_details_ID = async (req, res) => {
    try {
        const Find = await Drivingdetailsmodal.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(req.params.id) }
            },
            {
                $lookup: {
                    from: "driving_citys",
                    localField: "city_id",
                    foreignField: "_id",
                    pipeline: [{
                        $project: { _id: 1, city_name: 1 }
                    }],
                    as: "city_id"
                }
            },
            {
                $unwind: "$city_id"
            }
        ])
        if (Find.length !== 0) {
            res.send(await ResponseMassage.ResponseSuccess(Find))
        } else {
            res.send(await ResponseMassage.ResponseErrorDataMsg("ID Not Found", Find))
        }
    } catch (error) {
        console.log(error)
    }
}

const Update_details = async (req, res) => {
    try {
        const data = {
            city_id: req.body.city_id,
            zip_code: req.body.zip_code,
            name: req.body.name,
            address: req.body.address,
            contact_name: req.body.contact_name,
            type: req.body.type,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            open_Time: req.body.open_Time,
            close_Time: req.body.close_Time,
            close_Days: req.body.close_Days,
            contactNumber1: req.body.contactNumber1,
            contactNumber2: req.body.contactNumber2,
            // paymentMode: req.body.paymentMode,
            establishedYear: req.body.establishedYear,
            email: req.body.email,
            website: req.body.website,
            services: req.body.services,
            sun: req.body.sun,
            mon: req.body.mon,
            tue: req.body.tue,
            wed: req.body.wed,
            thu: req.body.thu,
            fri: req.body.fri,
            sat: req.body.sat
        }
    const Payment = JSON.parse(req.body.paymentMode)
        if (Payment.length !== 0) {
        data.paymentMode = Payment
        }
        const Result = await Drivingdetailsmodal.findByIdAndUpdate(req.params.id, data, { new: true })
        if (Result) {
            res.send(await ResponseMassage.ResponseSuccess(Result))
        } else {
            res.send(await ResponseMassage.ResponseErrorMsg("ID Not Found"))
        }
    } catch (error) {
        console.log(error)
    }
}

const Delete_details = async (req, res) => {
    try {
        const result = await Drivingdetailsmodal.findByIdAndDelete(req.body.id)
        if (result) {
            res.send(await ResponseMassage.ResponseSuccess(result))
        } else {
            res.send(await ResponseMassage.ResponseErrorMsg("ID Not Found"))
        }
    } catch (error) {
        console.log(error)
    }
}
const details_search = async (req, res) => {
    try {
        console.log('req.body', req.body)
        var match = {}
        if (req.body.searchvalue && req.body.searchvalue !== "") { 
             match.name = req.body.searchvalue ? {$regex: ".*" + req.body.searchvalue + ".*", $options: "i" } : {}
        }
        if (req.body.cityid && req.body.cityid !== "") {
            match.city_id = new mongoose.Types.ObjectId(req.body.cityid)
        }

        if (req.body.status && req.body.status !== "") {
            match.status = parseInt(req.body.status)
        }

        if (req.body.added_by && req.body.added_by !== "") {
            match.added_by = parseInt(req.body.added_by)
        }
        const Find = await Drivingdetailsmodal.aggregate([
            {
                $match: match
            },
            {
                $lookup: {
                    from: "driving_citys",
                    localField: "city_id",
                    foreignField: "_id",
                    pipeline: [{
                        $project: { _id: 1, city_name: 1 }
                    }],
                    as: "city_id"
                }
            },
            {
                $unwind: "$city_id"
            }
        ])
        if (Find.length !== 0) {
            res.send(await ResponseMassage.ResponseSuccess(Find))
        } else {
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }
    } catch (error) {
        console.log(error)
    }
}

const toggleDetails = async(req,res)=>{
    try {
        const name = req.body.name;
        var data;
        if (name == "status") {
            data = await Drivingdetailsmodal.findByIdAndUpdate({ _id: req.body.id },{ status: req.body.status },{ new: true });
        }
        res.send(data);
    } catch (error) {
        console.log(error)
    }
}
export default {
    create_state, Get_state, Get_state_ID, Update_state, Delete_state,state_search ,
    create_city, Get_city, Get_city_ID, Update_city, Delete_city, city_search,
    create_area, Get_area, Get_area_ID, Update_area, Delete_area, area_search,
    create_details, Get_details, Get_details_ID, Update_details, Delete_details, details_search,toggleDetails
}