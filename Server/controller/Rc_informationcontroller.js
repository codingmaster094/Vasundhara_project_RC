import mongoose from "mongoose";
import ResponseMassage from "../Response/All_Response.js"
import RC_DL_modal from "../model/RC_DL_informationmodal.js";
import Traffic_state_modal from "../model/Traffic_Statemodal.js";
import Traffic_Rule_modal from "../model/Traffic_rule_modal.js";
import Traffic_Language_modal from "../model/Traffic_language_modal.js";
import traffic_Language from "../model/Traffic_language_modal.js";


// */************************************************* RC DL Information **************************************************** */

const create_Rc_DL_infromation = async (req, res) => {
    try {
        console.log('first', JSON.parse(req.body.data))
        const data = JSON.parse(req.body.data)
        var count = 0
        var saveData
        var url1, url2, url3, url4, url5, url6, url7, url8, url9, url10, url11, url12
        var thumb_image = req.files.thumb_image
        var en = req.files.en
        var hi = req.files.hi
        var mr = req.files.mr
        var gu = req.files.gu
        var kn = req.files.kn
        var ta = req.files.ta
        var te = req.files.te
        var bn = req.files.bn
        var ml = req.files.ml
        var or = req.files.or
        var pa = req.files.pa

        if (thumb_image.length === undefined) {
            thumb_image = [thumb_image]
        }
        if (en.length === undefined) {
            en = [en]
        }
        if (hi.length === undefined) {
            hi = [hi]
        }
        if (mr.length === undefined) {
            mr = [mr]
        }
        if (gu.length === undefined) {
            gu = [gu]
        }
        if (kn.length === undefined) {
            kn = [kn]
        }
        if (ta.length === undefined) {
            ta = [ta]
        }
        if (te.length === undefined) {
            te = [te]
        }
        if (bn.length === undefined) {
            bn = [bn]
        }
        if (ml.length === undefined) {
            ml = [ml]
        }
        if (or.length === undefined) {
            or = [or]
        }
        if (pa.length === undefined) {
            pa = [pa]
        }

        Promise.all(
            data.map(async (val) => {
                const find = await RC_DL_modal.find({ title: val.title })
                if (find.length !== 0) {
                    count++
                }
            })
        ).then(async () => {
            if (count !== 0) {
                res.send("Title Allready Exies")
            } else {
                data.map(async (val, ind) => {
                    const file1 = thumb_image[ind]
                    const ext1 = file1?.name?.split(".")
                    const fileName1 = Date.now() + "." + ext1[ext1.length - 1]
                    url1 = process.env.UploadLink + "Upload/thumbImage/" + fileName1;
                    file1.mv("public/Upload/thumbImage/" + fileName1, async (err) => {
                        if (err) {
                            console.log(err);
                        }
                    })

                    const file2 = en[ind]
                    const ext2 = file2?.name?.split(".")
                    const fileName2 = Date.now() + "." + ext2[ext2.length - 1]
                    url2 = process.env.UploadLink + "Upload/English/" + fileName2;
                    file2.mv("public/Upload/English/" + fileName2, async (err) => {
                        if (err) {
                            console.log(err);
                        }
                    })

                    const file3 = hi[ind]
                    const ext3 = file3?.name?.split(".")
                    const fileName3 = Date.now() + "." + ext3[ext3.length - 1]
                    url3 = process.env.UploadLink + "Upload/Hindi/" + fileName3;
                    file3.mv("public/Upload/Hindi/" + fileName3, async (err) => {
                        if (err) {
                            console.log(err);
                        }
                    })

                    const file4 = mr[ind]
                    const ext4 = file4?.name?.split(".")
                    const fileName4 = Date.now() + "." + ext4[ext4.length - 1]
                    url4 = process.env.UploadLink + "Upload/Marathi/" + fileName4;
                    file4.mv("public/Upload/Marathi/" + fileName4, async (err) => {
                        if (err) {
                            console.log(err);
                        }
                    })

                    const file5 = gu[ind]
                    const ext5 = file5?.name?.split(".")
                    const fileName5 = Date.now() + "." + ext5[ext5.length - 1]
                    url5 = process.env.UploadLink + "Upload/Gujarati/" + fileName5;
                    file5.mv("public/Upload/Gujarati/" + fileName5, async (err) => {
                        if (err) {
                            console.log(err);
                        }
                    })

                    const file6 = kn[ind]
                    const ext6 = file6?.name?.split(".")
                    const fileName6 = Date.now() + "." + ext6[ext6.length - 1]
                    url6 = process.env.UploadLink + "Upload/Kannada/" + fileName6;
                    file6.mv("public/Upload/Kannada/" + fileName6, async (err) => {
                        if (err) {
                            console.log(err);
                        }
                    })

                    const file7 = ta[ind]
                    const ext7 = file7?.name?.split(".")
                    const fileName7 = Date.now() + "." + ext7[ext7.length - 1]
                    url7 = process.env.UploadLink + "Upload/Tamil/" + fileName7;
                    file7.mv("public/Upload/Tamil/" + fileName7, async (err) => {
                        if (err) {
                            console.log(err);
                        }
                    })

                    const file8 = te[ind]
                    const ext8 = file8?.name?.split(".")
                    const fileName8 = Date.now() + "." + ext8[ext8.length - 1]
                    url8 = process.env.UploadLink + "Upload/Telugu/" + fileName8;
                    file8.mv("public/Upload/Telugu/" + fileName8, async (err) => {
                        if (err) {
                            console.log(err);
                        }
                    })

                    const file9 = bn[ind]
                    const ext9 = file9?.name?.split(".")
                    const fileName9 = Date.now() + "." + ext9[ext9.length - 1]
                    url9 = process.env.UploadLink + "Upload/Bangali/" + fileName9;
                    file9.mv("public/Upload/Bangali/" + fileName9, async (err) => {
                        if (err) {
                            console.log(err);
                        }
                    })

                    const file10 = ml[ind]
                    const ext10 = file10?.name?.split(".")
                    const fileName10 = Date.now() + "." + ext10[ext10.length - 1]
                    url10 = process.env.UploadLink + "Upload/Malyalam/" + fileName10;
                    file10.mv("public/Upload/Malyalam/" + fileName10, async (err) => {
                        if (err) {
                            console.log(err);
                        }
                    })

                    const file11 = or[ind]
                    const ext11 = file11?.name?.split(".")
                    const fileName11 = Date.now() + "." + ext11[ext11.length - 1]
                    url11 = process.env.UploadLink + "Upload/Odisha/" + fileName11;
                    file11.mv("public/Upload/Odisha/" + fileName11, async (err) => {
                        if (err) {
                            console.log(err);
                        }
                    })

                    const file12 = pa[ind]
                    const ext12 = file12?.name?.split(".")
                    const fileName12 = Date.now() + "." + ext12[ext12.length - 1]
                    url12 = process.env.UploadLink + "Upload/Panjabi/" + fileName12;
                    file12.mv("public/Upload/Panjabi/" + fileName12, async (err) => {
                        if (err) {
                            console.log(err);
                        }
                    })

                    saveData = RC_DL_modal({
                        type: val.type,
                        title: val.title,
                        status: val.status,
                        thumb_image: url1,
                        en: url2,
                        hi: url3,
                        mr: url4,
                        gu: url5,
                        kn: url6,
                        ta: url7,
                        te: url8,
                        bn: url9,
                        ml: url10,
                        or: url11,
                        pa: url12

                    })
                    saveData = await saveData.save()
                })
                res.send(await ResponseMassage.ResponseSuccessMsg(saveData))
            }
        })
    } catch (error) {
        console.log(error)
    }
}

