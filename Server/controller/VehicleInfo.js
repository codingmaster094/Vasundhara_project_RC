import dotenv from 'dotenv'
dotenv.config()
import helper from "../helper/helper.js";
import VehicleCategory from '../model/Vehicle_Category.js'
import VehicleBrand from '../model/Vehicle_Brand.js'
import BodyTypes from '../model/Body_Type.js'
import Key_Specs from '../model/Key_Specs.js'
import VehicleInfo from '../model/Vehicle_Info.js'
import Addcolor from '../model/Vehicle_model_Color.js'
import Price_Variant from '../model/Vehicle_Price_variant.js'
import vehicle_Color_Image from '../model/Vehicle_color_modal_image.js'
import Vehicle_Specification from '../model/Vehicle_specification.js';
import Variant_specification from '../model/Variant_specification.js';
import ResponseMassage from "../Response/All_Response.js"
import fs from 'fs'
import mongoose from 'mongoose';


//Category Module

const GetAllCategory = async (req, res) => {
    try {
        const data = await VehicleCategory.find().sort({ name: 1 }).collation({ locale: 'en' })
        res.json(helper.dataResponse("Data found successfully", data))
    } catch (err) {
        console.log(err);
        res.json(helper.catchError(err.message))
    }
}

const AddVehicleCategory = async (req, res) => {
    try {
        if (!req.body.name || !req.body.status || !req.files) {
            res.json(helper.requiredError("Name, Status and image is required"))
        } else {
            let url = ""
            if (req.files.image) {
                const file = req.files.image
                const nameArr = file.name.split(".")
                const fileName = Date.now() + "." + nameArr[nameArr.length - 1]
                url = `${process.env.IMAGEURL}/Upload/vehicleCategory/${fileName}`
                file.mv('public/Upload/vehicleCategory/' + fileName, (err, data) => {
                    if (err) {
                        console.log(err);
                    }
                })
            }
            const addCatetgory = VehicleCategory({
                name: req.body.name,
                image: url,
                status: req.body.status
            })
            const saveCategory = await addCatetgory.save()
            if (saveCategory) {
                res.json(helper.successResponse("Category added successfuly"))
            } else {
                res.json(helper.catchError("Soemthing went wrong"))
            }
        }
    } catch (err) {
        console.log(err);
        res.json(helper.catchError(err.message))
    }
}

const VehicleCategoryById = async (req, res) => {
    try {
        if (!req.params.id) {
            res.json(helper.requiredError("id must be required"))
        } else {
            const data = await VehicleCategory.findById({ _id: req.params.id })
            if (data) {
                res.json(helper.dataResponse("Data found successfully", data))
            } else {
                res.json(helper.findError("Data not found"))
            }
        }
    } catch (err) {
        console.log(err);
        res.json(helper.catchError(err.message))
    }
}

const UpdateVehicleCategory = async (req, res) => {
    try {
        if (!req.params.id) {
            res.json(helper.requiredError("id must be required"))
        } else {
            const findData = await VehicleCategory.findById({ _id: req.params.id })
            let url = ""
            let updateData = {
                name: req.body.name,
                status: req.body.status
            }
            if (req.files) {
                if (req.files.image) {
                    const extName = findData.image.split("/")
                    const imgName = extName[extName.length - 1]
                    fs.unlink(`./public/Upload/vehicleCategory/${imgName}`, (err, data) => {
                        if (err) {
                            console.log("image not found");
                        } else {
                            console.log("image deleted");
                        }
                    })
                    const file = req.files.image
                    const nameArr = file.name.split(".")
                    const fileName = Date.now() + "." + nameArr[nameArr.length - 1]
                    url = `${process.env.IMAGEURL}/Upload/vehicleCategory/${fileName}`
                    file.mv('public/Upload/vehicleCategory/' + fileName, (err, data) => {
                        if (err) {
                            console.log(err);
                        }
                    })
                }
            }
            if (url != "") {
                updateData.image = url
            }
            const updateCat = await VehicleCategory.findByIdAndUpdate({ _id: req.params.id }, updateData, { new: true })
            if (updateCat) {
                res.json(helper.successResponse("Category updated successfully"))
            } else {
                res.json(helper.findError("Soemthing went wrong"))
            }

        }
    } catch (err) {
        console.log(err);
        res.json(helper.catchError(err.message))
    }
}

const DeleteVehicleCategory = async (req, res) => {
    try {
        if (!req.body.id) {
            res.json(helper.requiredError("id is required"))
        } else {
            const findCat = await VehicleCategory.findById({ _id: req.body.id })
            if (findCat) {
                const imgName = findCat.image.split("/")
                // fs.unlinkSync(`./public/image/vehicleCategory/${imgName}`);
                fs.unlink(`../public/image/vehicleCategory/${imgName}`, (err, data) => {
                    if (err) {
                        console.log("image not found");
                    } else {
                        console.log("image deleted");
                    }
                })
                const deleteCat = await VehicleCategory.findByIdAndDelete({ _id: req.body.id })
                if (deleteCat) {
                    res.json(helper.successResponse("Category deleted successfully"))
                } else {
                    res.json(helper.catchError("Something went wrong"))
                }
            } else {
                res.json(helper.findError("Category not found"))
            }
        }
    } catch (err) {
        console.log(err);
        res.json(helper.catchError(err.message))
    }
}

const ToggleVehicaleinfo = async (req, res) => {
    try {
        const name = req.body.name;
        var data;
        console.log('name', name)
        if (name == "status") {
            data = await VehicleCategory.findByIdAndUpdate({ _id: req.body.id }, { status: req.body.status }, { new: true });
        }
        res.send(data);
    } catch (error) {
        console.log(error)
    }
}


//Brand Module

const GetAllBrand = async (req, res) => {
    try {
        const data = await VehicleBrand.find().populate("category_id")
        res.json(helper.dataResponse("Data found successfully", data))
    } catch (err) {
        console.log(err);
        res.json(helper.catchError(err.message))
    }
}

const IDGetAllBrand = async(req,res)=>{
    try {
        console.log('JSON.parse(req.body.id)', JSON.parse(req.body.id))
        const DATA = JSON.parse(req.body.id)
        const promises = DATA.map(async (ID) => {
            return await VehicleBrand.find({ category_id: ID }).populate("category_id");
        });
        let results = await Promise.all(promises);
          res.json(helper.dataResponse("Data found successfully", results))
    } catch (err) {
        console.log(err);
        res.json(helper.catchError(err.message))
    }
}

const BrandAdd = async (req, res) => {
    try {
        if (!req.body.category_id || !req.body.name || !req.body.title || !req.body.driving_url || !req.body.note || !req.body.is_popular || !req.files) {
            res.json(helper.requiredError("category_id, name, title, url, note, popular and image is required"))
        } else {
            let url = ""
            if (req.files.image) {
                const file = req.files.image
                const nameArr = file.name.split(".")
                const fileName = Date.now() + "." + nameArr[nameArr.length - 1]
                url = `${process.env.IMAGEURL}/Upload/Vehiclebrand/${fileName}`
                file.mv('public/Upload/Vehiclebrand/' + fileName, (err, data) => {
                    if (err) {
                        console.log(err);
                    }
                })
            }
            const addBrand = VehicleBrand({
                category_id: req.body.category_id,
                name: req.body.name,
                title: req.body.title,
                driving_url: req.body.driving_url,
                note: req.body.note,
                image: url,
                is_popular: req.body.is_popular
            })
            console.log('addBrand', addBrand)
            const saveBrand = await addBrand.save()
            if (saveBrand) {
                res.json(helper.successResponse("Brand added successfully"))
            } else {
                res.json(helper.catchError(err.message))
            }
        }
    } catch (err) {
        console.log(err);
        res.json(helper.catchError(err.message))
    }
}

