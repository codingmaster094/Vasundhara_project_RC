import mongoose from "mongoose"
import ResponseMassage from "../Response/All_Response.js"
import Service_State from "../model/Service_center_state.js"
import Service_City from "../model/Service_center_city.js"
import Service_Brand from "../model/Service_center_brand.js"
import Service_Data from "../model/Service_center_data.js"
import Service_Dealer from "../model/Service_center_dealer.js"


// *******************************************************   Service Satet API  ***************************************************// 
const create_state = async (req, res) => {
    try {
        const data = {
            name: req.body.name
        }

        const result = Service_State(data)
        const Data = await result.save()
        res.send(await ResponseMassage.ResponseSuccessMsg(Data))
    } catch (error) {
        console.log(error)
    }
}

const Get_state = async (req, res) => {
    try {
        const Find = await Service_State.find()
        if(Find !=0){
            res.send(await ResponseMassage.ResponseSuccess(Find))
        }else{
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }
    } catch (error) {
        console.log(error)
    }
}

const Get_state_ID = async (req, res) => {
    try {
        const Find = await Service_State.find({ _id: req.params.id })
        if (Find.length !== 0) {
            res.send(await ResponseMassage.ResponseSuccess(Find))
        } else {
            res.send(await ResponseMassage.ResponseErrorDataMsg("ID Not Found", Find))
        }
    } catch (error) {
        console.log(error)
    }
}

const Update_state = async (req, res) => {
    try {
        const Data = {
            name: req.body.name,
            // status: req.body.status
        }
        var Result = await Service_State.findByIdAndUpdate(req.params.id, Data, { new: true })
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
        const result = await Service_State.findByIdAndDelete(req.body.id)
        if (result) {
            res.send(await ResponseMassage.ResponseSuccess(result))
        } else {
            res.send(await ResponseMassage.ResponseErrorMsg("ID Not Found"))
        }
    } catch (error) {
        console.log(error)
    }
}

// ************************************************************* Service City API ******************************************* 
const create_city = async (req, res) => {
    try {
        const data = {
            state_id: req.body.state_id,
            name: req.body.name
        }
        const result = Service_City(data)
        const Data = await result.save()
        res.send(await ResponseMassage.ResponseSuccessMsg(Data))
    } catch (error) {
        console.log(error)
    }
}

const Get_city = async (req, res) => {
    try {
        // const Find = await Service_City.find()
        const Find = await Service_City.aggregate([
            {
                $lookup: {
                    from: "service_states",
                    localField: "state_id",
                    foreignField: "_id",
                    pipeline: [{
                        $project: { _id: 1, name: 1 }
                    }],
                    as: "state_id"
                }
            },
            {
                $unwind: "$state_id"
            }
        ])
        if(Find !=0){
            res.send(await ResponseMassage.ResponseSuccess(Find))
        }else{
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }
    } catch (error) {
        console.log(error)
    }
}