const Get_RC_DL_information = async (req, res) => {
    try {
        const Find = await RC_DL_modal.find()
        if (Find != 0) {
            res.send(await ResponseMassage.ResponseSuccess(Find))
        } else {
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }
    } catch (error) {
        console.log(error)
    }
}

const Get_RC_DL_information_ID = async (req, res) => {
    try {
        const Find = await RC_DL_modal.find({ _id: req.params.id })
        if (Find != 0) {
            res.send(await ResponseMassage.ResponseSuccess(Find))
        } else {
            res.send(await ResponseMassage.ResponseErrorDataMsg("ID Not Found", Find))
        }
    } catch (error) {
        console.log(error)
    }
}

const Update_RC_DL_information = async (req, res) => {
    try {
        var url1, url2, url3, url4, url5, url6, url7, url8, url9, url10, url11, url12
        var saveData
        if (req.files) {
            if(req.files.thumb_image){
                const file1 = req.files.thumb_image
                const ext1 = file1.name?.split(".")
                const fileName1 = Date.now() + "." + ext1[ext1.length - 1]
                url1 = process.env.UploadLink + "Upload/thumbImage/" + fileName1;
                file1.mv("public/Upload/thumbImage/" + fileName1, async (err) => {
                    if (err) {
                        console.log(err);
                    }
                })
            }

            if(req.files.en){
                const file2 = req.files.en
                const ext2 = file2?.name?.split(".")
                const fileName2 = Date.now() + "." + ext2[ext2.length - 1]
                url2 = process.env.UploadLink + "Upload/English/" + fileName2;
                file2.mv("public/Upload/English/" + fileName2, async (err) => {
                    if (err) {
                        console.log(err);
                    }
                })
            }

            if(req.files.hi){
                const file3 = req.files.hi
                const ext3 = file3?.name?.split(".")
                const fileName3 = Date.now() + "." + ext3[ext3.length - 1]
                url3 = process.env.UploadLink + "Upload/Hindi/" + fileName3;
                file3.mv("public/Upload/Hindi/" + fileName3, async (err) => {
                    if (err) {
                        console.log(err);
                    }
                })
            }

            if(req.files.mr){
                const file4 = req.files.mr
                const ext4 = file4?.name?.split(".")
                const fileName4 = Date.now() + "." + ext4[ext4.length - 1]
                url4 = process.env.UploadLink + "Upload/Marathi/" + fileName4;
                file4.mv("public/Upload/Marathi/" + fileName4, async (err) => {
                    if (err) {
                        console.log(err);
                    }
                })
            }

            if(req.files.gu){
                const file5 = req.files.gu
                const ext5 = file5?.name?.split(".")
                const fileName5 = Date.now() + "." + ext5[ext5.length - 1]
                url5 = process.env.UploadLink + "Upload/Gujarati/" + fileName5;
                file5.mv("public/Upload/Gujarati/" + fileName5, async (err) => {
                    if (err) {
                        console.log(err);
                    }
                })
            }

            if(req.files.kn){
                const file6 = req.files.kn
                const ext6 = file6?.name?.split(".")
                const fileName6 = Date.now() + "." + ext6[ext6.length - 1]
                url6 = process.env.UploadLink + "Upload/Kannada/" + fileName6;
                file6.mv("public/Upload/Kannada/" + fileName6, async (err) => {
                    if (err) {
                        console.log(err);
                    }
                })
            }

            if(req.files.ta){
                const file7 = req.files.ta
                const ext7 = file7?.name?.split(".")
                const fileName7 = Date.now() + "." + ext7[ext7.length - 1]
                url7 = process.env.UploadLink + "Upload/Tamil/" + fileName7;
                file7.mv("public/Upload/Tamil/" + fileName7, async (err) => {
                    if (err) {
                        console.log(err);
                    }
                })
            }

            if(req.files.te){
                const file8 = req.files.te
                const ext8 = file8?.name?.split(".")
                const fileName8 = Date.now() + "." + ext8[ext8.length - 1]
                url8 = process.env.UploadLink + "Upload/Telugu/" + fileName8;
                file8.mv("public/Upload/Telugu/" + fileName8, async (err) => {
                    if (err) {
                        console.log(err);
                    }
                })
            }

            if(req.files.bn){
                const file9 = req.files.bn
                const ext9 = file9?.name?.split(".")
                const fileName9 = Date.now() + "." + ext9[ext9.length - 1]
                url9 = process.env.UploadLink + "Upload/Bangali/" + fileName9;
                file9.mv("public/Upload/Bangali/" + fileName9, async (err) => {
                    if (err) {
                        console.log(err);
                    }
                })
            }

            if(req.files.ml){
                const file10 = req.files.ml
                const ext10 = file10?.name?.split(".")
                const fileName10 = Date.now() + "." + ext10[ext10.length - 1]
                url10 = process.env.UploadLink + "Upload/Malyalam/" + fileName10;
                file10.mv("public/Upload/Malyalam/" + fileName10, async (err) => {
                    if (err) {
                        console.log(err);
                    }
                })
            }

            if(req.files.or){
                const file11 = req.files.or
                const ext11 = file11?.name?.split(".")
                const fileName11 = Date.now() + "." + ext11[ext11.length - 1]
                url11 = process.env.UploadLink + "Upload/Odisha/" + fileName11;
                file11.mv("public/Upload/Odisha/" + fileName11, async (err) => {
                    if (err) {
                        console.log(err);
                    }
                })
            }

            if(req.files.pa){
                const file12 = req.files.pa
                const ext12 = file12?.name?.split(".")
                const fileName12 = Date.now() + "." + ext12[ext12.length - 1]
                url12 = process.env.UploadLink + "Upload/Panjabi/" + fileName12;
                file12.mv("public/Upload/Panjabi/" + fileName12, async (err) => {
                    if (err) {
                        console.log(err);
                    }
                })
            }
           
        }
        saveData = {
            type: req.body.type,
            title: req.body.title,
            status: req.body.status,
            thumb_image: url1,
            en: url2,
            hi: url3,
            mr: url4,
            gu: url5,
            kn: url6,
            ta: url7,
            te: url8,
            bn: url9,
            ml: url10,
            or: url11,
            pa: url12

        }
        var Result = await RC_DL_modal.findByIdAndUpdate(req.params.id, saveData, { new: true })
        console.log('Result', Result)
        if (Result) {
            res.send(await ResponseMassage.ResponseSuccess(Result))
        } else {
            res.send(await ResponseMassage.ResponseErrorMsg("ID Not Found"))
        }

    } catch (error) {
        console.log(error)
    }
}