const BrandById = async (req, res) => {
    try {
        if (!req.params.id) {
            res.json(helper.requiredError("id must be required"))
        } else {
            const data = await VehicleBrand.findById({ _id: req.params.id }).populate("category_id")
            if (data) {
                res.json(helper.dataResponse("Data found successfully", data))
            } else {
                res.json(helper.findError("Data not found"))
            }
        }
    } catch (err) {
        console.log(err);
        res.json(helper.catchError(err.message))
    }
}

const BrandUpdate = async (req, res) => {
    try {
        if (!req.params.id || !req.body.category_id || !req.body.name || !req.body.title || !req.body.driving_url || !req.body.note || !req.body.is_popular) {
            res.json(helper.requiredError("_id,category_id, name, title, url, note and popular is required"))
        } else {
            const findData = await VehicleBrand.findById({ _id: req.params.id })
            let url = ""
            let updateData = {
                category_id: req.body.category_id,
                name: req.body.name,
                title: req.body.title,
                driving_url: req.body.driving_url,
                note: req.body.note,
                // image:url,
                is_popular: req.body.is_popular
            }
            if (req.files) {
                if (req.files.image) {
                    const extName = findData.image.split("/")
                    const imgName = extName[extName.length - 1]
                    fs.unlink(`./public/Upload/Vehiclebrand/${imgName}`, (err, data) => {
                        if (err) {
                            console.log("image not found");
                        } else {
                            console.log("image deleted");
                        }
                    })
                    const file = req.files.image
                    const nameArr = file.name.split(".")
                    const fileName = Date.now() + "." + nameArr[nameArr.length - 1]
                    url = `${process.env.IMAGEURL}/Upload/Vehiclebrand/${fileName}`
                    file.mv('public/Upload/Vehiclebrand/' + fileName, (err, data) => {
                        if (err) {
                            console.log(err);
                        }
                    })
                }
            }
            if (url != "") {
                updateData.image = url
            }
            const updateCat = await VehicleBrand.findByIdAndUpdate({ _id: req.params.id }, updateData, { new: true })
            if (updateCat) {
                res.json(helper.successResponse("Brand updated successfully"))
            } else {
                res.json(helper.findError("Soemthing went wrong"))
            }

        }
    } catch (err) {
        console.log(err);
        res.json(helper.catchError(err.message))
    }
}

const DeleteBrand = async (req, res) => {
    try {
        if (!req.body.id) {
            res.json(helper.requiredError("id is required"))
        } else {
            const findCat = await VehicleBrand.findById({ _id: req.body.id })
            if (findCat) {
                const imgName = findCat.image.split("/")
                // fs.unlinkSync(`./public/image/vehicleCategory/${imgName}`);
                fs.unlink(`../public/image/brand/${imgName}`, (err, data) => {
                    if (err) {
                        console.log("image not found");
                    } else {
                        console.log("image deleted");
                    }
                })
                const deleteCat = await VehicleBrand.findByIdAndDelete({ _id: req.body.id })
                if (deleteCat) {
                    res.json(helper.successResponse("Category deleted successfully"))
                } else {
                    res.json(helper.catchError("Something went wrong"))
                }
            } else {
                res.json(helper.findError("Vehicle Brand not found"))
            }
        }
    } catch (err) {
        console.log(err);
        res.json(helper.catchError(err.message))
    }
}

const ToggleBrand = async (req, res) => {
    try {
        const name = req.body.name;
        var data;
        if (name == "is_popular") {
            data = await VehicleBrand.findByIdAndUpdate({ _id: req.body.id }, { is_popular: req.body.is_popular }, { new: true });
        }
        res.send(data);
    } catch (error) {
        console.log(error)
    }
}

const SearchingBrand = async (req, res) => {
    try {
        var query = [];
        if (req.body.search && req.body.search !== "") {
            query.push(req.body.search ? { name: { $regex: ".*" + req.body.search + ".*", $options: "i" } } : {});
        }
        if (req.body.category_id && req.body.category_id !== "") {
            query.push({ category_id: req.body.category_id });
        }

        const data = await VehicleBrand.find(query.length === 0 ? {} : { $and: query }).populate("category_id")
        res.json(helper.dataResponse("Data found successfully", data))

    } catch (error) {
        console.log(error)
    }
}

// Body Types

const GetBodyTypes = async (req, res) => {
    try {
        const data = await BodyTypes.find().populate("category_id")
        res.json(helper.dataResponse("Data found successfully", data))
    } catch (err) {
        console.log(err);
        res.json(helper.catchError(err.message))
    }
}

const AddBodyTypes = async (req, res) => {
    try {
        if (!req.body.category_id || !req.body.name || !req.body.status || !req.files) {
            res.json(helper.requiredError("category_id, name, status and image is required"))
        } else {
            let url = ""
            if (req.files.image) {
                const file = req.files.image
                const nameArr = file.name.split(".")
                const fileName = Date.now() + "." + nameArr[nameArr.length - 1]
                url = `${process.env.IMAGEURL}/Upload/bodyType/${fileName}`
                file.mv('public/Upload/bodyType/' + fileName, (err, data) => {
                    if (err) {
                        console.log(err);
                    }
                })
            }
            const addType = BodyTypes({
                category_id: req.body.category_id,
                name: req.body.name,
                image: url,
                status: req.body.status
            })
            const saveType = await addType.save()
            if (saveType) {
                res.json(helper.successResponse("Body Type added successfully"))
            } else {
                res.json(helper.catchError(err.message))
            }
        }
    } catch (err) {
        console.log(err);
        res.json(helper.catchError(err.message))
    }
}

const BodyTypeById = async (req, res) => {
    try {
        if (!req.params.id) {
            res.json(helper.requiredError("id must be required"))
        } else {
            const data = await BodyTypes.findById({ _id: req.params.id }).populate("category_id")
            if (data) {
                res.json(helper.dataResponse("Data found successfully", data))
            } else {
                res.json(helper.findError("Data not found"))
            }
        }
    } catch (err) {
        console.log(err);
        res.json(helper.catchError(err.message))
    }
}

const UpdateBodyType = async (req, res) => {
    try {
        console.log('req.body', req.body)
        const findData = await BodyTypes.findById({ _id: req.params.id })
        let url = ""
        let updateData = {
            category_id: req.body.category_id,
            name: req.body.name,
            status: req.body.status
        }
        if (req.files) {
            if (req.files.image) {
                const extName = findData.image.split("/")
                const imgName = extName[extName.length - 1]
                fs.unlink(`./public/Upload/bodyType/${imgName}`, (err, data) => {
                    if (err) {
                        console.log("image not found");
                    } else {
                        console.log("image deleted");
                    }
                })
                const file = req.files.image
                const nameArr = file.name.split(".")
                const fileName = Date.now() + "." + nameArr[nameArr.length - 1]
                url = `${process.env.IMAGEURL}/Upload/bodyType/${fileName}`
                file.mv('public/Upload/bodyType/' + fileName, (err, data) => {
                    if (err) {
                        console.log(err);
                    }
                })
            }
        }
        if (url != "") {
            updateData.image = url
        }
        const updateCat = await BodyTypes.findByIdAndUpdate({ _id: req.params.id }, updateData, { new: true })
        if (updateCat) {
            res.json(helper.successResponse("Body Type updated successfully"))
        } else {
            res.json(helper.findError("Soemthing went wrong"))
        }
    } catch (err) {
        console.log(err);
        res.json(helper.catchError(err.message))
    }
}

