import mongoose from "mongoose";
import dayjs from "dayjs";
import ResponseMassage from "../Response/All_Response.js"
import Fuel_state_modal from "../model/Fuel_state.js";
import Fuel_city_modal from "../model/Fuel_city.js";
import Fuel_price_modal from "../model/Fuelmodal.js";

const Create_fuel_state = async (req, res) => {
    try {
        const data = {
            state: req.body.state,
        }

        const result = Fuel_state_modal(data)
        var Data = await result.save()
        res.send(await ResponseMassage.ResponseSuccessMsg(Data))
    } catch (error) {
        console.log(error)
    }
}

const Create_fuel_city = async (req, res) => {
    try {
        const data = {
            city: req.body.city,
            state_id: req.body.state_id,
        }

        const result = Fuel_city_modal(data)
        var Data = await result.save()
        res.send(await ResponseMassage.ResponseSuccessMsg(Data))
    } catch (error) {
        console.log(error)
    }
}

const Get_fuel_state = async(req,res)=>{
    const result = await Fuel_state_modal.find()
    res.send(result)
}
const Get_fuel_city = async(req,res)=>{
    const result = await Fuel_city_modal.find()
    res.send(result)
}
// ********************************** create FUel Price ******************************************
const create_Fuel_Price = async (req, res) => {
        try {
            // if (!req.body.state || !req.body.petrol_price || !req.body.diesel_price || !req.body.cng_price || !req.body.lpg_price || !req.body.date) {
            //     console.log('123', )
            //     res.json(await ResponseMassage.ResponseErrorMsg("all price and date must be required"))
            // } else {
                var today = new Date(req.body.date);
                // // today.setTime(today.getTime()+ 5.5*60*60*1000)
                const findCity = await Fuel_city_modal.find({ state_id: req.body.state })
                Promise.all(
                    findCity.map(async (val, ind) => {
                        const obj = {
                            state: val.state_id, 
                            city: val._id,
                            petrol_price: req.body.petrol_price,
                            diesel_price: req.body.diesel_price,
                            cng_price: req.body.cng_price,
                            lpg_price: req.body.lpg_price,
                            date: today
                        }
                        const upsertData = await Fuel_price_modal.findOneAndUpdate({ $and: [{ city: val._id }, { date: req.body.date }] }, obj, { upsert: true, new: true })
                    })
                ).then(async () => {
                    res.json(await ResponseMassage.ResponseSuccessMsg("data added succesfully"))
                }).catch((err) => {
                    console.log(err);
                })

            // }
        } catch (err) {
            console.log(err);
        }
}

const Get_Fuel_Price = async (req, res) => {
    try {
        const Find = await Fuel_price_modal.aggregate([
            {
                $lookup: {
                    from: "fuel_states",
                    localField: "state",
                    foreignField: "_id",
                    pipeline: [
                        {
                            $project: { _id: 1, state: 1 }
                        }
                    ],
                    as: "state"
                }
            },
            {
                $lookup: {
                    from: "fuel_citys",
                    localField: "city",
                    foreignField: "_id",
                    pipeline: [
                        {
                            $project: { _id: 1, city: 1 }
                        }
                    ],
                    as: "city"
                }
            },
            {
                $unwind: "$state"
            },
            {
                $unwind: "$city"
            }
        ])

        Find?.map((val) => {
            val.date = dayjs(val?.date).format('YYYY-MM-DD')
        })

        if (Find.length !== 0) {
            res.send(await ResponseMassage.ResponseSuccess(Find))
        } else {
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }

    } catch (error) {
        console.log(error)
    }
}

const Get_Fuel_Price_ID = async (req, res) => {
    try {
        const Find = await Fuel_price_modal.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(req.params.id)}
            },
            {
                $lookup: {
                    from: "fuel_states",
                    localField: "state",
                    foreignField: "_id",
                    pipeline: [
                        {
                            $project: { _id: 1, state: 1 }
                        }
                    ],
                    as: "state"
                }
            },
            {
                $lookup: {
                    from: "fuel_citys",
                    localField: "city",
                    foreignField: "_id",
                    pipeline: [
                        {
                            $project: { _id: 1, city: 1 }
                        }
                    ],
                    as: "city"
                }
            },
            {
                $unwind: "$state"
            },
            {
                $unwind: "$city"
            }
        ])

        Find?.map((val) => {
            val.date = dayjs(val?.date).format('YYYY-MM-DD')
        })

        if (Find.length !== 0) {
            res.send(await ResponseMassage.ResponseSuccess(Find))
        } else {
            res.send(await ResponseMassage.ResponseErrorDataMsg("ID Not Found", Find))
        }
    } catch (error) {
        console.log(error)
    }
}
const Update_Fuel_Price = async (req, res) => {
    try {
        const data = {
            petrol_price: req.body.petrol_price,
            diesel_price: req.body.diesel_price,
            cng_price: req.body.cng_price,
            lpg_price: req.body.lpg_price,
        }
        const Result = await Fuel_price_modal.findByIdAndUpdate(req.params.id, data, { new: true })
        if (Result) {
            res.send(await ResponseMassage.ResponseSuccess(Result))
        } else {
            res.send(await ResponseMassage.ResponseErrorMsg("ID Not Found"))
        }
    } catch (error) {
        console.log(error)
    }
}