const Delete_RC_DL_information = async (req, res) => {
    try {
        const result = await RC_DL_modal.findByIdAndDelete(req.body.id)
        if (result) {
            res.send(await ResponseMassage.ResponseSuccess(result))
        } else {
            res.send(await ResponseMassage.ResponseErrorMsg("ID Not Found"))
        }
    } catch (error) {
        console.log(error)
    }
}

const Searching_RD_DL = async (req, res) => {
    try {
        var query = []
        var Find
        if (req.body.search && req.body.search !== "") {
            query.push(req.body.search ? { title: { $regex: ".*" + req.body.search + ".*", $options: "i" } } : {});
        }
        if (req.body.type && req.body.type !== "") {
            query.push({ type: req.body.type });
        }
        if (req.body.status && req.body.status !== "") {
            var Status = req.body.status == "Active" ? 1: 0
            query.push({ status: Status });
        }
        if(query !=""){
             Find = await RC_DL_modal.find({ $and: query })
        }else{
             Find = await RC_DL_modal.find()
        }
        if (Find != 0) {
            res.send(await ResponseMassage.ResponseSuccess(Find))
        } else {
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }
    } catch (error) {
        console.log(error)

    }
}

const toggle_RD_DL = async (req, res) => {
    try {
        const name = req.body.name;
        var data;
        if (name == "status") {
            data = await RC_DL_modal.findByIdAndUpdate({ _id: req.body.id },{ status: req.body.status },{ new: true });
        }
        res.send(data);
    } catch (error) {
        console.log(error)
    }
}

