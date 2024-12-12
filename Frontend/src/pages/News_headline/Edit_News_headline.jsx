import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import { Row, Col, Card, Button, Form, InputGroup, Breadcrumb } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import { API } from '../../App';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import Select from "react-select"
import Switch from "react-switch";
import Fancybox from '../../Component/FancyBox';

let option1 = []
let option2 = []
let option3 = []
let option4 = []
const Edit_News_headline = () => {
    const params = useParams()
    var News_Category_Data = []
    var Vehicle_Data = []
    var Brand_Data = []
    var Tag_Data = []
    const token = Cookies.get("fmljwt");
    const navigate = useNavigate()
    const [suggetion, setsuggetion] = useState([])
    const [N_category, setN_category] = useState([])
    const [validated, setvalidated] = useState(false)
    const [Category, setCategory] = useState([])
    const [Brand_data, setBrand_data] = useState([])
    const [opt, setopt] = useState([])
    const [opt1, setopt1] = useState([])
    const [opt2, setopt2] = useState([])
    const [opt3, setopt3] = useState([])
    const [NewData, setNewData] = useState({
        title: "",
        description: "",
        news_url: "",
        headtag: "",
        date: "",
        status:"",
        is_slider:""
    })


  const New_cate_hendler = async (e) => {
    setN_category(Array.isArray(e) ? e.map(x => x.value) : []);
  }
  const Cate_hendler = async (e) => {
    setCategory(Array.isArray(e) ? e.map(x => x.value) : []);
  }
  const BrandHandler = async (e) => {
    setBrand_data(Array.isArray(e) ? e.map(x => x.value) : []);
  }
  const tag_hendler = async (e) => {
    setsuggetion(Array.isArray(e) ? e.map(x => x.value) : []);
  }

  const New_category_onload = async()=>{
      const res = await API.post("/get_News_category", {}, { headers: { Authorization: `Bearer ${token}` } })
        setopt(res.data.Data)
  }

  option1 = opt.map((val) => {
    return { value: val._id, label: val.name }
  })


  const category_onload = async()=>{
    const res = await API.post("/get/vehicle/category", {}, { headers: { Authorization: `Bearer ${token}` } })
      setopt1(res.data.data)
}

option2 = opt1.map((val) => {
  return { value: val._id, label: val.name }
})

const brand_onload = async()=>{
    const res = await API.post("/get/vehicle/brand", {}, { headers: { Authorization: `Bearer ${token}` } })
      setopt2(res.data.data)
}

option3 = opt2.map((val) => {
  return { value: val._id, label: val.name }
})

const Tag_onload = async()=>{
    const res = await API.post("/get_tags", {}, { headers: { Authorization: `Bearer ${token}` } })
      setopt3(res.data.Data)
}

option4 = opt3.map((val) => {
  return { value: val._id, label: val.name }
})

    const Get_view = async () => {
        const result = await API.post(`/get_news_headline_ID/${params.id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
        console.log('result.data.Data', result.data.Data)
        setNewData({
            _id: result.data.Data[0]._id,
            title: result.data.Data[0].title,
            description: result.data.Data[0].description,
            news_url: result.data.Data[0].news_url,
            headtag: result.data.Data[0].headtag,
            date: result.data.Data[0].date.split("T")[0],
            image: result.data.Data[0].image,
            websiteimage: result.data.Data[0].websiteimage,
            status: result.data.Data[0].status,
            is_slider: result.data.Data[0].is_slider,
        });

        var Ncate_array = []
        result.data.Data.map((val) => {
            val.category_id.map((val, i) => {
                News_Category_Data.push({ value: val._id, label: val.name })
            })
            Ncate_array.push(val._id)
        })
        setN_category(result.data.Data[0].category_id)

        var Cate_array = []
        result.data.Data.map((val) => {
            val.vehicale_category_id.map((val, i) => {
                Vehicle_Data.push({ value: val._id, label: val.name })
            })
            Cate_array.push(val._id)
        })
        setCategory(result.data.Data[0].vehicale_category_id)

        var Band_array = []
        result.data.Data.map((val) => {
            val.brand_id.map((val, i) => {
                Brand_Data.push({ value: val._id, label: val.name })
            })
            Band_array.push(val._id)
        })
        setBrand_data(result.data.Data[0].brand_id)

        var Tag_array = []
        result.data.Data.map((val) => {
            val.tag_id.map((val, i) => {
                Tag_Data.push({ value: val._id, label: val.name })
            })
            Tag_array.push(val._id)
        })
        setsuggetion(result.data.Data[0].tag_id)

        New_category_onload()
        category_onload()
        brand_onload()
        Tag_onload()
    }

    const SaveData = async (e) => {
        setNewData({ ...NewData, [e.target.name]: e.target.value });
    }
    const [image, setimage] = useState("")
    const image_hendler = (e) => {
        setimage(e.target.files[0]);
    };
    const [websiteimage, setwebsiteimage] = useState("")
    const image_hendler1 = (e) => {
        setwebsiteimage(e.target.files[0]);
    };

    const Statushendler = (e) => {
        console.log('e', e)
        const Result = e === true ? 1 : 0;
        setNewData({
            title: NewData.title,
            description: NewData.description,
            news_url: NewData.news_url,
            headtag: NewData.headtag,
            image:NewData.image,
            websiteimage:NewData.websiteimage,
            date: NewData.date.split("T")[0],
            is_slider:NewData.is_slider,
            status: Result,
        });
      };

      const Silderhendler = (e) => {
        console.log('e', e)
        const Result = e === true ? 1 : 0;
        setNewData({
            title: NewData.title,
            description: NewData.description,
            news_url: NewData.news_url,
            headtag: NewData.headtag,
            image:NewData.image,
            websiteimage:NewData.websiteimage,
            date: NewData.date.split("T")[0],
            status: NewData.status,
            is_slider:Result
        });
      };


    const Submit = async () => {
        if (NewData.title == "" || NewData.description == "" || NewData.news_url == "" || NewData.date == "") {
            setvalidated(true)
        } else {
            const Form = new FormData();
            Form.append("title", NewData.title)
            Form.append("description", NewData.description)
            Form.append("news_url", NewData.news_url)
            Form.append("headtag", NewData.headtag)
            Form.append("date", NewData.date)

            const arrN_category = []
            N_category?.map((val, ind) => {
                console.log('val', val)
                arrN_category.push(val)
            })
            Form.append('category_id', JSON.stringify(arrN_category))
            console.log('Category', Category)
            const arrCategory = []
            Category?.map((val, ind) => {
                console.log('val', val)
                arrCategory.push(val)
            })
            Form.append('vehicale_category_id', JSON.stringify(arrCategory))

            const arrBrand = []
            Brand_data?.map((val, ind) => {
                console.log('val', val)
                arrBrand.push(val)
            })
            Form.append('brand_id', JSON.stringify(arrBrand))

            const arrsuggetion = []
            suggetion?.map((val, ind) => {
                console.log('val', val)
                arrsuggetion.push(val)
            })
            Form.append('tag_id', JSON.stringify(arrsuggetion))

            Form.append("is_slider", NewData.is_slider);
            Form.append("status", NewData.status);
            Form.append("image", image);
            Form.append("websiteimage", websiteimage);

            const result = await API.post(`/update_news_headline/${params.id}`, Form, { headers: { Authorization: `Bearer ${token}` } })
            if (result) {
                toast.success("Data update successfully");
                navigate(`/view/news_Headline/${params.id}`)
          }
        }
    }

    useEffect(() => {
        Get_view()
    }, [])

    return (
        <Layout sidebar={true}>
             <div className="page-heading">
                <h3>News headline Edit</h3>
                <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
                    <Breadcrumb.Item >
                        <Link to="/"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >
                        <Link to="/news_Headline">News headline </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Edit News headline</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="page-content">
                <Row>
                    <Col xs={12}>
                        <Card className="mb-4">
                            <Card.Body>
                                <Form noValidate validated={validated}>
                                    <Row>
                                        <Col xs={12}>
                                            <div className="page-content">
                                                <Form noValidate >
                                                    <Row>
                                                        <Col xs={12}>
                                                            <Card className="mb-4">
                                                                <Card.Body>
                                                                    <Row>
                                                                        <Col md={4}>
                                                                            <Form.Label htmlFor="tagsuggestion" className="mb-2">News Category</Form.Label>
                                                                            <CreatableSelect
                                                                                isMulti
                                                                                name="tag_suggestion"
                                                                                defaultValue={News_Category_Data}
                                                                                className='customMulSelect'
                                                                                classNamePrefix="react-select"
                                                                                closeMenuOnSelect={false}
                                                                                onChange={New_cate_hendler}
                                                                                required
                                                                                options={option1}
                                                                            />
                                                                        </Col>
                                                                        <Col md={4}>
                                                                            <Form.Label htmlFor="tagsuggestion" className="mb-2">Category</Form.Label>
                                                                            <Select
                                                                                closeMenuOnSelect={false}
                                                                                name="vehicale_category_id"
                                                                                defaultValue={Vehicle_Data}
                                                                                isClearable={true}
                                                                                placeholder="Select Vehicle Category"
                                                                                className='customMulSelect'
                                                                                classNamePrefix="react-select"
                                                                                isMulti
                                                                                onChange={Cate_hendler}
                                                                                options={option2}
                                                                            />
                                                                        </Col>
                                                                        <Col md={4}>
                                                                            <Form.Label htmlFor="tagsuggestion" className="mb-2">Brand</Form.Label>
                                                                            <Select
                                                                                closeMenuOnSelect={false}
                                                                                name="brand_id"
                                                                                defaultValue={Brand_Data}
                                                                                isClearable={true}
                                                                                placeholder="Select Brand"
                                                                                className='customMulSelect'
                                                                                classNamePrefix="react-select"
                                                                                isMulti
                                                                                onChange={BrandHandler}
                                                                                options={option3}
                                                                            />
                                                                        </Col>
                                                                        <Col md={6}>
                                                                            <Form.Label htmlFor="tagsuggestion" className="mb-2">Tag</Form.Label>
                                                                            <CreatableSelect
                                                                                isMulti
                                                                                name="tag_suggestion"
                                                                                defaultValue={Tag_Data}
                                                                                className='customMulSelect'
                                                                                classNamePrefix="react-select"
                                                                                closeMenuOnSelect={false}
                                                                                onChange={tag_hendler}
                                                                                options={option4}
                                                                            />
                                                                        </Col>
                                                                        <Col md={6}>
                                                                            <Form.Label htmlFor="name">Title</Form.Label>
                                                                            <Form.Control
                                                                                type="text"
                                                                                className="my-2"
                                                                                name="title"
                                                                                required
                                                                                value={NewData.title}
                                                                                onChange={SaveData}
                                                                            />
                                                                             <Form.Control.Feedback type="invalid">
                                                                            Title Field Is Require
                                                                        </Form.Control.Feedback>
                                                                        </Col>

                                                                        <Col md={6}>
                                                                            <Form.Label htmlFor="playstore">Description</Form.Label>
                                                                            <Form.Control
                                                                                type="text"
                                                                                className="my-2"
                                                                                name="description"
                                                                                required
                                                                                value={NewData.description}
                                                                                onChange={SaveData}
                                                                            />
                                                                            <Form.Control.Feedback type="invalid">
                                                                            Description Field Is Require
                                                                        </Form.Control.Feedback>
                                                                        </Col>

                                                                        <Col md={6}>
                                                                            <Form.Label htmlFor="adslink">News URL</Form.Label>
                                                                            <Form.Control
                                                                                type="text"
                                                                                className="my-2"
                                                                                name="news_url"
                                                                                required
                                                                                value={NewData.news_url}
                                                                                onChange={SaveData}
                                                                            />
                                                                            <Form.Control.Feedback type="invalid">
                                                                            News URL Field Is Require
                                                                        </Form.Control.Feedback>
                                                                        </Col>

                                                                        <Col md={12}>
                                                                            <Form.Label htmlFor="adslink">Head Note: Headtag Given By SEO</Form.Label>
                                                                            <Form.Control
                                                                                as="textarea" rows={3}
                                                                                type="textarea"
                                                                                className="my-2"
                                                                                name="headtag"
                                                                                required
                                                                                value={NewData.headtag}
                                                                                onChange={SaveData}
                                                                            />
                                                                            <Form.Control.Feedback type="invalid">
                                                                            Head Note Field Is Require
                                                                        </Form.Control.Feedback>
                                                                        </Col>
                                                                        <Col md={2}>
                                                                            <Form.Label htmlFor="adslink">Date</Form.Label>
                                                                            <Form.Control
                                                                                type="date"
                                                                                className="my-2"
                                                                                name="date"
                                                                                required
                                                                                value={NewData.date}
                                                                                onChange={SaveData}
                                                                            />
                                                                            <Form.Control.Feedback type="invalid">
                                                                            Date Field Is Require
                                                                        </Form.Control.Feedback>
                                                                        </Col>
                                                                        <Col md={3}>
                                                                            <Form.Label htmlFor="coverimage"> Image</Form.Label>
                                                                            <InputGroup className="my-2">
                                                                                <Form.Control type="file"name="image" onChange={image_hendler}  />
                                                                                <InputGroup.Text className="p-0">
                                                                                    <Fancybox>
                                                                                        <a data-fancybox="gallery" href={NewData.image}>
                                                                                            <img src={NewData.image} className="hv-40 rounded-3" alt="" />
                                                                                        </a>
                                                                                    </Fancybox>
                                                                                </InputGroup.Text>
                                                                            </InputGroup>
                                                                        </Col>
                                                                        <Col md={3}>
                                                                            <Form.Label htmlFor="adslink">Website Image</Form.Label>
                                                                            <InputGroup className="my-2">
                                                                                <Form.Control type="file"name="websiteimage" onChange={image_hendler1}  />
                                                                                <InputGroup.Text className="p-0">
                                                                                    <Fancybox>
                                                                                        <a data-fancybox="gallery" href={NewData.websiteimage}>
                                                                                            <img src={NewData.websiteimage} className="hv-40 rounded-3" alt="" />
                                                                                        </a>
                                                                                    </Fancybox>
                                                                                </InputGroup.Text>
                                                                            </InputGroup>
                                                                        </Col>

                                                                        <Col md={1}>
                                                                            <Form.Label htmlFor="is_silder" className="d-block mb-2">
                                                                                is Slider
                                                                            </Form.Label>
                                                                            <Switch
                                                                                onChange={Silderhendler}
                                                                                name="is_slider"
                                                                                checked={NewData.is_slider === 1 ? true : false}
                                                                                offColor="#C8C8C8"
                                                                                onColor="#0093ed"
                                                                                height={30}
                                                                                width={70}
                                                                                className="react-switch"
                                                                                uncheckedIcon={
                                                                                    <div className="react-switch-off">OFF</div>
                                                                                }
                                                                                checkedIcon={<div className="react-switch-on">ON</div>}
                                                                            />
                                                                        </Col>
                                                                        <Col md={1}>
                                                                            <Form.Label htmlFor="status" className="d-block mb-2">
                                                                                Status
                                                                            </Form.Label>
                                                                            <Switch
                                                                                onChange={Statushendler}
                                                                                name="status"
                                                                                checked={NewData.status === 1 ? true : false}
                                                                                offColor="#C8C8C8"
                                                                                onColor="#0093ed"
                                                                                height={30}
                                                                                width={70}
                                                                                className="react-switch"
                                                                                uncheckedIcon={
                                                                                    <div className="react-switch-off">OFF</div>
                                                                                }
                                                                                checkedIcon={<div className="react-switch-on">ON</div>}
                                                                            />
                                                                        </Col>

                                                                    </Row>
                                                                </Card.Body>
                                                                <Card.Footer className="text-end">
                                                                    <Button
                                                                        variant="primary"
                                                                        className="me-3"
                                                                        onClick={Submit}
                                                                    >
                                                                        Save
                                                                    </Button>
                                                                    <Link to={`/view/news_Headline/${params.id}`}>
                                                                        <Button variant="secondary">Cancle</Button>
                                                                    </Link>
                                                                </Card.Footer>
                                                            </Card>
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </div>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Layout>
    )
}

export default Edit_News_headline