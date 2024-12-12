import React, { useState } from "react";
import { Row, Col, Card, Button, Table, Form, InputGroup, Image, Breadcrumb } from 'react-bootstrap';
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from '../../layout/Layout';
import Switch from 'react-switch'
import { API } from "../../App";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Cookies from "js-cookie";

const Edit_RC_DL_info = () => {
    const token = Cookies.get("fmljwt");
    const params = useParams();
    const navigate = useNavigate();
    const [validated, setvalidated] = useState(false)
    const [en, seten] = useState([])
    const [hi, sethi] = useState([])
    const [mr, setmr] = useState([])
    const [gu, setgu] = useState([])
    const [kn, setkn] = useState([])
    const [ta, setta] = useState([])
    const [te, sette] = useState([])
    const [bn, setbn] = useState([])
    const [ml, setml] = useState([])
    const [or, setor] = useState([])
    const [pa, setpa] = useState([])
    const [thumb_image, setthumb_image] = useState([])
    const [Data, SetData] = useState({
        id:"",
        type: "",
        title: "",
        en: "",
        hi: "",
        mr: "",
        gu: "",
        kn: "",
        ta: "",
        te: "",
        bn: "",
        ml: "",
        or: "",
        pa: "",
        thumb_image: "",
        status: "",
    });

    const Getview = async (Eid) => {
        const result = await API.post(`/Get_RC_DL_information_ID/${params.id}`,{},{headers: { Authorization: `Bearer ${token}` }});
        SetData({
            id:result.data.Data[0]._id,
            type: result.data.Data[0].type,
            title: result.data.Data[0].title,
            en: result.data.Data[0].en,
            hi: result.data.Data[0].hi,
            mr: result.data.Data[0].mr,
            gu: result.data.Data[0].gu,
            kn: result.data.Data[0].kn,
            ta: result.data.Data[0].ta,
            te: result.data.Data[0].te,
            bn: result.data.Data[0].bn,
            ml: result.data.Data[0].ml,
            or: result.data.Data[0].or,
            pa: result.data.Data[0].pa,
            thumb_image: result.data.Data[0].thumb_image,
            status: result.data.Data[0].status,
        });
    };

    const enhendler = (e) => {
        seten(e.target.files[0])
    };
    const hihendler = (e) => {
        sethi(e.target.files[0])
    };
    const mrhendler = (e) => {
        setmr(e.target.files[0])
    };
    const knhendler = (e) => {
        setkn(e.target.files[0])
    };
    const guhendler = (e) => {
        setgu(e.target.files[0])
    };
    const tahendler = (e) => {
        setta(e.target.files[0])
    };
    const tehendler = (e) => {
        sette(e.target.files[0])
    };
    const bnhendler = (e) => {
        setbn(e.target.files[0])
    };
    const mlhendler = (e) => {
        setml(e.target.files[0])
    };
    const orhendler = (e) => {
        setor(e.target.files[0])
    };
    const pahendler = (e) => {
        setpa(e.target.files[0])
    };
    const thumb_imagehendler = (e) => {
        setthumb_image(e.target.files[0])
    };
    const SaveData = async (e) => {
        SetData({ ...Data, [e.target.name]: e.target.value })
    }

    const Statushendler = (e) => {
        const Result = e === true ? 1 : 0;
        SetData({
            type: Data.type,
            title: Data.title,
            en: Data.en,
            hi: Data.hi,
            mr: Data.mr,
            gu: Data.gu,
            kn: Data.kn,
            ta: Data.ta,
            te: Data.te,
            bn: Data.bn,
            ml: Data.ml,
            or: Data.or,
            pa: Data.pa,
            thumb_image:Data.thumb_image,
            status: Result,
        });
    };


    const Submite = async()=>{
        if (Data.type === "" || Data.title === "" ) {
            setvalidated(true)
        }else{
            const Formdata = new FormData();
            Formdata.append("type", Data.type);
            Formdata.append("title", Data.title);
            Formdata.append("en", en);
            Formdata.append("hi", hi);
            Formdata.append("mr", mr);
            Formdata.append("kn", kn);
            Formdata.append("ta", ta);
            Formdata.append("te", te);
            Formdata.append("bn", bn);
            Formdata.append("ml", ml);
            Formdata.append("or", or);
            Formdata.append("pa", pa);
            Formdata.append("thumb_image", thumb_image);
            Formdata.append("status", Data.status);
            const result = await API.post(`/Update_RC_DL_information/${params.id}` , Formdata ,{headers: { Authorization: `Bearer ${token}` }});
            if (result) {
                toast.success("Data Update successfully");
                navigate(`/view/DL_RC_info/${params.id}`)
          }
        }
  
    }
    useEffect(() => {
        Getview()
    }, [])

    return (
        <Layout sidebar={true}>
            <div className="page-heading">
                <h3>DL / RC Info Edit</h3>
                <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
                    <Breadcrumb.Item >
                        <Link to="/"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >
                        <Link to="/DL_RC_info">RC/DL Info</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Edit RC/DL Info</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <div className="page-content">
                <Form noValidate validated={validated}>
                    <Row>
                        <Col xs={12}>
                            <Card className="mb-4">
                                <Card.Body>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Label htmlFor="name">Type</Form.Label>
                                            <Form.Select  name="type" onChange={SaveData} required>
                                                <option value={""}>Select</option>
                                                <option selected={Data.type == "DL" ? true : false} value={"DL"}>DL</option>
                                                <option selected={Data.type == "RC" ? true : false} value={"RC"}>RC</option>
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                Type Field Is Require
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Label htmlFor="icon">Title</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="title"
                                                value={Data.title}
                                                onChange={SaveData}
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Title Field Is Require
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Label htmlFor="icon">English</Form.Label>
                                            <InputGroup className="my-2">
                                                <Form.Control
                                                    type="file"
                                                    name="en"
                                                    onChange={enhendler}
                                                    
                                                />
                                                <InputGroup.Text>
                                                    <Image
                                                        className="hv-30 rounded-3"
                                                        src={Data.en}
                                                    ></Image>
                                                </InputGroup.Text>
                                                
                                            </InputGroup>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Label htmlFor="icon">Hindi</Form.Label>
                                            <InputGroup className="my-2">
                                                <Form.Control
                                                    type="file"
                                                    name="hi"
                                                    onChange={hihendler}
                                                    
                                                />
                                                <InputGroup.Text>
                                                    <Image
                                                        className="hv-30 rounded-3"
                                                        src={Data.hi}
                                                    ></Image>
                                                </InputGroup.Text>
                                               
                                            </InputGroup>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Label htmlFor="icon">Marathi</Form.Label>
                                            <InputGroup className="my-2">
                                                <Form.Control
                                                    type="file"
                                                    name="mr"
                                                    onChange={mrhendler}
                                                    
                                                />
                                                <InputGroup.Text>
                                                    <Image
                                                        className="hv-30 rounded-3"
                                                        src={Data.mr}
                                                    ></Image>
                                                </InputGroup.Text>
                                                
                                            </InputGroup>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Label htmlFor="icon">Gujarati</Form.Label>
                                            <InputGroup className="my-2">
                                                <Form.Control
                                                    type="file"
                                                    name="gu"
                                                    onChange={guhendler}
                                                    
                                                />
                                                <InputGroup.Text>
                                                    <Image
                                                        className="hv-30 rounded-3"
                                                        src={Data.gu}
                                                    ></Image>
                                                </InputGroup.Text>
                                               
                                            </InputGroup>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Label htmlFor="icon">Tamil</Form.Label>
                                            <InputGroup className="my-2">
                                                <Form.Control
                                                    type="file"
                                                    name="ta"
                                                    onChange={tahendler}
                                                    
                                                />
                                                <InputGroup.Text>

                                                    <Image
                                                        className="hv-30 rounded-3"
                                                        src={Data.ta}
                                                    ></Image>
                                                </InputGroup.Text>
                                               
                                            </InputGroup>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Label htmlFor="icon">Kannada</Form.Label>
                                            <InputGroup className="my-2">
                                                <Form.Control
                                                    type="file"
                                                    name="kn"
                                                    onChange={knhendler}
                                                    
                                                />
                                                <InputGroup.Text>
                                                    <Image
                                                        className="hv-30 rounded-3"
                                                        src={Data.kn}
                                                    ></Image>
                                                </InputGroup.Text>
                                               
                                            </InputGroup>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Label htmlFor="icon">Telugu</Form.Label>
                                            <InputGroup className="my-2">
                                                <Form.Control
                                                    type="file"
                                                    name="te"
                                                    onChange={tehendler}
                                                    
                                                />
                                                <InputGroup.Text>
                                                    <Image
                                                        className="hv-30 rounded-3"
                                                        src={Data.te}
                                                    ></Image>
                                                </InputGroup.Text>
                                                
                                            </InputGroup>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Label htmlFor="icon">Bangali</Form.Label>
                                            <InputGroup className="my-2">
                                                <Form.Control
                                                    type="file"
                                                    name="bn"
                                                    onChange={bnhendler}
                                                    
                                                />
                                                <InputGroup.Text>
                                                    <Image
                                                        className="hv-30 rounded-3"
                                                        src={Data.bn}
                                                    ></Image>
                                                </InputGroup.Text>
                                                
                                            </InputGroup>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Label htmlFor="icon">Panjabi</Form.Label>
                                            <InputGroup className="my-2">
                                                <Form.Control
                                                    type="file"
                                                    name="pa"
                                                    onChange={pahendler}
                                                    
                                                />
                                                <InputGroup.Text>
                                                    <Image
                                                        className="hv-30 rounded-3"
                                                        src={Data.pa}
                                                    ></Image>
                                                </InputGroup.Text>
                                                
                                            </InputGroup>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Label htmlFor="icon">Odisha</Form.Label>
                                            <InputGroup className="my-2">
                                                <Form.Control
                                                    type="file"
                                                    name="or"
                                                    onChange={orhendler}
                                                    
                                                />
                                                <InputGroup.Text>
                                                    <Image
                                                        className="hv-30 rounded-3"
                                                        src={Data.or}
                                                    ></Image>
                                                </InputGroup.Text>
                                               
                                            </InputGroup>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Label htmlFor="icon">Malyalam</Form.Label>
                                            <InputGroup className="my-2">
                                                <Form.Control
                                                    type="file"
                                                    name="ml"
                                                    onChange={mlhendler}
                                                    
                                                />
                                                <InputGroup.Text>
                                                    <Image
                                                        className="hv-30 rounded-3"
                                                        src={Data.ml}
                                                    ></Image>
                                                </InputGroup.Text>
                                               
                                            </InputGroup>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Label htmlFor="icon">Thumb Image</Form.Label>
                                            <InputGroup className="my-2">
                                                <Form.Control
                                                    type="file"
                                                    name="thumb_image"
                                                    onChange={thumb_imagehendler}
                                                    
                                                />
                                                <InputGroup.Text>
                                                    <Image
                                                        className="hv-30 rounded-3"
                                                        src={Data.thumb_image}
                                                    ></Image>
                                                </InputGroup.Text>
                                               
                                            </InputGroup>
                                        </Col>

                                        <Col md={2}>
                                            <Form.Label htmlFor="status" className="d-block mb-2">
                                                Status
                                            </Form.Label>
                                            <Switch
                                                checked={Data.status === 1 ? true : false}
                                                onChange={Statushendler}
                                                name="status"
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
                                    <Button variant="primary" onClick={Submite} className="me-3">Save</Button>
                                    <Link to={`/view/DL_RC_info/${params.id}`}>
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

export default Edit_RC_DL_info