const Get_city_ID = async (req, res) => {
    try {
        const Find = await Service_City.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(req.params.id) }
            },

            {
                $lookup: {
                    from: "service_states",
                    localField: "state_id",
                    foreignField: "_id",
                    pipeline: [{
                        $project: { _id: 1, name: 1 }
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
            name: req.body.name
        }
        console.log('data', data)
        const Result = await Service_City.findByIdAndUpdate(req.params.id, data, { new: true })
        if (Result) {
            res.send(await ResponseMassage.ResponseSuccess(Result))
        } else {
            res.send(await ResponseMassage.ResponseErrorMsg("ID Not Found"))
        }
    } catch (error) {
        console.log(error)
    }
}

const Delete_city = async (req, res) => {
    try {
        const result = await Service_City.findByIdAndDelete(req.body.id)
        console.log('result', result)
        if (result) {
            res.send(await ResponseMassage.ResponseSuccess(result))
        } else {
            res.send(await ResponseMassage.ResponseErrorMsg("ID Not Found"))
        }
    } catch (error) {
        console.log(error)
    }
}
const Searching_city = async (req, res) => {
    try {
        const match = {}
        if (req.body.search && req.body.search != "") {
            match.name = req.body.search ? { $regex: ".*" + req.body.search + ".*", $options: "i" } : {}
        }
        if (req.body.state && req.body.state != "") {
            match.state_id = new mongoose.Types.ObjectId(req.body.state)
        }
        console.log('match', match)
        const Find = await Service_City.aggregate([
            {
                $match: match
            },

            {
                $lookup: {
                    from: "service_states",
                    localField: "state_id",
                    foreignField: "_id",
                    pipeline: [{
                        $project: { _id: 1, name: 1 }
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

// *********************************************************  Service Brand API ********************************************

const create_brand = async (req, res) => {
    try {
        var url
        const filename = Date.now() + "_" + req.files.brand_image.name;
        const file = req.files.brand_image;
        url = process.env.UploadLink + "Upload/Brand/" + filename;
        file.mv("public/Upload/Brand/" + filename, async (err) => {
            if (err) {
                console.log(err)
            }
        });

        const data = {
            brand_name: req.body.brand_name,
            brand_slug: req.body.brand_slug,
            brand_image: url,
            type: req.body.type,
        }
        const result = Service_Brand(data)
        const Data = await result.save()
        res.send(await ResponseMassage.ResponseSuccessMsg(Data))
    } catch (error) {
        console.log(error)
    }
}

const Get_brand = async (req, res) => {
    try {
        const Find = await Service_Brand.find()
        if(Find !=0){
            res.send(await ResponseMassage.ResponseSuccess(Find))
        }else{
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }
    } catch (error) {
        console.log(error)
    }
}

const Get_brand_ID = async (req, res) => {
    try {
        const Find = await Service_Brand.find({ _id: req.params.id })
        if (Find.length !== 0) {
            res.send(await ResponseMassage.ResponseSuccess(Find))
        } else {
            res.send(await ResponseMassage.ResponseErrorDataMsg("ID Not Found", Find))
        }
    } catch (error) {
        console.log(error)
    }
}


const Update_brand = async (req, res) => {
    try {


        var url
        if(req.files){
            const filename = Date.now() + "_" + req.files.brand_image.name;
            const file = req.files.brand_image;
            url = process.env.UploadLink + "Upload/" + filename;
            file.mv("public/Upload/" + filename, (err) => {
                if (err) {
                    console.log(err)
                }
            });
        }

        const Data = {
            brand_name: req.body.brand_name,
            brand_slug: req.body.brand_slug,
            brand_image: url,
            type: req.body.type,
        }
        var Result = await Service_Brand.findByIdAndUpdate(req.params.id, Data, { new: true })
        if (Result) {
            res.send(await ResponseMassage.ResponseSuccess(Result))
        } else {
            res.send(await ResponseMassage.ResponseErrorMsg("ID Not Found"))
        }
    } catch (error) {
        console.log(error)
    }
}

const Delete_brand = async (req, res) => {
    try {
        const result = await Service_Brand.findByIdAndDelete(req.body.id)
        if (result) {
            res.send(await ResponseMassage.ResponseSuccess(result))
        } else {
            res.send(await ResponseMassage.ResponseErrorMsg("ID Not Found"))
        }
    } catch (error) {
        console.log(error)
    }
}

const Searching_Brand = async (req, res) => {
    try {
        const query = []
        console.log('req.body', req.body)
        if (req.body.search && req.body.search != "") {
            query.push(req.body.search ? { brand_name: { $regex: ".*" + req.body.search + ".*", $options: "i" } } : {});
        }
        if (req.body.type && req.body.type != "") {
            query.push({ type: parseInt(req.body.type) });
        }
        const Find = await Service_Brand.find( query.length == 0 ? {} : { $and: query })
        if (Find.length !== 0) {
            res.send(await ResponseMassage.ResponseSuccess(Find))
        } else {
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }
    } catch (error) {
        console.log(error)
    }
}

// ****************************************************************  Service Data API ******************************************

const create_Data = async (req, res) => {
    try {
        const data = {
            type:req.body.type,
            city_id: req.body.city_id,
            // brand_id: req.body.brand_id,
            name: req.body.name,
            address: req.body.address,
            zipcode: req.body.zipcode,
            website: req.body.website,
            number: req.body.number,
            email: req.body.email,
            featured: req.body.featured,
            type: req.body.type,
            // paymentMode: req.body.paymentMode,
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

        const brand = JSON.parse(req.body.brand_id)
        if (brand.length !== 0) {
        data.brand_id = brand
        }
        const result = Service_Data(data)
        const Data = result.save()
        res.send(await ResponseMassage.ResponseSuccessMsg(Data))
    } catch (error) {
        console.log(error)
    }
}

const Get_Data = async (req, res) => {
    try {
        const Find = await Service_Data.aggregate([
            {
                $lookup: {
                    from: "service_citys",
                    localField: "city_id",
                    foreignField: "_id",
                    pipeline: [
                        { $project: { _id: 1, name: 1 } },
                    ],
                    as: "city_id"
                }
            },
            {
                $lookup: {
                    from: "service_brands",
                    localField: "brand_id",
                    foreignField: "_id",
                    pipeline: [{
                        $project: { _id: 1, brand_name: 1 }
                    }],
                    as: "brand_id"
                }
            },
            {
                $unwind: "$city_id"
            },
            // {
            //     $unwind: "$brand_id"
            // }
        ])
        if(Find !=0){
            res.send(await ResponseMassage.ResponseSuccess(Find))
        }else{
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }
    } catch (error) {
        console.log(error)
    }
}

const Get_Data_ID = async (req, res) => {
    try {
        const Find = await Service_Data.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(req.params.id) }
            },
            {
                $lookup: {
                    from: "service_citys",
                    localField: "city_id",
                    foreignField: "_id",
                    pipeline: [
                        { $project: { _id: 1, name: 1 } },
                    ],
                    as: "city_id"
                }
            },
            {
                $lookup: {
                    from: "service_brands",
                    localField: "brand_id",
                    foreignField: "_id",
                    pipeline: [{
                        $project: { _id: 1, brand_name: 1 }
                    }],
                    as: "brand_id"
                }
            },
            {
                $unwind: "$city_id"
            },
            // {
            //     $unwind: "$brand_id"
            // }
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

const Update_Data = async (req, res) => {
    try {
        const data = {
            city_id: req.body.city_id,
            name: req.body.name,
            address: req.body.address,
            zipcode: req.body.zipcode,
            website: req.body.website,
            number: req.body.number,
            email: req.body.email,
            featured: req.body.featured,
            type: req.body.type,
            sun: req.body.sun,
            mon: req.body.mon,
            tue: req.body.tue,
            wed: req.body.wed,
            thu: req.body.thu,
            fri: req.body.fri,
            sat: req.body.sat
        }
        const PaymentData = JSON.parse(req.body.paymentMode)
        data.paymentMode = PaymentData

        const BrandData = JSON.parse(req.body.brand_id)
        data.brand_id = BrandData

        var Result = await Service_Data.findByIdAndUpdate(req.params.id, data, { new: true })
        if (Result) {
            res.send(await ResponseMassage.ResponseSuccess(Result))
        } else {
            res.send(await ResponseMassage.ResponseErrorMsg("ID Not Found"))
        }
    } catch (error) {
        console.log(error)
    }
}
const Delete_Data = async (req, res) => {
    try {
        const result = await Service_Data.findByIdAndDelete(req.body.id)
        if (result) {
            res.send(await ResponseMassage.ResponseSuccess(result))
        } else {
            res.send(await ResponseMassage.ResponseErrorMsg("ID Not Found"))
        }
    } catch (error) {
        console.log(error)
    }
}
const Searching_Data = async (req, res) => {
    try {
        var match = {}
        console.log('req.body.brand', req.body.brand)
        if (req.body.searchvalue && req.body.searchvalue != "") {
            match.name = req.body.searchvalue ? { $regex: ".*" + req.body.searchvalue + ".*", $options: "i" } : {}
        }
        if (req.body.cityid && req.body.cityid != "") {
            match.city_id = new mongoose.Types.ObjectId(req.body.cityid)
        }
        if (req.body.brand && req.body.brand != "") {
            match.brand_id = new mongoose.Types.ObjectId(req.body.brand)
        }
        if (req.body.type && req.body.type != "") {
            match.type = parseInt(req.body.type)
        }
        if (req.body.added_by && req.body.added_by != "") {
            match.added_by = parseInt(req.body.added_by)
        }
        const Find = await Service_Data.aggregate([
            {
                $match: match
            },
            {
                $lookup: {
                    from: "service_citys",
                    localField: "city_id",
                    foreignField: "_id",
                    pipeline: [
                        { $project: { _id: 1, name: 1 } },
                    ],
                    as: "city_id"
                }
            },
            {
                $lookup: {
                    from: "service_brands",
                    localField: "brand_id",
                    foreignField: "_id",
                    pipeline: [{
                        $project: { _id: 1, brand_name: 1 }
                    }],
                    as: "brand_id"
                }
            },
            {
                $unwind: "$city_id"
            },
            // {
            //     $unwind: "$brand_id"
            // }
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

const Brand_dropdown_Data = async(req,res)=>{
    try {
        console.log('req.body.id', req.body.id)
        const Find = await Service_Brand.find({type:req.body.type})
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

const Brand_Get_Data = async(req,res)=>{
    try {
        const Find = await Service_Brand.find({type:parseInt(req.body.id)})
        console.log('Find', Find)
        return
        if (Find.length !== 0) {
            res.send(await ResponseMassage.ResponseSuccess(Find))
        } else {
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }
    } catch (error) {
        console.log(error)
    }
}

// ******************************************* Service Dealer ***********************************************
const create_Dealer = async (req, res) => {
    try {
        var Data = {
            city_id: req.body.city_id,
            // brand_id: req.body.brand_id,
            name: req.body.name,
            address: req.body.address,
            zipcode: req.body.zipcode,
            website: req.body.website,
            email: req.body.email,
            number: req.body.number,
            featured: req.body.featured,
            type: req.body.type,
            // paymentMode: req.body.paymentMode,
            sun: req.body.sun,
            mon: req.body.mon,
            tue: req.body.tue,
            wed: req.body.wed,
            thu: req.body.thu,
            fri: req.body.fri,
            sat: req.body.sat,
        }

        const Payment = JSON.parse(req.body.paymentMode)
        if (Payment.length !== 0) {
        Data.paymentMode = Payment
        }

        const brand = JSON.parse(req.body.brand_id)
        if (brand.length !== 0) {
        Data.brand_id = brand
        }
        const result = Service_Dealer(Data)
        const data = await result.save();
        console.log('Data', data)
        res.send(await ResponseMassage.ResponseSuccessMsg(data))

    } catch (error) {
        console.log(error)
    }
}

const Get_Dealer = async (req, res) => {
    try {
        const Find = await Service_Dealer.aggregate([
            {
                $lookup: {
                    from: "service_citys",
                    localField: "city_id",
                    foreignField: "_id",
                    pipeline: [
                        {
                            $project: { _id: 1, name: 1 }
                        }
                    ],
                    as: "city_id"
                }
            },
            {
                $lookup: {
                    from: "service_brands",
                    localField: "brand_id",
                    foreignField: "_id",
                    pipeline: [
                        {
                            $project: { _id: 1, brand_name: 1 }
                        }
                    ],
                    as: "brand_id"
                }
            },
            {
                $unwind: "$city_id"
            },
            // {
            //     $unwind: "$brand_id"
            // }
        ])
        if(Find !=0){
            res.send(await ResponseMassage.ResponseSuccess(Find))
        }else{
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }
    } catch (error) {
        console.log(error)
    }
}
const Get_dealer_ID = async (req, res) => {
    try {
        const Find = await Service_Dealer.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(req.params.id) }
            },
            {
                $lookup: {
                    from: "service_citys",
                    localField: "city_id",
                    foreignField: "_id",
                    pipeline: [
                        {
                            $project: { _id: 1, name: 1 }
                        }
                    ],
                    as: "city_id"
                }
            },
            {
                $lookup: {
                    from: "service_brands",
                    localField: "brand_id",
                    foreignField: "_id",
                    pipeline: [
                        {
                            $project: { _id: 1, brand_name: 1 }
                        }
                    ],
                    as: "brand_id"
                }
            },
            {
                $unwind: "$city_id"
            },
            // {
            //     $unwind: "$brand_id"
            // }
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

const Update_dealer = async (req, res) => {
    try {
        const Data = {
            city_id: req.body.city_id,
            // brand_id: req.body.brand_id,
            name: req.body.name,
            address: req.body.address,
            zipcode: req.body.zipcode,
            website: req.body.website,
            email: req.body.email,
            number: req.body.number,
            featured: req.body.featured,
            type: req.body.type,
            // paymentMode: req.body.paymentMode,
            sun: req.body.sun,
            mon: req.body.mon,
            tue: req.body.tue,
            wed: req.body.wed,
            thu: req.body.thu,
            fri: req.body.fri,
            sat: req.body.sat,
        }

        const PaymentData = JSON.parse(req.body.paymentMode)
        Data.paymentMode = PaymentData

        const BrandData = JSON.parse(req.body.brand_id)
        Data.brand_id = BrandData

        var Result = await Service_Dealer.findByIdAndUpdate(req.params.id, Data, { new: true })
        if (Result) {
            res.send(await ResponseMassage.ResponseSuccess(Result))
        } else {
            res.send(await ResponseMassage.ResponseErrorMsg("ID Not Found"))
        }
    } catch (error) {
        console.log(error)
    }
}

const Delete_Dealer = async (req, res) => {
    try {
        const result = await Service_Dealer.findByIdAndDelete(req.body.id)
        if (result) {
            res.send(await ResponseMassage.ResponseSuccess(result))
        } else {
            res.send(await ResponseMassage.ResponseErrorMsg("ID Not Found"))
        }
    } catch (error) {
        console.log(error)
    }
}
const Searching_Dealer = async (req, res) => {
    try {
        var match = {}
        if (req.body.searchvalue && req.body.searchvalue != "") {
            match.name = req.body.searchvalue ? { $regex: ".*" + req.body.searchvalue + ".*", $options: "i" } : {}
            // match.address = req.body.name ? { $regex: ".*" + req.body.name + ".*", $options: "i" } : {}
        }
        if (req.body.cityid && req.body.cityid != "") {
            match.city_id = new mongoose.Types.ObjectId(req.body.cityid)
        }
        if (req.body.brand && req.body.brand != "") {
            match.brand_id = new mongoose.Types.ObjectId(req.body.brand)
        }
        if (req.body.type && req.body.type != "") {
            match.type = parseInt(req.body.type)
        }
        if (req.body.added_by && req.body.added_by != "") {
            match.added_by = parseInt(req.body.added_by)
        }

        console.log('match', match)
        const Find = await Service_Dealer.aggregate([
            {
                $match: match
            },
            {
                $lookup: {
                    from: "service_citys",
                    localField: "city_id",
                    foreignField: "_id",
                    pipeline: [
                        {
                            $project: { _id: 1, name: 1 }
                        }
                    ],
                    as: "city_id"
                }
            },
            {
                $lookup: {
                    from: "service_brands",
                    localField: "brand_id",
                    foreignField: "_id",
                    pipeline: [
                        {
                            $project: { _id: 1, brand_name: 1 }
                        }
                    ],
                    as: "brand_id"
                }
            },
            {
                $unwind: "$city_id"
            },
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

const toggle_service_satate = async (req, res) => {
    try {
        const name = req.body.name;
        var data;
        if (name == "status") {
            data = await Service_State.findByIdAndUpdate({ _id: req.body.id },{ status: req.body.status },{ new: true });
        }
        res.send(data);
    } catch (error) {
        console.log(error)
    }
}

const Toggle_city = async (req, res) => {
    try {
        const name = req.body.name;
        var data;
        if (name == "status") {
            data = await Service_City.findByIdAndUpdate({ _id: req.body.id },{ status: req.body.status },{ new: true });
        }
        res.send(data);
    } catch (error) {
        console.log(error)
    }
}

const toggle_Brand = async (req, res) => {
    try {
        const name = req.body.name;
        var data;
        if (name == "status") {
            data = await Service_Brand.findByIdAndUpdate({ _id: req.body.id },{ status: req.body.status },{ new: true });
        }
        res.send(data);
    } catch (error) {
        console.log(error)
    }
}

const  toggle_service_data = async(req,res)=>{
    try {
        const name = req.body.name;
        var data;
        if (name == "status") {
            data = await Service_Data.findByIdAndUpdate({ _id: req.body.id },{ status: req.body.status },{ new: true });
        }
        if (name == "featured") {
            data = await Service_Data.findByIdAndUpdate({ _id: req.body.id },{ featured: req.body.featured },{ new: true });
        }
        res.send(data); 
    } catch (error) {
        console.log(error)
    }
}


const  toggle_service_dealer = async(req,res)=>{
    try {
        const name = req.body.name;
        var data;
        if (name == "status") {
            data = await Service_Dealer.findByIdAndUpdate({ _id: req.body.id },{ status: req.body.status },{ new: true });
        }
        if (name == "featured") {
            data = await Service_Dealer.findByIdAndUpdate({ _id: req.body.id },{ featured: req.body.featured },{ new: true });
        }
        res.send(data); 
    } catch (error) {
        console.log(error)
    }
}
export default {
    create_state, Get_state, Get_state_ID, Update_state, Delete_state,toggle_service_satate,
    create_city, Get_city, Get_city_ID, Update_city, Delete_city, Searching_city,Toggle_city,
    create_brand, Get_brand, Get_brand_ID, Update_brand, Delete_brand, Searching_Brand,toggle_Brand,
    create_Data, Get_Data, Get_Data_ID, Update_Data, Delete_Data, Searching_Data,Brand_dropdown_Data,Brand_Get_Data,toggle_service_data,
    create_Dealer, Get_Dealer, Get_dealer_ID, Update_dealer, Delete_Dealer, Searching_Dealer,toggle_service_dealer
}