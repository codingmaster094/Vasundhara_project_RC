import mongoose from "mongoose";
import ResponseMassage from "../Response/All_Response.js"
import Vehicle_category_modal from "../model/Vehicle_Category.js"
import Vehicle_brand_modal from "../model/Vehicle_Brand.js"
import News_headline_Modal from "../model/New_headlinemodal.js";
import News_Modal from "../model/News_modal.js";
import News_category_Modal from "../model/New_category_modal.js";
import TagModel from "../model/TagsModal.js";
import dayjs from "dayjs";

const create_News_category = async (req, res) => {
    try {
        const { body, files } = req
        const New_category_DATA = []
        Object.keys(body).forEach((key) => {
            if (key.startsWith('name-')) {
                const index = parseInt(key.split('-')[1]);
                const _id = body[`_id-${index}`];
                const name = body[`name-${index}`];
                const status = body[`status-${index}`];
                let row = {
                    _id,
                    name,
                    status,
                };
                
                if (files) {
                    let fileArray = files[`Image-${index}`];
                    if (fileArray != undefined) {
                        if (fileArray.length == undefined) {
                            row.Image = fileArray
                        }
                    }
                }
                New_category_DATA.push(row);
            }
        });

        New_category_DATA.map(async (val, i) => {
            if (val._id !== 'undefined') {
                let url
                if (val.Image != undefined) {
                    const file = val.Image
                    const ext = file?.name?.split(".")
                    const filename = Date.now() + "." + ext[ext.length - 1]
                    url = process.env.UploadLink + "Upload/News/" + filename
                    file.mv("public/Upload/News/" + filename, async (err) => {
                        console.log(err)
                    })
                }
                
                const Update =  {
                    name:val.name,
                    status:val.status,
                    Image:url
                }
                const result = await News_category_Modal.findByIdAndUpdate({ _id: val._id }, Update, { new: true })
                try {
                    res.send(await ResponseMassage.ResponseSuccess("Update Successfuly"))
                } catch (error) {
                    console.log(error)
                }
                
            }
            if (val._id == "undefined") {
                var url
                const file = val.Image
                const ext = file?.name?.split(".")
                const filename = Date.now() + "." + ext[ext.length - 1]
                url = process.env.UploadLink + "Upload/News/" + filename
                file.mv("public/Upload/News/" + filename, async (err) => {
                    console.log(err)
                })
                const SaveData = News_category_Modal({
                    name: val.name,
                    Image: url !== undefined ? url : "",
                    status: val.status,
                })
                const result = await SaveData.save()
            }
        })

    } catch (error) {
        console.log(error)
    }
}

const Get_News_category = async (req, res) => {
    try {
        const Find = await News_category_Modal.find()
        if (Find != 0) {
            res.send(await ResponseMassage.ResponseSuccess(Find))
        } else {
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }

    } catch (error) {
        console.log(error)
    }
}

const Get_News_category_ID = async (req, res) => {
    try {
        const Find = await News_category_Modal.find({ _id: req.params.id })
        if (Find.length !== 0) {
            res.send(await ResponseMassage.ResponseSuccess(Find))
        } else {
            res.send(await ResponseMassage.ResponseErrorDataMsg("ID Not Found", Find))
        }
    } catch (error) {
        console.log(error)
    }
}
const Update_News_category = async (req, res) => {
    try {
        console.log('req.body', req.body)
        return
        var url
        if (req.files) {
            var Image = req.files.Image
            if (Image) {
                if (Image.length === undefined) {
                    Image = [Image]
                }
                const file1 = Image
                const ext1 = file1[0].name?.split(".")
                const fileName1 = Date.now() + "." + ext1[ext1.length - 1]
                url = process.env.UploadLink + "Upload/News/" + fileName1;
                file1[0].mv("public/Upload/News/" + fileName1, async (err) => {
                    if (err) {
                        console.log(err);
                    }
                })
            }
        }

        const data = {
            name: req.body.name,
            Image: url,
            status: req.body.status
        }

        var Result = await News_category_Modal.findByIdAndUpdate(req.body.id, data, { new: true })
        if (Result) {
            res.send(await ResponseMassage.ResponseSuccess(Result))
            return
        } else {
            res.send(await ResponseMassage.ResponseErrorMsg("ID Not Found"))
            return
        }
    } catch (error) {
        console.log(error)
    }
}