const Searching_Fuel_price = async (req, res) => {
    try {
        console.log('req.body.city', req.body.city)
        const match = {}
        if (req.body.state && req.body.state != "") {
            match.state = new mongoose.Types.ObjectId(req.body.state)
        }
        if(req.body.date && req.body.date){
            match.date = new Date(req.body.date)
        }
        
        if(req.body.city && req.body.city){
            const FindData = await Fuel_city_modal.find({city: { $regex: ".*" + req.body.city + ".*", $options: "i" }}).distinct("_id")
            match.city = {$in:FindData}
        }

        console.log('req.body', req.body)
        const Find = await Fuel_price_modal.aggregate([
            {
              $match: match
            },
            {
                $lookup: {
                    from: "fuel_states",
                    localField: "state",
                    foreignField: "_id",
                    pipeline: [
                        {
                            $project: { _id: 1, state: 1 }
                        }
                    ],
                    as: "state"
                }
            },
            {
                $lookup: {
                    from: "fuel_citys",
                    localField: "city",
                    foreignField: "_id",
                    pipeline: [
                        {
                            $project: { _id: 1, city: 1}
                        }
                    ],
                    as: "city"
                }
            },
            {
                $unwind: "$state"
            },
            {
                $unwind: "$city"
            }
        ])

        Find?.map((val) => {
            val.date = dayjs(val?.date).format('YYYY-MM-DD')
        })

        if (Find.length !== 0) {
            res.send(await ResponseMassage.ResponseSuccess(Find))
        } else {
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }
    } catch (error) {
        console.log(error)
    }
}

const Copy_Fuel_price = async (req, res) => {
    try {
        let dt1
        let dt2
        if (req.body.date) {
            var dateArr = new Date(req.body.date).toISOString().split("T")
            if (dateArr.length === 2) {
                const findDate = await Fuel_price_modal.find({ date: new Date(req.body.date) })
                const lastOne = await Fuel_price_modal.findOne().sort({ _id: -1 })
                if (findDate.length === 0) {
                    dateArr = dateArr[0].split("-")
                    res.send(await ResponseMassage.ResponseErrorMsg(`data not found of ${dateArr[1] + "-" + dateArr[0] + "-" + dateArr[2]}`))
                    return
                } else {
                    var date_diff_indays = function (date1, date2) {
                        dt1 = new Date(date1);
                        dt2 = new Date(date2);
                        return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
                    }
                    var diff = date_diff_indays(lastOne.date, new Date())
                    if (diff != 0) {
                        const delData = await Fuel_price_modal.deleteMany({ date: new Date() })
                        if (delData) {
                            for (let i = diff - 1; i >= 0; i--) {
                                let today = new Date().toISOString().split("T")[0]
                                today = new Date(today)
                                today = new Date(today.getTime())
                                today.setDate(today.getDate() - i)
                                Promise.all(
                                    findDate.map(async (val, ind) => {
                                        const addPrice = Fuel_price_modal({
                                            state: val.state,
                                            city: val.city,
                                            petrol_price: val.petrol_price,
                                            diesel_price: val.diesel_price,
                                            cng_price: val.cng_price,
                                            lpg_price: val.lpg_price,
                                            date: today
                                        })
                                        const savePrice = await addPrice.save()
                                    })
                                ).then(async () => {
                                    return res.send(await ResponseMassage.ResponseSuccess("data updated succesfully"))
                                }).catch((err) => {
                                    console.log(err)
                                })
                            }
                        } else {
                            return res.send(await ResponseMassage.ResponseErrorMsg("something went wrong"))
                        }
                    } else {
                        res.send(await ResponseMassage.ResponseSuccess("You Allraedy have today updated data"))
                    }
                }
            } else {
                res.send(await ResponseMassage.ResponseErrorMsg("invalid date"))
            }
        } else {
            const lastOne = await Fuel_price_modal.findOne().sort({ _id: -1 })
            const dateArr = lastOne.date.toISOString().split("T")[0]
            const todayDate = new Date( )
            // const userDate = new Date(dateArr[1] + "/" + dateArr[0] + "/" + dateArr[2])
            const userDate = new Date(dateArr)
            var date_diff_indays = function (date1, date2) {
                dt1 = new Date(date1);
                dt2 = new Date(date2);
                return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
            }
            const diff = date_diff_indays(userDate, todayDate);
            const findDate = await Fuel_price_modal.find({ date: lastOne.date })
            if (diff === 0) {
                res.send(await ResponseMassage.ResponseSuccess("You Allraedy have today updated data"))
            } else {
                for (let i = diff - 1; i >= 0; i--) {
                    var today = new Date().toISOString().split("T")[0]
                    today = new Date(today)
                    today.setDate(today.getDate() - i)
                    Promise.all(
                        findDate.map(async (val, ind) => {
                            const addPrice = Fuel_price_modal({
                                state: val.state,
                                city: val.city,
                                petrol_price: val.petrol_price,
                                diesel_price: val.diesel_price,
                                cng_price: val.cng_price,
                                lpg_price: val.lpg_price,
                                date: today
                            })
                             await addPrice.save()
                        })
                    ).then(async () => {
                        // res.send(successResponse("data updated succesfully"))
                    }).catch(async (err) => {
                        console.log('err', err)
                        // return res.send(await ResponseMassage.ResponseErrorDataMsg(err.message))
                    })
                    if (i === 0) {
                        return res.send(await ResponseMassage.ResponseSuccess("data updated succesfully"))
                    }
                }
            }
        }

    } catch (err) {
        console.log(err);
    }
}

export default {
    Create_fuel_state, Create_fuel_city,Get_fuel_state,Get_fuel_city,
    create_Fuel_Price, Get_Fuel_Price, Get_Fuel_Price_ID, Update_Fuel_Price, Searching_Fuel_price, Copy_Fuel_price
}