const DeleteBodyType = async (req, res) => {
    try {
        if (!req.body.id) {
            res.json(helper.requiredError("id is required"))
        } else {
            const findCat = await BodyTypes.findById({ _id: req.body.id })
            if (findCat) {
                const imgName = findCat.image.split("/")
                // fs.unlinkSync(`./public/image/vehicleCategory/${imgName}`);
                fs.unlink(`../public/image/bodyType/${imgName}`, (err, data) => {
                    if (err) {
                        console.log("image not found");
                    } else {
                        console.log("image deleted");
                    }
                })
                const deleteCat = await BodyTypes.findByIdAndDelete({ _id: req.body.id })
                if (deleteCat) {
                    res.json(helper.successResponse("Body Type deleted successfully"))
                } else {
                    res.json(helper.catchError("Something went wrong"))
                }
            } else {
                res.json(helper.findError("Body Type not found"))
            }
        }
    } catch (err) {
        console.log(err);
        res.json(helper.catchError(err.message))
    }
}

const ToggleBody_type = async (req, res) => {
    try {
        console.log('req.body', req.body)
        const name = req.body.name;
        var data;
        if (name == "status") {
            data = await BodyTypes.findByIdAndUpdate({ _id: req.body.id }, { status: req.body.status }, { new: true });
        }
        res.send(data);
    } catch (error) {
        console.log(error)
    }
}

const SearchingBody_type = async (req, res) => {
    try {
        var query = [];
        if (req.body.category_id && req.body.category_id !== "") {
            query.push({ category_id: req.body.category_id });
        }

        const data = await BodyTypes.find(query.length === 0 ? {} : { $and: query }).populate("category_id")
        res.json(helper.dataResponse("Data found successfully", data))

    } catch (error) {
        console.log(error)
    }
}

const AddVehicleInformation = async (req, res) => {
    const { body, files } = req

    let imgUrl = ""
    let thumbImgUrl = ""
    var addData
    if (req.files.image) {
        const file = req.files.image
        const nameArr = file.name.split(".")
        const fileName = Date.now() + "." + nameArr[nameArr.length - 1]
        imgUrl = `${process.env.IMAGEURL}/Upload/vehicleInfo/image/${fileName}`
        file.mv('public/Upload/vehicleInfo/image/' + fileName, (err, data) => {
            if (err) {
                console.log(err);
            }
        })
    }

    if (req.files.thumb_image) {
        const file = req.files.thumb_image
        const nameArr = file.name.split(".")
        const fileName = Date.now() + "." + nameArr[nameArr.length - 1]
        thumbImgUrl = `${process.env.IMAGEURL}/Upload/vehicleInfo/thumbImage/${fileName}`
        file.mv('public/Upload/vehicleInfo/thumbImage/' + fileName, (err, data) => {
            if (err) {
                console.log(err);
            }
        })
    }
    var phpid = await VehicleInfo.findOne({}).select('php_id').sort({ php_id: -1 })
    addData = VehicleInfo.create({
        php_id: (phpid) ? phpid.php_id + 1 : 1,
        category_id: req.body.category_id,
        brand_id: req.body.brand_id,
        body_id: req.body.body_id,
        name: req.body.name,
        fuel_type: req.body.fuel_type,
        rating: req.body.rating,
        review: req.body.review,
        min_price: req.body.min_price,
        max_price: req.body.max_price,
        varient_name: req.body.varient_name,
        price_range: req.body.price_range,
        status: req.body.status,
        image: imgUrl,
        thumb_image: thumbImgUrl,
        launched_at: req.body.launched_at,
        launched_date: req.body.launched_date,
        popularity: req.body.popularity,
        mileage: req.body.mileage,
        engine: req.body.engine,
        max_power: req.body.max_power,
        showroom_price: req.body.showroom_price,
        road_price: req.body.road_price,
        rto_price: req.body.rto_price,
        insurance_price: req.body.insurance_price,
        other_price: req.body.other_price,
        upcoming: req.body.upcoming,
        latest: req.body.latest,
        content_updated: req.body.content_updated,
        designer_updated: req.body.designer_updated,
        manu_des: req.body.manu_des,
        price_des: req.body.price_des,
        high_des: req.body.high_des,
        key_specs: req.body.key_specs,
        seo_note: req.body.seo_note

    }).then(async (res) => {

        const Color_MODAL = [];
        Object.keys(body).forEach((key) => {
            if (key.startsWith('color_name-')) {
                const index = parseInt(key.split('-')[1]);
                const color_name = body[`color_name-${index}`];
                const color_code = body[`color_code-${index}`];
                var fileArray = files[`Modal_color_image-${index}`];
                var row = {
                    color_name,
                    color_code,
                };
                if (files) {
                    if (fileArray.length == undefined) {
                        fileArray = [fileArray]
                        row.Modal_color_Image = fileArray.map(file => file)
                    } else {
                        row.Modal_color_Image = fileArray.map(file => file)
                    }
                }
                Color_MODAL.push(row);
            }
        });
        Promise.all(
            Color_MODAL.map((v) => {
                const Color_data = Addcolor.create({
                    vehicle_information_id: res._id,
                    color_name: v.color_name,
                    color_code: v.color_code
                }).then((res) => {
                    var ModalColor_url
                    v.Modal_color_Image.map(async (val, i) => {
                        const file = val
                        const ext = file?.name?.split(".")
                        const fileName = Date.now() + "." + ext[ext.length - 1]
                        ModalColor_url = `${process.env.IMAGEURL}/Upload/vehicleInfo/colorModalimage/${fileName}`
                        val.mv('public/Upload/vehicleInfo/colorModalimage/' + fileName, (err, data) => {
                            if (err) {
                                console.log(err);
                            }
                        })
                        const ImageSave = await vehicle_Color_Image({
                            Color_Modal_id: res._id,
                            Modal_color_image: ModalColor_url,
                        })
                        await ImageSave.save()
                    })

                })
                return res
            })
        ).then((res) => {
            const PRICE_DATA = [];
            Object.keys(body).forEach((key) => {
                if (key.startsWith('name-')) {
                    const index = parseInt(key.split('-')[1]);
                    const name = body[`name-${index}`];
                    const engine = body[`engine-${index}`];
                    const price = body[`price-${index}`];
                    const price_range = body[`price_range-${index}`];
                    const status = body[`status-${index}`];
                    const fuel_type = body[`fuel_type-${index}`];
                    const ex_show_room_rice = body[`ex_show_room_rice-${index}`];
                    const mileage = body[`mileage-${index}`];
                    const on_road_price = body[`on_road_price-${index}`];
                    const latest_update = body[`latest_update-${index}`];
                    const insurance_price = body[`insurance_price-${index}`];
                    const rto_price = body[`rto_price-${index}`];
                    const other_price = body[`other_price-${index}`];
                    const review_count = body[`review_count-${index}`];
                    const rating = body[`rating-${index}`];
                    const launched_at = body[`launched_at-${index}`];
                    var fileArray = files[`variant_image-${index}`];
                    var Price_row = {
                        name,
                        engine,
                        price,
                        price_range,
                        status,
                        fuel_type,
                        ex_show_room_rice,
                        mileage,
                        on_road_price,
                        latest_update,
                        insurance_price,
                        rto_price,
                        other_price,
                        review_count,
                        rating,
                        launched_at,
                    };

                    if (files) {
                        Price_row.variant_image = fileArray
                    }
                    PRICE_DATA.push(Price_row);
                }
            });
            PRICE_DATA.map(async (val) => {
                var PriceVariant_url
                const file = val.variant_image
                const ext = file?.name?.split(".")
                const fileName = Date.now() + "." + ext[ext.length - 1]
                PriceVariant_url = `${process.env.IMAGEURL}/Upload/vehicleInfo/PriceVAriantImage/${fileName}`
                file.mv('public/Upload/vehicleInfo/PriceVAriantImage/' + fileName, (err, data) => {
                    if (err) {
                        console.log(err);
                    }
                })
                const VariantData = await Price_Variant({
                    vehicle_information_id: res[0]._id,
                    name: val.name,
                    engine: val.engine,
                    price: val.price,
                    price_range: val.price_range,
                    status: val.status,
                    variant_image: PriceVariant_url,
                    fuel_type: val.fuel_type,
                    ex_show_room_rice: val.ex_show_room_rice,
                    mileage: val.mileage,
                    on_road_price: val.on_road_price,
                    latest_update: val.latest_update,
                    insurance_price: val.insurance_price,
                    rto_price: val.rto_price,
                    other_price: val.other_price,
                    review_count: val.review_count,
                    rating: val.rating,
                    launched_at: val.launched_at,
                    is_scrapping: val.is_scrapping
                })
                await VariantData.save()
            })
        })
    })
    res.send("Data Add Succes")
}


