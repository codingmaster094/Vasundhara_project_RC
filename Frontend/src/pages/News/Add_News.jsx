import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Table, Form, Breadcrumb, ButtonGroup } from 'react-bootstrap';
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from '../../layout/Layout';
import { API } from "../../App";
import { toast } from "react-toastify";
import { SelectPicker } from "rsuite";
import Cookies from "js-cookie";

var News_Headline_Array = []
const Add_News = () => {
    const token = Cookies.get("fmljwt");
    const navigate = useNavigate()
    const [validated, setvalidated] = useState(false)
    const [NewsHeadline, setNewsHeadline] = useState([])
    const [url, seturl] = useState("")
    const [name, setname] = useState("")
    const [Data, setData] = useState([])
    const [New_data, setNew_data] = useState({
        news_headline_id: "",
        news: ""
    })
    var news


    const News_Headline_dropdown = async () => {
        const resut = await API.post("/get_news_headline", {}, { headers: { Authorization: `Bearer ${token}` } });
        console.log('resut', resut.data.Data)
        News_Headline_Array = []
        News_Headline_Array.push({ label: "Select News Headline", value: "" })
        resut.data.Data.map((val, index) => {
            News_Headline_Array.push({ label: val.title, value: val._id })
        })
        setNewsHeadline(News_Headline_Array)
    }

    const News_headline_Hendler = async (e, name) => {
        setNew_data({ ...New_data, [name]: e });
    };

    const addtage = (tag1, name) => {
        const tag = {
            Label: tag1,
            value: "",
            Url: "",
            tag: name
        }
        setData([...Data, tag])
    }

    const inputdata = (e, index, tag) => {
        if (tag === 'li') {
            let data = [...Data];
            data[index]['value'] = `<ul><${tag}>${e.target.value}</${tag}></ul>`;
            setData(data)
        }
        else {
            if (tag === "img") {
                let data = [...Data];
                data[index]['value'] = `<${tag} ${(tag === 'img') ? `src="${e.target.value}"` : ""} ></${tag}>`
                setData(data)
            }
            else {
                let data = [...Data];
                data[index]['value'] = `<${tag}>${e.target.value}</${tag}>`
                setData(data)
            }

        }
    }

    const Remove = (index) => {
        const data = [...Data]
        data.splice(index, 1)
        setData(data)
    }

    const inputtaga = (e, index, tag) => {
        if (e.target.name === 'url') {
            seturl(e.target.value)
        }
        else {
            setname(e.target.value)
        }
        let data = [...Data];
        data[index]['value'] = `<${tag} ${(e.target.name === 'url') ? `href="${e.target.value}"` : `href="${url}"`}>${(e.target.name === 'name') ? `${e.target.value}` : name}</${tag}>`
        setData(data)
    }

    const SubmitData = async () => {
        if (New_data.news_headline_id == "") {
            toast.error("plse Select News Headline & Tag")
            if(New_data.news == ""){
                setvalidated(true)
            }
        }else{
            news = []
            Data.map((val) => {
                news.push(val.value)
            })
            const Form = new FormData()
            Form.append("news_headline_id", New_data.news_headline_id)
            Form.append("news", news)
            const result = await API.post("/create_news", Form, { headers: { Authorization: `Bearer ${token}` } })
            if (result) {
                toast.success("Data Saved successfully");
                navigate("/news")
            }
        }
    }

    useEffect(() => {
        News_Headline_dropdown()
    }, [])

    return (
        <Layout sidebar={true}>
            <div className="page-heading">
                <h3>News Add</h3>
                <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
                    <Breadcrumb.Item >
                        <Link to="/"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >
                        <Link to="/news">News</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Create news</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <div className="page-content">
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
                                            defaultValue={""}
                                            className="my-2"
                                            block
                                            placeholder="Select news_headline_id"
                                            onChange={(e) => News_headline_Hendler(e, "news_headline_id")}
                                        />
                                    </Col>
                                    <Col sm={12}>
                                        <ButtonGroup className="my-3 d-flex" >
                                            <Button onClick={() => { addtage('P Tag', 'p') }} >{`< P >`}</Button>
                                            <Button onClick={() => { addtage('Li Tag', 'li') }}>{`ul (li)`}</Button>
                                            <Button onClick={() => { addtage('IMG Tag', 'img') }}>{`Image`}</Button>
                                            <Button onClick={() => { addtage('H1 Tag', 'h1') }}>{`< h1 >`}</Button>
                                            <Button onClick={() => { addtage('H2 Tag', 'h2') }}>{`< h2 >`}</Button>
                                            <Button onClick={() => { addtage('H3 Tag', 'h3') }}>{`< h3 >`}</Button>
                                            <Button onClick={() => { addtage('H4 Tag', 'h4') }}>{`< h4 >`}</Button>
                                            <Button onClick={() => { addtage('SCRIPT Tag', 'Script') }}>{`Git Code`}</Button>
                                            <Button onClick={() => { addtage('a', 'a') }}>{`< a >`}</Button>
                                            <Button onClick={() => { addtage('Other Tag', 'p') }}>{`Other`}</Button>
                                        </ButtonGroup>
                                        {/* <Form.Control.Feedback type='invalid'>{errors.news}</Form.Control.Feedback> */}
                                    </Col>
                                    {
                                        Data.length != 0 ?
                                            Data.map((val, index) => {
                                                return (

                                                    (val.Label !== "a") ? (
                                                        <Row className='d-flex align-items-center' key={index}>
                                                            <Col sm={11}>
                                                                <Form.Label htmlFor={`${val.Label}_name`} >{val.Label}</Form.Label>
                                                                <Form.Control id={`${val.Label}_name`} type="text" className="my-2" onChange={(e) => { inputdata(e, index, val.tag) }} required />
                                                                <Form.Control.Feedback type="invalid">
                                                                    Tag Field Is Require
                                                                </Form.Control.Feedback>

                                                            </Col>
                                                            <Col sm={1} className="mt-3">
                                                                <Button className='btn btn-danger' onClick={() => { Remove(index) }} >Remove</Button>
                                                            </Col>
                                                        </Row>) : (
                                                        <Row className='d-flex align-items-center' key={index}>
                                                            <Col sm={6}>
                                                                <Form.Label htmlFor={`url_name`} >Url</Form.Label>
                                                                <Form.Control id={`url_name`} type="text" className="my-2" name="url" onChange={(e) => { inputtaga(e, index, val.tag) }} required />
                                                            </Col>
                                                            <Col sm={5}>
                                                                <Form.Label htmlFor={`name`} >Name</Form.Label>
                                                                <Form.Control id={`name`} type="text" className="my-2" name="name" onChange={(e) => { inputtaga(e, index, val.tag) }} required />
                                                            </Col>
                                                            <Col sm={1} className="mt-3">
                                                                <Button className='btn btn-danger' onClick={() => { Remove(index) }} >Remove</Button>
                                                            </Col>
                                                        </Row>
                                                    )

                                                )
                                            })
                                            :
                                            []
                                    }

                                </Card.Body>
                                <Card.Footer className="text-end">
                                    <Button variant="primary" onClick={SubmitData} className="me-3">Save</Button>
                                    <Link to='/news'>
                                        <Button variant="secondary">Cancle</Button>
                                    </Link>
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Layout>
    )
}

export default Add_News