// */*************************************************Traffic State **************************************************** */

const create_Traffic_state = async (req, res) => {
    try {
        const data = {
            state_code: req.body.state_code,
            state_name: req.body.state_name,
            title: req.body.title,
            title_gu: req.body.title_gu,
            title_hi: req.body.title_hi,
            title_mr: req.body.title_mr,
            title_pa: req.body.title_pa,
            title_ta: req.body.title_ta,
            title_te: req.body.title_te,
            title_ml: req.body.title_ml,
            title_kn: req.body.title_kn,
            title_bn: req.body.title_bn,
            title_or: req.body.title_or,

            sub_title: req.body.sub_title,
            sub_title_gu: req.body.sub_title_gu,
            sub_title_hi: req.body.sub_title_hi,
            sub_title_mr: req.body.sub_title_mr,
            sub_title_pa: req.body.sub_title_pa,
            sub_title_ta: req.body.sub_title_ta,
            sub_title_te: req.body.sub_title_te,
            sub_title_ml: req.body.sub_title_ml,
            sub_title_kn: req.body.sub_title_kn,
            sub_title_bn: req.body.sub_title_bn,
            sub_title_or: req.body.sub_title_or,

            content: req.body.content,
            content_gu: req.body.content_gu,
            content_hi: req.body.content_hi,
            content_mr: req.body.content_mr,
            content_pa: req.body.content_pa,
            content_ta: req.body.content_ta,
            content_te: req.body.content_te,
            content_ml: req.body.content_ml,
            content_kn: req.body.content_kn,
            content_bn: req.body.content_bn,
            content_or: req.body.content_or,

            disclaimer: req.body.disclaimer,
            disclaimer_gu: req.body.disclaimer_gu,
            disclaimer_hi: req.body.disclaimer_hi,
            disclaimer_mr: req.body.disclaimer_mr,
            disclaimer_pa: req.body.disclaimer_pa,
            disclaimer_ta: req.body.disclaimer_ta,
            disclaimer_te: req.body.disclaimer_te,
            disclaimer_ml: req.body.disclaimer_ml,
            disclaimer_kn: req.body.disclaimer_kn,
            disclaimer_bn: req.body.disclaimer_bn,
            disclaimer_or: req.body.disclaimer_or
        }

        const result = Traffic_state_modal(data)
        const Data = result.save()
        res.send(await ResponseMassage.ResponseSuccessMsg(Data))

    } catch (error) {
        console.log(error)
    }
}