const GetVehicleInformation = async (req, res) => {
    try {
        const data = await VehicleInfo.find().populate("category_id", { _id: 1, name: 1 }).populate("brand_id", { _id: 1, name: 1 }).populate("body_id", { _id: 1, name: 1 })
        res.json(helper.dataResponse("Data found successfully", data))
    } catch (err) {
        console.log(err);
        res.json(err.message)
    }
}

const ViewVehicleInformation = async (req, res) => {
    try {
        const p = await VehicleInfo.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(req.params.id) }
            },
            {
                $lookup: {
                    from: "vehicle_categories",
                    foreignField: "_id",
                    localField: "category_id",
                    pipeline: [{ $project: { _id: 1, name: 1 } }],
                    as: "category_id"
                }
            },
            {
                $unwind: "$category_id"
            },
            {
                $lookup: {
                    from: "vehicle_brands",
                    foreignField: "_id",
                    localField: "brand_id",
                    pipeline: [{ $project: { _id: 1, name: 1 } }],
                    as: "brand_id"
                }
            },
            {
                $unwind: "$brand_id"
            },
            {
                $lookup: {
                    from: "body_types",
                    foreignField: "_id",
                    localField: "body_id",
                    pipeline: [{ $project: { _id: 1, name: 1 } }],
                    as: "body_id"
                }
            },
            {
                $unwind: "$body_id"
            },
            {
                $lookup: {
                    from: "vehicle_model_colors",
                    localField: "_id",
                    foreignField: "vehicle_information_id",
                    pipeline: [
                        {
                            $lookup: {
                                from: "vehicle_info_color_images",
                                localField: "_id",
                                foreignField: "Color_Modal_id",
                                as: "Modal_color_image"
                            }
                        },
                        {
                            $project: { _id: 1, color_name: 1, color_code: 1, Modal_color_image: 1 }
                        }
                    ],
                    as: "Modal_color_Data"
                }
            },
            {
                $lookup: {
                    from: "pricevariants",
                    localField: "_id",
                    foreignField: "vehicle_information_id",
                    as: "pricevariants"
                }
            }
        ])
        res.send(p[0])
    } catch (error) {
        console.log(error)
    }
}