const Delete_News_category = async (req, res) => {
    try {
        const result = await News_category_Modal.findByIdAndDelete(req.body.id)
        if (result) {
            res.send(await ResponseMassage.ResponseSuccess(result))
        } else {
            res.send(await ResponseMassage.ResponseErrorMsg("ID Not Found"))
        }
    } catch (error) {
        console.log(error)
    }
}
const Multiple_Delete_News_category = async(req,res)=>{
    try {
        let result
        JSON.parse(req.body.RecordDelete).map(async(ID)=>{
            result = await News_category_Modal.findByIdAndDelete({ _id: ID })
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

const toggle_News_category = async (req, res) => {
    try {
        const name = req.body.name;
        var data;
        if (name == "status") {
            data = await News_category_Modal.findByIdAndUpdate({ _id: req.body.id }, { status: req.body.status }, { new: true });
        }
        res.send(data);
    } catch (error) {
        console.log(error)
    }
}

// ******************************************************************* News Headline *********************************************************
const create_news_headline = async (req, res) => {
    try {
        var url, url1
        var image = req.files.image
        var websiteimage = req.files.websiteimage
        var news_url = req.files.news_url
        const News_Category_id = JSON.parse(req.body.category_id)
        const Tags_id = JSON.parse(req.body.tag_id)
        const Brand_id = JSON.parse(req.body.brand_id)
        const Vehicle_id = JSON.parse(req.body.vehicale_category_id)

        if (image === undefined) {
            image = [image]
        }

        if (websiteimage === undefined) {
            websiteimage = [websiteimage]
        }

        if (news_url === undefined) {
            news_url = [news_url]
        }
        const file = image
        const ext = file?.name?.split(".")
        const filename = Date.now() + "." + ext[ext.length - 1]
        url = process.env.UploadLink + "Upload/News/" + filename
        file.mv("public/Upload/News/" + filename, async (err) => {
            console.log(err)
        })

        const file1 = websiteimage
        const ext1 = file1?.name?.split(".")
        const filename1 = Date.now() + "." + ext1[ext1.length - 1]
        url1 = process.env.UploadLink + "Upload/News/" + filename1
        file1.mv("public/Upload/News/" + filename1, async (err) => {
            console.log(err)
        })


        var mytag = []
        var arr = Tags_id
        if (!Array.isArray(arr)) {
            arr = [Tags_id]
        }

        var News_Category = []
        var arr1 = News_Category_id
        if (!Array.isArray(arr1)) {
            arr1 = [News_Category_id]
        }

        Promise.all(
            arr.map(async (val) => {
                const tag = val.length === 24 ? await TagModel.findOne({ _id: val }) : new TagModel();
                if (val.length !== 24) {
                    tag.name = val;
                    const Tag_Data = await tag.save();
                    mytag.push(Tag_Data._id)
                } else {
                    mytag.push(tag._id)
                }
            })
        ).then(async () => {
            Promise.all(
                arr1.map(async (val) => {
                    let NEWS_category = val.length === 24 ? await News_category_Modal.findOne({ _id: val }) : new News_category_Modal();
                    if (val.length !== 24) {
                        NEWS_category.name = val;
                        NEWS_category.Image = ""
                        const News_data = await NEWS_category.save();
                        News_Category.push(News_data._id)
                    } else {
                        News_Category.push(NEWS_category._id)
                    }
                })
            ).then(async () => {
                const data = {
                    title: req.body.title,
                    description: req.body.description,
                    news_url: req.body.news_url,
                    headtag: req.body.headtag,
                    date: req.body.date,
                    image: url,
                    websiteimage: url1,
                    is_slider: req.body.is_slider,
                    status: req.body.status
                }

                if (News_Category.length !== 0) {
                    data.category_id = News_Category
                }
                if (mytag.length !== 0) {
                    data.tag_id = mytag
                }
                if (Brand_id.length !== 0) {
                    data.brand_id = Brand_id
                }
                if (Vehicle_id.length !== 0) {
                    data.vehicale_category_id = Vehicle_id
                }

                const result = News_headline_Modal(data)
                const SavData = await result.save()
                res.send(await ResponseMassage.ResponseSuccessMsg(SavData))
            })

        })
    } catch (error) {
        console.log(error)
    }
}

const Get_news_headline = async (req, res) => {
    try {
        const Find = await News_headline_Modal.find().populate("category_id", { _id: 1, name: 1 }).populate("vehicale_category_id").populate("brand_id").populate("tag_id")
        if (Find.length !== 0) {
            res.send(await ResponseMassage.ResponseSuccess(Find))
        } else {
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }
    } catch (error) {
        console.log(error)
    }
}

const Get_news_headline_ID = async (req, res) => {
    try {
        const Find = await News_headline_Modal.find({ _id: req.params.id }).populate("category_id", { _id: 1, name: 1 }).populate("vehicale_category_id").populate("brand_id").populate("tag_id")
        if (Find.length !== 0) {
            res.send(await ResponseMassage.ResponseSuccess(Find))
        } else {
            res.send(await ResponseMassage.ResponseErrorDataMsg("ID Not Found", Find))
        }
    } catch (error) {
        console.log(error)
    }
}

const Update_news_headline = async (req, res) => {
    try {
        var url, url1
        if (req.files) {
            if (req.files.image === undefined) {
                image = [image]
            }

            if (req.files.websiteimage === undefined) {
                websiteimage = [websiteimage]
            }

            if (req.files.image) {
                const file = req.files.image
                const ext = file?.name?.split(".")
                const filename = Date.now() + "." + ext[ext.length - 1]
                url = process.env.UploadLink + "Upload/News/" + filename
                file.mv("public/Upload/News/" + filename, async (err) => {
                    console.log(err)
                })
            }

            if (req.files.websiteimage) {
                const file1 = req.files.websiteimage
                const ext1 = file1?.name?.split(".")
                const filename1 = Date.now() + "." + ext1[ext1.length - 1]
                url1 = process.env.UploadLink + "Upload/News/" + filename1
                file1.mv("public/Upload/News/" + filename1, async (err) => {
                    console.log(err)
                })
            }
        }


        var News_Category_id = JSON.parse(req.body.category_id)
        var Tags_id = JSON.parse(req.body.tag_id)
        var vehicle_id = JSON.parse(req.body.vehicale_category_id)
        var Brand_id = JSON.parse(req.body.brand_id)



        var mytag = []
        var arr = Tags_id
        if (!Array.isArray(arr)) {
            arr = [Tags_id]
        }

        var News_Category = []
        var arr1 = News_Category_id
        if (!Array.isArray(arr1)) {
            arr1 = [News_Category_id]
        }

        Promise.all(
            arr.map(async (s) => {
                if (mongoose.Types.ObjectId.isValid(s) || mongoose.Types.ObjectId.isValid(s._id)) {
                    let tag = await TagModel.findOne({ _id: s })
                    mytag.push(tag._id)
                } else {
                    let ttt = await TagModel({
                        name: s
                    })
                    let d = await ttt.save();
                    mytag.push(d._id)
                }
            })
        ).then(async () => {
            Promise.all(
                arr1.map(async (s) => {
                    if (mongoose.Types.ObjectId.isValid(s) || mongoose.Types.ObjectId.isValid(s._id)) {
                        let tag = await News_category_Modal.findOne({ _id: s })
                        News_Category.push(tag._id)
                    } else {
                        let ttt = await News_category_Modal({
                            name: s,
                            Image: ""
                        })
                        let d = await ttt.save();
                        News_Category.push(d._id)
                    }
                })
            ).then(async () => {
                const data = {
                    title: req.body.title,
                    category_id: News_Category,
                    tag_id: mytag,
                    vehicale_category_id: vehicle_id,
                    brand_id: Brand_id,
                    description: req.body.description,
                    news_url: req.body.news_url,
                    headtag: req.body.headtag,
                    date: req.body.date,
                    image: url,
                    websiteimage: url1,
                    is_slider: req.body.is_slider,
                    status: req.body.status
                }


                var Result = await News_headline_Modal.findByIdAndUpdate(req.params.id, data, { new: true })
                if (Result) {
                    res.send(await ResponseMassage.ResponseSuccess(Result))
                } else {
                    res.send(await ResponseMassage.ResponseErrorMsg("ID Not Found"))
                }
            })

        })
    } catch (error) {
        console.log(error)
    }
}

const Delete_news_headline = async (req, res) => {
    try {
        const result = await News_headline_Modal.findByIdAndDelete(req.body.id)
        if (result) {
            res.send(await ResponseMassage.ResponseSuccess(result))
        } else {
            res.send(await ResponseMassage.ResponseErrorMsg("ID Not Found"))
        }
    } catch (error) {
        console.log(error)
    }
}

const NEWSHeadline_Drag_and_Drop = async (req, res) => {
    try {
        const data = req.body;
        const catagory = await News_headline_Modal.find().select({ __v: 0 });
        for (let i = 0; i < catagory.length; i++) {
            for (let j = 0; j < data.length; j++) {
                if (catagory[i]._id == data[j].id) {
                    const _id = { _id: data[j].id };
                    const index = { position: data[j].position };
                    const channelData = await News_headline_Modal.findByIdAndUpdate(_id, index, { new: true });
                }
            }
        }
        res.json(ResponseMassage.ResponseSuccess("Position Updated Successfully"))
        return
    } catch (e) {
        console.log(e)
        return
    }
}
// ******************************************************************* News *********************************************************
const Create_news = async (req, res) => {
    try {
        const data = {
            news_headline_id: req.body.news_headline_id,
            news: req.body.news
        }
        const result = News_Modal(data)
        const SavData = await result.save()
        res.send(await ResponseMassage.ResponseSuccessMsg(SavData))
    } catch (error) {
        console.log(error)
    }
}
const Get_news = async (req, res) => {
    try {
        const Find = await News_Modal.aggregate([
            {
                $lookup: {
                    from: "news_headlines",
                    localField: "news_headline_id",
                    foreignField: "_id",
                    pipeline: [
                        {
                            $project: { _id: 1, title: 1 }
                        }
                    ],
                    as: "news_headline_id"
                }
            },
            {
                $unwind: "$news_headline_id"
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

const Get_news_ID = async (req, res) => {
    try {
        const Find = await News_Modal.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(req.params.id) }
            },
            {
                $lookup: {
                    from: "news_headlines",
                    localField: "news_headline_id",
                    foreignField: "_id",
                    pipeline: [
                        {
                            $project: { _id: 1, title: 1 }
                        }
                    ],
                    as: "news_headline_id"
                }
            },
            {
                $unwind: "$news_headline_id"
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

const Update_news = async (req, res) => {
    try {
        const data = {
            // news_headline_id:req.body.news_headline_id,
            news: req.body.news
        }
        if (req.body.news_headline_id !== "" && req.body.news_headline_id !== 'undefined') {
            data.news_headline_id = req.body.news_headline_id
        }
        const Result = await News_Modal.findByIdAndUpdate(req.params.id, data, { new: true })
        if (Result) {
            res.send(await ResponseMassage.ResponseSuccess(Result))
        } else {
            res.send(await ResponseMassage.ResponseErrorMsg("ID Not Found"))
        }
    } catch (error) {
        console.log(error)
    }
}

const Delete_news = async (req, res) => {
    try {
        const result = await News_Modal.findByIdAndDelete(req.body.id)
        if (result) {
            res.send(await ResponseMassage.ResponseSuccess(result))
        } else {
            res.send(await ResponseMassage.ResponseErrorMsg("ID Not Found"))
        }
    } catch (error) {
        console.log(error)
    }
}

const NEWS_Drag_and_Drop = async (req, res) => {
    try {
        const data = req.body;
        const catagory = await News_Modal.find().select({ __v: 0 });
        for (let i = 0; i < catagory.length; i++) {
            for (let j = 0; j < data.length; j++) {
                if (catagory[i]._id == data[j].id) {
                    const _id = { _id: data[j].id };
                    const index = { position: data[j].position };
                    const channelData = await News_Modal.findByIdAndUpdate(_id, index, { new: true });
                }
            }
        }
        res.json(ResponseMassage.ResponseSuccess("Position Updated Successfully"))
        return
    } catch (e) {
        console.log(e)
        return
    }
}


export default {
    create_News_category, Get_News_category, Get_News_category_ID, Update_News_category, Delete_News_category, Multiple_Delete_News_category , toggle_News_category,
    create_news_headline, Get_news_headline, Get_news_headline_ID, Update_news_headline, Delete_news_headline,
    Create_news, Get_news, Get_news_ID, Update_news, Delete_news, NEWS_Drag_and_Drop, NEWSHeadline_Drag_and_Drop
}