const Get_Traffic_state = async (req, res) => {
    try {
        const Find = await Traffic_state_modal.find()
        if (Find != 0) {
            res.send(await ResponseMassage.ResponseSuccess(Find))
        } else {
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }
    } catch (error) {
        console.log(error)
    }
}

const Get_Traffic_state_ID = async (req, res) => {
    try {
        const Find = await Traffic_state_modal.find({ _id: req.params.id })
        if (Find.length !== 0) {
            res.send(await ResponseMassage.ResponseSuccess(Find))
        } else {
            res.send(await ResponseMassage.ResponseErrorDataMsg("ID Not Found", Find))
        }
    } catch (error) {
        console.log(error)
    }
}

const Update_Traffic_state = async (req, res) => {
    try {
        const data = {
            state_code: req.body.state_code,
            state_name: req.body.state_name,
            title: req.body.title,
            title_gu: req.body.title_gu,
            title_hi: req.body.title_hi,
            title_mr: req.body.title_mr,
            title_pa: req.body.title_pa,
            title_ta: req.body.title_ta,
            title_te: req.body.title_te,
            title_ml: req.body.title_ml,
            title_kn: req.body.title_kn,
            title_bn: req.body.title_bn,
            title_or: req.body.title_or,

            sub_title: req.body.sub_title,
            sub_title_gu: req.body.sub_title_gu,
            sub_title_hi: req.body.sub_title_hi,
            sub_title_mr: req.body.sub_title_mr,
            sub_title_pa: req.body.sub_title_pa,
            sub_title_ta: req.body.sub_title_ta,
            sub_title_te: req.body.sub_title_te,
            sub_title_ml: req.body.sub_title_ml,
            sub_title_kn: req.body.sub_title_kn,
            sub_title_bn: req.body.sub_title_bn,
            sub_title_or: req.body.sub_title_or,

            content: req.body.content,
            content_gu: req.body.content_gu,
            content_hi: req.body.content_hi,
            content_mr: req.body.content_mr,
            content_pa: req.body.content_pa,
            content_ta: req.body.content_ta,
            content_te: req.body.content_te,
            content_ml: req.body.content_ml,
            content_kn: req.body.content_kn,
            content_bn: req.body.content_bn,
            content_or: req.body.content_or,

            disclaimer: req.body.disclaimer,
            disclaimer_gu: req.body.disclaimer_gu,
            disclaimer_hi: req.body.disclaimer_hi,
            disclaimer_mr: req.body.disclaimer_mr,
            disclaimer_pa: req.body.disclaimer_pa,
            disclaimer_ta: req.body.disclaimer_ta,
            disclaimer_te: req.body.disclaimer_te,
            disclaimer_ml: req.body.disclaimer_ml,
            disclaimer_kn: req.body.disclaimer_kn,
            disclaimer_bn: req.body.disclaimer_bn,
            disclaimer_or: req.body.disclaimer_or
        }
        var Result = await Traffic_state_modal.findByIdAndUpdate(req.params.id, data, { new: true })
        if (Result) {
            res.send(await ResponseMassage.ResponseSuccess(Result))
        } else {
            res.send(await ResponseMassage.ResponseErrorMsg("ID Not Found"))
        }
    } catch (error) {
        console.log(error)
    }
}

const Delete_Traffic_state = async (req, res) => {
    try {
        const result = await Traffic_state_modal.findByIdAndDelete(req.body.id)
        if (result) {
            res.send(await ResponseMassage.ResponseSuccess(result))
        } else {
            res.send(await ResponseMassage.ResponseErrorMsg("ID Not Found"))
        }
    } catch (error) {
        console.log(error)
    }
}


// ************************************************************ Traffice Rule ********************************************