const UpdateVehicleInformation = async (req, res) => {
    try {
        const { body, files } = req
        let imgUrl
        let thumbImgUrl
        if (req.files) {
            if (req.files.image) {
                const file = req.files.image
                const nameArr = file.name.split(".")
                const fileName = Date.now() + "." + nameArr[nameArr.length - 1]
                imgUrl = `${process.env.IMAGEURL}/Upload/vehicleInfo/image/${fileName}`
                file.mv('public/Upload/vehicleInfo/image/' + fileName, (err, data) => {
                    if (err) {
                        console.log(err);
                    }
                })
            }

            if (req.files.thumb_image) {
                const file = req.files.thumb_image
                const nameArr = file.name.split(".")
                const fileName = Date.now() + "." + nameArr[nameArr.length - 1]
                thumbImgUrl = `${process.env.IMAGEURL}/Upload/vehicleInfo/thumbImage/${fileName}`
                file.mv('public/Upload/vehicleInfo/thumbImage/' + fileName, (err, data) => {
                    if (err) {
                        console.log(err);
                    }
                })
            }
        }
        const data = {
            category_id: req.body.category_id,
            brand_id: req.body.brand_id,
            body_id: req.body.body_id,
            name: req.body.name,
            fuel_type: req.body.fuel_type,
            rating: req.body.rating,
            review: req.body.review,
            min_price: req.body.min_price,
            max_price: req.body.max_price,
            varient_name: req.body.varient_name,
            price_range: req.body.price_range,
            status: req.body.status,
            image: imgUrl,
            thumb_image: thumbImgUrl,
            launched_at: req.body.launched_at,
            launched_date: req.body.launched_date,
            popularity: req.body.popularity,
            mileage: req.body.mileage,
            engine: req.body.engine,
            max_power: req.body.max_power,
            showroom_price: req.body.showroom_price,
            road_price: req.body.road_price,
            rto_price: req.body.rto_price,
            insurance_price: req.body.insurance_price,
            other_price: req.body.other_price,
            upcoming: req.body.upcoming,
            latest: req.body.latest,
            content_updated: req.body.content_updated,
            designer_updated: req.body.designer_updated,
            manu_des: req.body.manu_des,
            price_des: req.body.price_des,
            high_des: req.body.high_des,
            key_specs: req.body.key_specs,
            seo_note: req.body.seo_note
        }
        var Result = await VehicleInfo.findByIdAndUpdate(req.params.id, data, { new: true })
        if (Result) {
            res.send(await ResponseMassage.ResponseSuccess(Result))
        } else {
            res.send(await ResponseMassage.ResponseErrorMsg("ID Not Found"))
        }

        //************************************************************ */ Vehicle Color Modal *************************************************************
        const Color_DATA = [];
        Object.keys(body).forEach((key, i) => {
            if (key.startsWith('color_name-')) {
                const index = parseInt(key.split('-')[1])
                const __id = body[`__id-${index}`];
                const color_name = body[`color_name-${index}`];
                const color_code = body[`color_code-${index}`];
                var row = {
                    __id,
                    color_name,
                    color_code,
                };
                if (files) {
                    var fileArray = files[`Modal_color_image-${index}`];
                    if (fileArray != undefined) {
                        if (fileArray.length == undefined) {
                            fileArray = [fileArray]
                            row.Modal_color_Image = fileArray?.map(file => file)
                        } else {
                            row.Modal_color_Image = fileArray?.map(file => file)
                        }
                    }
                }
                Color_DATA.push(row);
            }
        })

        Color_DATA.map(async (val, i) => {
            let Color_data
            if (val.__id != 'undefined') {
                let ModalColor_update_url
                Color_data = {
                    vehicle_information_id: Result._id,
                    color_name: val.color_name,
                    color_code: val.color_code
                }
                val.Modal_color_Image?.map(async (V, i) => {
                    const ext = V?.name?.split(".")
                    const fileName = Date.now() + "." + ext[ext.length - 1]
                    ModalColor_update_url = `${process.env.IMAGEURL}/Upload/vehicleInfo/colorModalimage/${fileName}`
                    V.mv('public/Upload/vehicleInfo/colorModalimage/' + fileName, (err, data) => {
                        if (err) {
                            console.log(err);
                        }
                    })
                    const ImageSave = await vehicle_Color_Image({
                        Color_Modal_id: val.__id,
                        Modal_color_image: ModalColor_update_url,
                    })
                    await ImageSave.save()

                })
                Addcolor.findByIdAndUpdate({ _id: val.__id }, Color_data, { new: true }).then((res1) => {
                }).catch((err) => {
                    console.log(err)
                })
            }
            if (val.__id == 'undefined') {
                let Color_image = val.Modal_color_Image
                Color_data = await Addcolor.create({
                    vehicle_information_id: Result._id,
                    color_name: val.color_name,
                    color_code: val.color_code
                }).then((res) => {
                    Color_image.map(async (V, i) => {
                        let ModalColor_new_url = ""
                        const ext = V?.name?.split(".")
                        const fileName = Date.now() + "." + ext[ext.length - 1]
                        ModalColor_new_url = `${process.env.IMAGEURL}/Upload/vehicleInfo/colorModalimage/${fileName}`
                        V.mv('public/Upload/vehicleInfo/colorModalimage/' + fileName, (err, data) => {
                            if (err) {
                                console.log(err);
                            }
                        })
                        console.log('ModalColor_new_url', ModalColor_new_url)
                        const ImageSave = await vehicle_Color_Image({
                            Color_Modal_id: res._id,
                            Modal_color_image: ModalColor_new_url,
                        })
                        await ImageSave.save()
                    })
                })
            }

        })

        //*******************************************************/ Vehicle Prive Variant ***********************************************

        const PRICE_DATA = [];
        Object.keys(body).forEach((key) => {
            if (key.startsWith('name-')) {
                const index = parseInt(key.split('-')[1]);
                const _Price_id = body[`_Price_id-${index}`];
                const name = body[`name-${index}`];
                const engine = body[`engine-${index}`];
                const price = body[`price-${index}`];
                const price_range = body[`price_range-${index}`];
                const status = body[`status-${index}`];
                const fuel_type = body[`fuel_type-${index}`];
                const ex_show_room_rice = body[`ex_show_room_rice-${index}`];
                const mileage = body[`mileage-${index}`];
                const on_road_price = body[`on_road_price-${index}`];
                const latest_update = body[`latest_update-${index}`];
                const insurance_price = body[`insurance_price-${index}`];
                const rto_price = body[`rto_price-${index}`];
                const other_price = body[`other_price-${index}`];
                const review_count = body[`review_count-${index}`];
                const rating = body[`rating-${index}`];
                const launched_at = body[`launched_at-${index}`];
                var Price_row = {
                    _Price_id,
                    name,
                    engine,
                    price,
                    price_range,
                    status,
                    fuel_type,
                    ex_show_room_rice,
                    mileage,
                    on_road_price,
                    latest_update,
                    insurance_price,
                    rto_price,
                    other_price,
                    review_count,
                    rating,
                    launched_at,
                };

                if (files) {
                    const fileArray = files[`variant_image-${index}`];
                    Price_row.variant_image = fileArray
                }
                PRICE_DATA.push(Price_row);
            }
        });


        PRICE_DATA.map(async (val, i) => {
            if (val._Price_id != 'undefined') {
                var PriceVariant_Update_url
                var price_iamge
                if (val.variant_image != undefined) {
                    if (val.variant_image.length === undefined) {
                        price_iamge = [val.variant_image]
                    }
                    const file = price_iamge
                    const ext = file[0]?.name?.split(".")
                    const fileName = Date.now() + "." + ext[ext.length - 1]
                    PriceVariant_Update_url = `${process.env.IMAGEURL}/Upload/vehicleInfo/PriceVAriantImage/${fileName}`
                    file[0].mv('public/Upload/vehicleInfo/PriceVAriantImage/' + fileName, (err, data) => {
                        if (err) {
                            console.log(err);
                        }
                    })
                }
                const Price_data = {
                    vehicle_information_id: Result._id,
                    name: val.name,
                    engine: val.engine,
                    price: val.price,
                    price_range: val.price_range,
                    status: val.status,
                    variant_image: PriceVariant_Update_url,
                    fuel_type: val.fuel_type,
                    ex_show_room_rice: val.ex_show_room_rice,
                    mileage: val.mileage,
                    on_road_price: val.on_road_price,
                    latest_update: val.latest_update,
                    insurance_price: val.insurance_price,
                    rto_price: val.rto_price,
                    other_price: val.other_price,
                    review_count: val.review_count,
                    rating: val.rating,
                    launched_at: val.launched_at,
                }
                const result = await Price_Variant.findByIdAndUpdate({ _id: val._Price_id }, Price_data, { new: true })
            }
            if (val._Price_id == 'undefined') {
                var PriceVariant_new_url
                var price_iamge
                if (val.variant_image.length === undefined) {
                    price_iamge = [val.variant_image]
                }
                const file = price_iamge
                const ext = file[0]?.name?.split(".")
                const fileName = Date.now() + "." + ext[ext.length - 1]
                PriceVariant_new_url = `${process.env.IMAGEURL}/Upload/vehicleInfo/PriceVAriantImage/${fileName}`
                file[0].mv('public/Upload/vehicleInfo/PriceVAriantImage/' + fileName, (err, data) => {
                    if (err) {
                        console.log(err);
                    }
                })
                const Price_data = Price_Variant.create({
                    vehicle_information_id: Result._id,
                    name: val.name,
                    engine: val.engine,
                    price: val.price,
                    price_range: val.price_range,
                    status: val.status,
                    variant_image: PriceVariant_new_url,
                    fuel_type: val.fuel_type,
                    ex_show_room_rice: val.ex_show_room_rice,
                    mileage: val.mileage,
                    on_road_price: val.on_road_price,
                    latest_update: val.latest_update,
                    insurance_price: val.insurance_price,
                    rto_price: val.rto_price,
                    other_price: val.other_price,
                    review_count: val.review_count,
                    rating: val.rating,
                    launched_at: val.launched_at,
                })
            }
        })
    } catch (error) {
        console.log(error)
    }
}
const Delete_vehicle_info = async (req, res) => {
    try {

        const FIND = await VehicleInfo.findByIdAndDelete({ _id: req.body.id })
        res.send("Delete Successfuly")

    } catch (error) {
        console.log(error)
    }
}

