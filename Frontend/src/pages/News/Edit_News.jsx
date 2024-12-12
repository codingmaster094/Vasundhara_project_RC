import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button, Table, Form, InputGroup, Image, ButtonGroup, Breadcrumb } from 'react-bootstrap';
import { SelectPicker } from "rsuite";
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import Swal from "sweetalert2";
import $ from 'jquery'
import Switch from "react-switch";
import { API } from '../../App';
import Layout from '../../layout/Layout';

var News_Headline_Array = []
const Edit_News = () => {
  const token = Cookies.get("fmljwt");
    const navigate = useNavigate()
    const [validated, setvalidated] = useState(false)
    const params = useParams()
    const [news, setnews] = useState("")
    const [style, setstyle] = useState("none")
    const [New_data , setNew_Data] = useState({
        news_headline_id:'',
    })

    const getdata = async () => {
        console.log('params', params)
        const Form = new FormData()
        Form.append('id', params.id)
        const Response = await API.post(`/get_news_ID/${params.id}`,{},{headers:{Authorization: `Bearer ${token}`}})
        console.log('Response', Response)
        setnews(Response.data.Data[0].news.replaceAll(",", "\n"))
        setNew_Data({
            news_headline_id:Response.data.Data[0].news_headline_id._id
        })
    }
    const [NewsHeadline, setNewsHeadline] = useState([])
    const News_Headline_dropdown = async () => {
        const resut = await API.post("/get_news_headline" ,{} ,{headers:{Authorization: `Bearer ${token}`}});
        console.log('resut', resut.data.Data)
        News_Headline_Array = []
        News_Headline_Array.push({ label: "Select News Headline", value: "" })
        resut.data.Data.map((val, index) => {
            News_Headline_Array.push({ label: val.title, value: val._id })
        })
        setNewsHeadline(News_Headline_Array)
    }

    useEffect(() => {
        getdata()
        News_Headline_dropdown()
    }, [])

    const getcategory = async (e, name) => {
        setNew_Data({ ...New_data, [name]: e });
    };

    const changeinput = (e)=>{
        setnews(e.target.value)
    }

    const save = async () => {
        console.log('news', news)
        if (New_data.news_headline_id == "") {
            toast.error("plse Select News Headline")
        }else if(news == ""){
            setvalidated(true)
        }
        else{
            const Form = new FormData()
            Form.append('news_headline_id', New_data.news_headline_id)
            Form.append('news', news)
            const result = await API.post(`/update_news/${params.id}` ,Form ,{headers:{Authorization:`Bearer ${token}`}});
            if (result) {
                toast.success("Data Update successfully");
                navigate(`/View/news/${params.id}`)
          }
        }
    }
  return (
    <Layout sidebar={true}>
    <div className="page-heading">
                <h3>News Edit</h3>
                <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
                    <Breadcrumb.Item >
                        <Link to="/"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >
                        <Link to="/news">News</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Edit news</Breadcrumb.Item>
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
                                    <Card className="mb-4">
                                        <Card.Body>
                                            <Col md={12}>
                                                <Form.Label htmlFor="Platform">News Headline </Form.Label>
                                                <SelectPicker
                                                    cleanable={false}
                                                    data={NewsHeadline}
                                                    searchable={false}
                                                    name="news_headline_id"
                                                    value={New_data.news_headline_id}
                                                    className="my-2"
                                                    block
                                                    placeholder="Select news_headline_id"
                                                    onChange={(e) => getcategory(e, "news_headline_id")}
                                                />
                                            </Col>
                                            <Col sm={12}>
                                                <Form.Group className="form-group">
                                                    <Form.Label>News</Form.Label>
                                                    <Form.Control as="textarea" className="my-2" rows={20} value={news} onChange={(e) => { changeinput(e) }} required />
                                                    <Form.Control.Feedback type="invalid">
                                                    News Field Is Require
                                                </Form.Control.Feedback>
                                                </Form.Group>

                                            </Col>

                                        </Card.Body>
                                        <Card.Footer className="text-end">
                                            <Button
                                                variant="primary"
                                                className="me-3"
                                                onClick={save}
                                            >
                                                Save
                                            </Button>
                                            <Link to={`/View/news/${params.id}`}>
                                                <Button variant="secondary" >Cancle</Button>
                                            </Link>
                                            <Button variant="warning" className="m-2" onClick={() => { setstyle("block") }}>Preview</Button>

                                        </Card.Footer>
                                    </Card>
                                    <Card style={{ display: `${style}` }} className="mt-4">
                                        <Card.Body>
                                            <Col>
                                                <div className="content" dangerouslySetInnerHTML={{ __html: news }}></div>
                                            </Col>
                                        </Card.Body>
                                    </Card>

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

export default Edit_News