const create_traffic_rule = async (req, res) => {
    try {
        const data = {
            traffic_state_id: req.body.traffic_state_id,
            offence: req.body.offence,
            panalty: req.body.panalty,
        }
        console.log('data', data)

        const result = Traffic_Rule_modal(data)
        const Data = result.save()
        res.send(await ResponseMassage.ResponseSuccessMsg(Data))
    } catch (error) {
        console.log(error)
    }
}

const Get_traffic_rule = async (req, res) => {
    try {
        const Find = await Traffic_Rule_modal.aggregate([
            {
                $lookup: {
                    from: "traffic_states",
                    localField: "traffic_state_id",
                    foreignField: "_id",
                    pipeline: [{
                        $project: { _id: 1, state_name: 1 }
                    }],
                    as: "traffic_state_id"
                }
            },
            {
                $unwind: "$traffic_state_id"
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

const Get_traffic_rule_ID = async (req, res) => {
    try {
        const Find = await Traffic_Rule_modal.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(req.params.id) }
            },
            {
                $lookup: {
                    from: "traffic_states",
                    localField: "traffic_state_id",
                    foreignField: "_id",
                    pipeline: [{
                        $project: { _id: 1, state_name: 1 }
                    }],
                    as: "traffic_state_id"
                }
            },
            {
                $unwind: "$traffic_state_id"
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

const update_traffic_rule = async (req, res) => {
    try {
        const data = {
            traffic_state_id: req.body.traffic_state_id,
            offence: req.body.offence,
            panalty: req.body.panalty,
        }
        const Result = await Traffic_Rule_modal.findByIdAndUpdate(req.params.id, data, { new: true })
        if (Result) {
            res.send(await ResponseMassage.ResponseSuccess(Result))
        } else {
            res.send(await ResponseMassage.ResponseErrorMsg("ID Not Found"))
        }
    } catch (error) {
        console.log(error)
    }
}

const Delete_traffic_rule = async (req, res) => {
    try {
        const result = await Traffic_Rule_modal.findByIdAndDelete(req.body.id)
        if (result) {
            res.send(await ResponseMassage.ResponseSuccess(result))
        } else {
            res.send(await ResponseMassage.ResponseErrorMsg("ID Not Found"))
        }
    } catch (error) {
        console.log(error)
    }
}

const searching_traffic_rule = async (req, res) => {
    try {

        let match = {}
        if (req.body.search && req.body.search !== "") {
            match.offence = req.body.search ? { $regex: ".*" + req.body.search + ".*", $options: "i" } : {}
        }
        if (req.body.state && req.body.state !== "") {
            match.traffic_state_id = new mongoose.Types.ObjectId(req.body.state)
        }

        const Find = await Traffic_Rule_modal.aggregate([
            {
                $match: match
            },
            {
                $lookup: {
                    from: "traffic_states",
                    localField: "traffic_state_id",
                    foreignField: "_id",
                    pipeline: [{
                        $project: { _id: 1, state_name: 1 }
                    }],
                    as: "traffic_state_id"
                }
            },
            {
                $unwind: "$traffic_state_id"
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

const create_Language = async (req, res) => {
    try {
        const data = {
            lable: req.body.lable,
            or: req.body.or,
            bn: req.body.bn,
            kn: req.body.kn,
            ml: req.body.ml,
            te: req.body.te,
            ta: req.body.ta,
            pa: req.body.pa,
            mr: req.body.mr,
            hi: req.body.hi,
            gu: req.body.gu,
        }

        const result = Traffic_Language_modal(data)
        const Data = await result.save()
        res.send(await ResponseMassage.ResponseSuccessMsg(Data))

    } catch (error) {
        console.log(error)
    }
}

const Get_Language = async (req, res) => {
    try {
        const Find = await traffic_Language.find()
        if (Find != 0) {
            res.send(await ResponseMassage.ResponseSuccess(Find))
        } else {
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }
    } catch (error) {
        console.log(error)
    }
}


export default {
    create_Rc_DL_infromation, Get_RC_DL_information, Get_RC_DL_information_ID, Update_RC_DL_information, Delete_RC_DL_information, Searching_RD_DL, toggle_RD_DL,
    create_Traffic_state, Get_Traffic_state, Get_Traffic_state_ID, Update_Traffic_state, Delete_Traffic_state,
    create_traffic_rule, Get_traffic_rule, Get_traffic_rule_ID, update_traffic_rule, Delete_traffic_rule, searching_traffic_rule, create_Language, Get_Language 


}