const SerachingVehicleInformation = async (req, res) => {
    try {
        let match = {}
        if (req.body.search && req.body.search != "") {
            match.name = req.body.search ? { $regex: ".*" + req.body.search + ".*", $options: "i" } : {}
        }

        if (req.body.categoryId && req.body.categoryId != "") {
            match.category_id = new mongoose.Types.ObjectId(req.body.categoryId)
        }

        if (req.body.brandId && req.body.brandId != "") {
            match.brand_id = new mongoose.Types.ObjectId(req.body.brandId)
        }

        const Find = await VehicleInfo.aggregate([
            {
                $match: match
            },
            {
                $lookup: {
                    from: "vehicle_categories",
                    foreignField: "_id",
                    localField: "category_id",
                    pipeline: [{ $project: { _id: 1, name: 1 } }],
                    as: "category_id"
                }
            },
            {
                $unwind: "$category_id"
            },
            {
                $lookup: {
                    from: "vehicle_brands",
                    foreignField: "_id",
                    localField: "brand_id",
                    pipeline: [{ $project: { _id: 1, name: 1 } }],
                    as: "brand_id"
                }
            },
            {
                $unwind: "$brand_id"
            },
            {
                $lookup: {
                    from: "body_types",
                    foreignField: "_id",
                    localField: "body_id",
                    pipeline: [{ $project: { _id: 1, name: 1 } }],
                    as: "body_id"
                }
            },
            {
                $unwind: "$body_id"
            },
            {
                $lookup: {
                    from: "vehicle_model_colors",
                    localField: "_id",
                    foreignField: "vehicle_information_id",
                    pipeline: [
                        {
                            $lookup: {
                                from: "vehicle_info_color_images",
                                localField: "_id",
                                foreignField: "Color_Modal_id",
                                as: "Modal_color_image"
                            }
                        },
                        {
                            $project: { _id: 1, color_name: 1, color_code: 1, Modal_color_image: 1 }
                        }
                    ],
                    as: "Modal_color_Data"
                }
            },
            {
                $lookup: {
                    from: "pricevariants",
                    localField: "_id",
                    foreignField: "vehicle_information_id",
                    as: "pricevariants"
                }
            }
        ])
        if (Find.length !== 0) {
            res.send(await ResponseMassage.ResponseSuccess(Find))
        } else {
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }
        // res.send(p[0])
    } catch (error) {
        console.log(error)
    }
}

const tooglevehicle = async (req, res) => {
    try {
        const name = req.body.name;
        var data;
        if (name == "upcoming") {
            data = await VehicleInfo.findByIdAndUpdate({ _id: req.body.id }, { upcoming: req.body.upcoming }, { new: true });
        }
        if (name == "latest") {
            data = await VehicleInfo.findByIdAndUpdate({ _id: req.body.id }, { latest: req.body.latest }, { new: true });
        }
        res.send(data);
    } catch (error) {
        console.log(error)
    }
}

const Delete_colorModal = async (req, res) => {
    try {
        var result
        JSON.parse(req.body.RecordDelete_IDS).map(async (val) => {
            result = await Addcolor.findByIdAndDelete({ _id: val })
        })
        if (result) {
            res.send(await ResponseMassage.ResponseSuccess(result))
        } else {
            res.send(await ResponseMassage.ResponseErrorMsg("ID Not Found"))
        }
    } catch (error) {
        console.log(error)
    }
}

const Delete_PriceVariant = async (req, res) => {
    try {
        var result
        JSON.parse(req.body.PriceRecordDelete_IDS).map(async (val) => {
            result = await Price_Variant.findByIdAndDelete({ _id: val })
        })
        if (result) {
            res.send(await ResponseMassage.ResponseSuccess(result))
        } else {
            res.send(await ResponseMassage.ResponseErrorMsg("ID Not Found"))
        }
    } catch (error) {
        console.log(error)
    }
}

const Delete_Image = async (req, res) => {
    try {
        var result
        JSON.parse(req.body.Delete_IDS).map(async (val) => {
            result = await vehicle_Color_Image.findByIdAndDelete({ _id: val })
        })
        if (result) {
            res.send(await ResponseMassage.ResponseSuccess(result))
        } else {
            res.send(await ResponseMassage.ResponseErrorMsg("ID Not Found"))
        }

    } catch (error) {
        console.log(error)
    }
}


const GetBrandDataWithType = async (req, res) => {
    try {
        const brandData = await VehicleBrand.find({ category_id: req.body.Brand })
        res.send(brandData)
    } catch (error) {
        console.log(error)
    }
}

const GetBody_TypeDataWithType = async (req, res) => {
    try {
        const BodydData = await BodyTypes.find({ category_id: req.body.type })
        res.send(BodydData)
    } catch (error) {
        console.log(error)
    }
}
// **************************************************** Key Specification *************************************************************

const Get_Key_specification = async (req, res) => {
    try {
        const data = await Key_Specs.find()
        res.json(helper.dataResponse("Data found successfully", data))
    } catch (err) {
        console.log(err);
        res.json(helper.catchError(err.message))
    }
}

const Add_Key_specification = async (req, res) => {
    try {
        console.log('req.body.category_id', req.body.category_id)

        if (!req.body.name || !req.files) {
            res.json(helper.requiredError("name and image is required"))
        } else {
            let url = ""
            if (req.files.image) {
                const file = req.files.image
                const nameArr = file.name.split(".")
                const fileName = Date.now() + "." + nameArr[nameArr.length - 1]
                url = `${process.env.IMAGEURL}/Upload/keySpecification/${fileName}`
                file.mv('public/Upload/keySpecification/' + fileName, (err, data) => {
                    if (err) {
                        console.log(err);
                    }
                })
            }
            const addkeySpeci = Key_Specs({
                name: req.body.name,
                image: url,
            })
            const savekeySpeci = await addkeySpeci.save()
            if (savekeySpeci) {
                res.json(helper.successResponse("Key Specification added successfully"))
            } else {
                res.json(helper.catchError(err.message))
            }
        }
    } catch (error) {
        console.log(err);
        res.json(helper.catchError(err.message))
    }
}

const Key_specification = async (req, res) => {
    try {
        if (!req.params.id) {
            res.json(helper.requiredError("id must be required"))
        } else {
            const data = await Key_Specs.findById({ _id: req.params.id })
            if (data) {
                res.json(helper.dataResponse("Data found successfully", data))
            } else {
                res.json(helper.findError("Data not found"))
            }
        }
    } catch (err) {
        console.log(err);
        res.json(helper.catchError(err.message))
    }
}

const update_Key_specification = async (req, res) => {
    try {
        if (!req.params.id || !req.body.name) {
            res.json(helper.requiredError("_id, name"))
        } else {
            const findData = await Key_Specs.findById({ _id: req.params.id })
            let url = ""
            let updateData = {
                name: req.body.name,
            }
            console.log('updateData', updateData)
            if (req.files) {
                if (req.files.image) {
                    const extName = findData.image.split("/")
                    const imgName = extName[extName.length - 1]
                    fs.unlink(`./public/Upload/keySpecification/${imgName}`, (err, data) => {
                        if (err) {
                            console.log("image not found");
                        } else {
                            console.log("image deleted");
                        }
                    })
                    const file = req.files.image
                    const nameArr = file.name.split(".")
                    const fileName = Date.now() + "." + nameArr[nameArr.length - 1]
                    url = `${process.env.IMAGEURL}/Upload/keySpecification/${fileName}`
                    file.mv('public/Upload/keySpecification/' + fileName, (err, data) => {
                        if (err) {
                            console.log(err);
                        }
                    })
                }
            }
            if (url != "") {
                updateData.image = url
            }
            const updateCat = await Key_Specs.findByIdAndUpdate({ _id: req.params.id }, updateData, { new: true })
            console.log('updateCat', updateCat)
            if (updateCat) {
                res.json(helper.successResponse("Key Specification updated successfully"))
            } else {
                res.json(helper.findError("Soemthing went wrong"))
            }

        }
    } catch (error) {
        console.log(error)
        res.json(helper.catchError(err.message))
    }
}

const delete_Key_specification = async (req, res) => {
    try {
        if (!req.body.id) {
            res.json(helper.requiredError("id is required"))
        } else {
            const findCat = await Key_Specs.findById({ _id: req.body.id })
            if (findCat) {
                const imgName = findCat.image.split("/")
                fs.unlink(`../public/image/keySpecification/${imgName}`, (err, data) => {
                    if (err) {
                        console.log("image not found");
                    } else {
                        console.log("image deleted");
                    }
                })
                const deleteCat = await Key_Specs.findByIdAndDelete({ _id: req.body.id })
                if (deleteCat) {
                    res.json(helper.successResponse("Key Specification deleted successfully"))
                } else {
                    res.json(helper.catchError("Something went wrong"))
                }
            } else {
                res.json(helper.findError("Key Specification not found"))
            }
        }
    } catch (err) {
        console.log(err);
        res.json(helper.catchError(err.message))
    }
}

// *********************************************** Vehicle Specification ********************************************************

const Specification_get = async (req, res) => {
    try {
        const Result = await Vehicle_Specification.find()
        if (Result) {
            res.json(helper.dataResponse("Data found successfully", Result))
        } else {
            res.json(helper.dataResponse("Data Not found successfully", Result))
        }
    } catch (error) {
        console.log(error)
    }
}

// ************************************************* Variant specification **********************************************************
const vehicle_name_get = async (req, res) => {
    try {
        const vehicle_name_data = await VehicleInfo.aggregate([
            {
                $match: { brand_id: new mongoose.Types.ObjectId(req.body.BrandID) }
            },
            {
                $project: { name: 1 }
            }
        ])
        res.send(vehicle_name_data)
    } catch (error) {
        console.log(error)
    }
}
const Variant_name = async (req, res) => {
    try {
        const vehicle_name_data = await Price_Variant.aggregate([
            {
                $match: { vehicle_information_id: new mongoose.Types.ObjectId(req.body.variantID) }
            },
            {
                $project: { name: 1 }
            }
        ])
        res.send(vehicle_name_data)
    } catch (error) {
        console.log(error)
    }
}
const AddSpecification_Variant = async (req, res) => {
    try {
        const { body } = req
        console.log('body====>', body)
        const SPECIFICATION_DATA = [];
        Object.keys(body).forEach((key) => {
            if (key.startsWith('specification-')) {
                const index = parseInt(key.split('-')[1]);
                const category_id = body[`category_id`]
                const brand_id = body[`brand_id`]
                const vehicle_id = body[`vehicle_id`]
                const Variant_id = body[`Variant_id`]
                const _ID = body[`_ID-${index}`];
                const specification = body[`specification-${index}`];
                const key_specification = body[`key_specification-${index}`];
                const specification_name = body[`specification_name-${index}`];
                const specification_value = body[`specification_value-${index}`];
                const is_feature = body[`is_feature-${index}`];
                const is_overview = body[`is_overview-${index}`];
                const is_specification = body[`is_specification-${index}`];
                var row = {
                    category_id,
                    brand_id,
                    vehicle_id,
                    Variant_id,
                    _ID,
                    specification,
                    key_specification,
                    specification_name,
                    specification_value,
                    is_feature,
                    is_overview,
                    is_specification,
                };
                SPECIFICATION_DATA.push(row);
            }
        });

        SPECIFICATION_DATA.map(async (val) => {
            if (val._ID == 'undefined') {
                const Save = {
                    category_id: val.category_id,
                    brand_id: val.brand_id,
                    Vehicle_name_id: val.vehicle_id,
                    Vehicle_Variant_id: val.Variant_id,
                    specification: val.specification,
                    key_specification: val.key_specification,
                    specification_name: val.specification_name,
                    specification_value: val.specification_value,
                    is_feature: val.is_feature,
                    is_overview: val.is_overview,
                    is_specification: val.is_specification,
                }

                const result = Variant_specification(Save)
                const DataSave = await result.save()
                try {
                    if(DataSave){
                        return res.send(await ResponseMassage.ResponseSuccessMsg("sdsdsds"))
                     }else{
                        return res.send(await ResponseMassage.ResponseSuccessMsg("Somthing IS Wrong"))
                     }
                } catch (error) {
                  console.log(error.massage)  
                }
                
            }

            if (val._ID != 'undefined') {
                const Update = {
                    category_id: val.category_id,
                    brand_id: val.brand_id,
                    Vehicle_name_id: val.vehicle_id,
                    Vehicle_Variant_id: val.Variant_id,
                    specification: val.specification,
                    key_specification: val.key_specification,
                    specification_name: val.specification_name,
                    specification_value: val.specification_value,
                    is_feature: val.is_feature,
                    is_overview: val.is_overview,
                    is_specification: val.is_specification,
                }
                console.log('Update', Update)
                var Result = await Variant_specification.findByIdAndUpdate(val._ID, Update, { new: true })
                try {
                    if(Result){
                        return res.send(await ResponseMassage.ResponseSuccessMsg(Result))
                     }else{
                         return res.send(await ResponseMassage.ResponseSuccessMsg("Somthing IS Wrong"))
                     }
                } catch (error) {
                  console.log(error.massage)  
                }
               
            }
        })
    } catch (error) {
        console.log(error)
    }
}

const Specification_Variant = async(req,res)=>{
    try {
        // const Find = await Variant_specification.find()

        const Find = await Variant_specification.aggregate([
            {
                $lookup:{
                    from:"vehicle_categories",
                    localField:"category_id",
                    foreignField:"_id",
                    pipeline:[{$project:{_id:1 , name:1}}] , 
                    as:"category_id"
                }
            },

            {
                $lookup:{
                    from:"vehicle_brands",
                    localField:"brand_id",
                    foreignField:"_id",
                    pipeline:[{$project:{_id:1 , name:1}}] , 
                    as:"brand_id"
                }
            },

            {
                $lookup:{
                    from:"vehicle_infos",
                    localField:"Vehicle_name_id",
                    foreignField:"_id",
                    pipeline:[{$project:{_id:1 , name:1}}] , 
                    as:"Vehicle_name_id"
                }
            },

            {
                $lookup:{
                    from:"pricevariants",
                    localField:"Vehicle_Variant_id",
                    foreignField:"_id",
                    pipeline:[{$project:{_id:1 , name:1 , variant_image:1 , fuel_type:1}}]  , 
                    as:"Vehicle_Variant_id"
                }
            },

            {
                $lookup:{
                    from:"key_specs",
                    localField:"key_specification",
                    foreignField:"_id",
                    pipeline:[{$project:{_id:1 , name:1}}] , 
                    as:"key_specification"
                }
            },

            {
                $lookup:{
                    from:"specifications",
                    localField:"specification",
                    foreignField:"_id",
                    pipeline:[{$project:{_id:1 , name:1}}] , 
                    as:"specification"
                }
            },
            {
                $unwind:"$category_id"
            },
            {
                $unwind:"$brand_id"
            },
            {
                $unwind:"$Vehicle_name_id"
            },
            {
                $unwind:"$Vehicle_Variant_id"
            },
            {
                $unwind:"$key_specification"
            },
            {
                $unwind:"$specification"
            },

            // {
            //     $lookup:{
            //         from:"pricevariants",
            //         localField:"Vehicle_Variant_id",
            //         foreignField:"_id",
            //         pipeline:[{$project:{_id:1 , name:1 , variant_image:1 , fuel_type:1}}] , 
            //         as:"Vehicle_Variant_id"
            //     }
            // },
            // // {
            // //     $project:{Vehicle_Variant_id:1}
            // // },
            // {
            //     $unwind:"$Vehicle_Variant_id"
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

const Specification_Variant_View = async(req,res)=>{
    try {
        const Find = await Variant_specification.aggregate([
            {
                $match: {_id: new mongoose.Types.ObjectId(req.params.id)}
            },
            {
                $lookup:{
                    from:"vehicle_categories",
                    localField:"category_id",
                    foreignField:"_id",
                    pipeline:[{$project:{_id:1 , name:1}}] , 
                    as:"category_id"
                }
            },

            {
                $lookup:{
                    from:"vehicle_brands",
                    localField:"brand_id",
                    foreignField:"_id",
                    pipeline:[{$project:{_id:1 , name:1}}] , 
                    as:"brand_id"
                }
            },

            {
                $lookup:{
                    from:"vehicle_infos",
                    localField:"Vehicle_name_id",
                    foreignField:"_id",
                    pipeline:[{$project:{_id:1 , name:1}}] , 
                    as:"Vehicle_name_id"
                }
            },

            {
                $lookup:{
                    from:"pricevariants",
                    localField:"Vehicle_Variant_id",
                    foreignField:"_id",
                    pipeline:[{$project:{_id:1 , name:1}}] , 
                    as:"Vehicle_Variant_id"
                }
            },

            {
                $lookup:{
                    from:"key_specs",
                    localField:"key_specification",
                    foreignField:"_id",
                    pipeline:[{$project:{_id:1 , name:1}}] , 
                    as:"key_specification"
                }
            },

            {
                $lookup:{
                    from:"specifications",
                    localField:"specification",
                    foreignField:"_id",
                    pipeline:[{$project:{_id:1 , name:1}}] , 
                    as:"specification"
                }
            },
            {
                $unwind:"$category_id"
            },
            {
                $unwind:"$brand_id"
            },
            {
                $unwind:"$Vehicle_name_id"
            },
            {
                $unwind:"$Vehicle_Variant_id"
            },
            {
                $unwind:"$key_specification"
            },
            {
                $unwind:"$specification"
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

const Specification_Variant_Delete = async(req,res)=>{
    try {
        var result
        console.log('JSON.parse(req.body.RecordDelete_IDS)',JSON.parse(req.body.Specification_del) )
        JSON.parse(req.body.Specification_del).map(async (val) => {
            result = await Variant_specification.findByIdAndDelete({ _id: val })
        })
        if (result) {
            res.send(await ResponseMassage.ResponseSuccess(result))
        } else {
            res.send(await ResponseMassage.ResponseErrorMsg("ID Not Found"))
        }
    } catch (error) {
        console.log(error)
    }
}

const Specification_Table_data_delete = async(req,res)=>{
    try {
        const result = await Variant_specification.findByIdAndDelete(req.body.id)
        if (result) {
            res.send(await ResponseMassage.ResponseSuccess(result))
        } else {
            res.send(await ResponseMassage.ResponseErrorMsg("ID Not Found"))
        } 
    } catch (error) {
        console.log(error)
    }
}

const Specification_Variant_Searching = async(req , res)=>{
    try {
        console.log('req.body', req.body)
        const match = {}
            if (req.body.categoryId && req.body.categoryId != "") {
                match.category_id = new mongoose.Types.ObjectId(req.body.categoryId)
            }
            if (req.body.BrandId && req.body.BrandId != "") {
                match.brand_id = new mongoose.Types.ObjectId(req.body.BrandId)
            }
            if (req.body.VehicleID && req.body.VehicleID != "") {
                match.Vehicle_name_id = new mongoose.Types.ObjectId(req.body.VehicleID)
            }
            if (req.body.VeriantID && req.body.VeriantID != "") {
                const FindData = await Price_Variant.find({name: { $regex: ".*" + req.body.VeriantID + ".*", $options: "i" }}).distinct("_id")
                match.Vehicle_Variant_id = {$in:FindData}
            }
            const Find = await Variant_specification.aggregate([
                {
                    $match: match
                },
                {
                        $lookup:{
                            from:"pricevariants",
                            localField:"Vehicle_Variant_id",
                            foreignField:"_id",
                            pipeline:[{$project:{_id:1 , name:1 , variant_image:1 , fuel_type:1}}] , 
                            as:"Vehicle_Variant_id"
                        }
                    },
                    // {
                    //     $project:{Vehicle_Variant_id:1}  
                    // },
                    {
                        $unwind:"$Vehicle_Variant_id"
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

const ID_Wise_Data_get = async (req, res) => {
    try {
        const match = {}
        if (req.body.categoryId != 'undefined' && req.body.BrandId != 'undefined' && req.body.VehicleID != 'undefined' && req.body.VeriantID != 'undefined') {
            if (req.body.categoryId != "") {
                match.category_id = new mongoose.Types.ObjectId(req.body.categoryId)
            }
            if (req.body.BrandId != "") {
                match.brand_id = new mongoose.Types.ObjectId(req.body.BrandId)
            }
            if (req.body.VehicleID != "") {
                match.Vehicle_name_id = new mongoose.Types.ObjectId(req.body.VehicleID)
            }
            if (req.body.VeriantID != "") {
                match.Vehicle_Variant_id = new mongoose.Types.ObjectId(req.body.VeriantID)
            }
        }
        const Find = await Variant_specification.aggregate([
            {
                $match: match
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




export default {
    GetAllCategory, AddVehicleCategory, VehicleCategoryById, UpdateVehicleCategory, DeleteVehicleCategory, ToggleVehicaleinfo,
    IDGetAllBrand ,GetAllBrand, BrandAdd, BrandById, BrandUpdate, DeleteBrand, ToggleBrand, SearchingBrand,
    GetBodyTypes, AddBodyTypes, BodyTypeById, UpdateBodyType, DeleteBodyType, ToggleBody_type, SearchingBody_type,
    AddVehicleInformation, GetVehicleInformation, ViewVehicleInformation, UpdateVehicleInformation, Delete_vehicle_info, SerachingVehicleInformation, tooglevehicle,
    Delete_colorModal, Delete_PriceVariant, Delete_Image, GetBrandDataWithType, GetBody_TypeDataWithType,
    Get_Key_specification, Add_Key_specification, Key_specification, update_Key_specification, delete_Key_specification,
    Specification_get, vehicle_name_get, Variant_name, AddSpecification_Variant, Specification_Variant , Specification_Variant_View ,Specification_Variant_Delete ,
    Specification_Table_data_delete ,Specification_Variant_Searching ,ID_Wise_Data_get

}