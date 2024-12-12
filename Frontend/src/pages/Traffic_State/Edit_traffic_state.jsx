import React, { useState } from "react";
import { Row, Col, Card, Button, Form, Breadcrumb } from 'react-bootstrap';
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from '../../layout/Layout';
import { API } from "../../App";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Cookies from "js-cookie";

const Edit_traffic_state = () => {
  const token = Cookies.get("fmljwt");
  const params = useParams()
  const [validated, setvalidated] = useState(false)
  const navigate = useNavigate()
  const [Data, setData] = useState([{
    state_code:"",
    state_name:"",
    title:"",
    title_gu:"",
    title_hi:"",
    title_mr:"",
    title_pa:"",
    title_ta:"",
    title_te:"",
    title_ml:"",
    title_kn:"",
    title_bn:"",
    title_or:"",
    sub_title:"",
    sub_title_gu:"",
    sub_title_hi:"",
    sub_title_mr:"",
    sub_title_pa:"",
    sub_title_ta:"",
    sub_title_te:"",
    sub_title_ml:"",
    sub_title_kn:"",
    sub_title_bn:"",
    sub_title_or:"",
    content:"",
    content_gu:"",
    content_hi:"",
    content_mr:"",
    content_pa:"",
    content_ta:"",
    content_te:"",
    content_ml:"",
    content_kn:"",
    content_bn:"",
    content_or:"",
    disclaimer:"", 
    disclaimer_gu:"",
    disclaimer_mr:"",
    disclaimer_hi:"",
    disclaimer_pa:"",
    disclaimer_ta:"",
    disclaimer_te:"",
    disclaimer_ml:"",
    disclaimer_kn:"",
    disclaimer_bn:"",
    disclaimer_or:"",
}])

const Getview = async (Eid) => {
    const result = await API.post(`/get_Traffic_state_ID/${params.id}` , {} , {headers: { Authorization: `Bearer ${token}` }});
    console.log('result', result)
    setData({
      _id:result.data.Data[0]._id,
      state_code:result.data.Data[0].state_code,
      state_name:result.data.Data[0].state_name,
      title:result.data.Data[0].title,
      title_gu:result.data.Data[0].title_gu,
      title_hi:result.data.Data[0].title_hi,
      title_mr:result.data.Data[0].title_mr,
      title_pa:result.data.Data[0].title_pa,
      title_ta:result.data.Data[0].title_ta,
      title_te:result.data.Data[0].title_te,
      title_ml:result.data.Data[0].title_ml,
      title_kn:result.data.Data[0].title_kn,
      title_bn:result.data.Data[0].title_bn,
      title_or:result.data.Data[0].title_or,
      sub_title:result.data.Data[0].sub_title,
      sub_title_gu:result.data.Data[0].sub_title_gu,
      sub_title_hi:result.data.Data[0].sub_title_hi,
      sub_title_mr:result.data.Data[0].sub_title_mr,
      sub_title_pa:result.data.Data[0].sub_title_pa,
      sub_title_ta:result.data.Data[0].sub_title_ta,
      sub_title_te:result.data.Data[0].title_te,
      sub_title_ml:result.data.Data[0].sub_title_ml,
      sub_title_kn:result.data.Data[0].sub_title_kn,
      sub_title_bn:result.data.Data[0].sub_title_bn,
      sub_title_or:result.data.Data[0].sub_title_or,
      content:result.data.Data[0].content,
      content_gu:result.data.Data[0].content_gu,
      content_hi:result.data.Data[0].content_hi,
      content_mr:result.data.Data[0].content_mr,
      content_pa:result.data.Data[0].content_pa,
      content_ta:result.data.Data[0].content_ta,
      content_te:result.data.Data[0].content_te,
      content_ml:result.data.Data[0].content_ml,
      content_kn:result.data.Data[0].content_kn,
      content_bn:result.data.Data[0].content_bn,
      content_or:result.data.Data[0].content_or,
      disclaimer:result.data.Data[0].disclaimer, 
      disclaimer_gu:result.data.Data[0].disclaimer_gu,
      disclaimer_hi:result.data.Data[0].disclaimer_hi,
      disclaimer_mr:result.data.Data[0].disclaimer_mr,
      disclaimer_pa:result.data.Data[0].disclaimer_pa,
      disclaimer_ta:result.data.Data[0].disclaimer_ta,
      disclaimer_te:result.data.Data[0].disclaimer_te,
      disclaimer_ml:result.data.Data[0].disclaimer_ml,
      disclaimer_kn:result.data.Data[0].disclaimer_kn,
      disclaimer_bn:result.data.Data[0].disclaimer_bn,
      disclaimer_or:result.data.Data[0].disclaimer_or,
    });
  };

  useEffect(() => {
   Getview()
  }, [])
  
  const SaveData = async(e)=>{
    setData({...Data , [e.target.name]:e.target.value})
  }

  const Submite = async()=>{
    if(Data.state_code == "" || Data.state_name == "" || Data.title == "" ||
      Data.title_gu == "" || Data.title_hi == "" || Data.title_mr == "" || Data.title_pa == "" || Data.title_ta == "" || Data.title_te == "" ||Data.title_ml == "" ||Data.title_kn == "" || Data.title_bn == "" || Data.title_or == "" ||
      Data.sub_title_gu == "" || Data.sub_title_hi == "" || Data.sub_title_mr == "" || Data.sub_title_pa == "" || Data.sub_title_ta == "" || Data.sub_title_te == "" ||Data.sub_title_ml == "" ||Data.sub_title_kn == "" || Data.sub_title_bn == "" || Data.sub_title_or == "" ||
      Data.content_gu == "" || Data.content_hi == "" || Data.content_mr == "" || Data.content_pa == "" || Data.content_ta == "" || Data.content_te == "" ||Data.content_ml == "" ||Data.content_kn == "" || Data.content_bn == "" || Data.content_or == "" ||
      Data.disclaimer_gu == "" || Data.disclaimer_hi == "" || Data.disclaimer_mr == "" || Data.disclaimer_pa == "" || Data.disclaimer_ta == "" || Data.disclaimer_te == "" ||Data.disclaimer_ml == "" ||Data.disclaimer_kn == "" || Data.disclaimer_bn == "" || Data.disclaimer_or == "" 
      ){
      setvalidated(true)
    }else{
      const Result = await API.post(`/update_Traffic_state/${params.id}` , Data , {headers: { Authorization: `Bearer ${token}` }})
      if (Result) {
        toast.success("Data Update successfully");
        navigate(`/view/Traffic_state/${params.id}`)
  }
      
    }
  }
  return (
    <Layout sidebar={true}>
    <div className="page-heading">
        <h3>Traffic State Edit</h3>
        <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
            <Breadcrumb.Item >
                <Link to="/"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item >
                <Link to="/Traffic_state">Traffic State</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Edit Traffic State</Breadcrumb.Item>
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
                                    <Form.Label htmlFor="icon">State Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="state_code"
                                        value={Data.state_code}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    State Code Field Is Require
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={6}>
                                    <Form.Label htmlFor="icon">State Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="state_name"
                                        value={Data.state_name}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    State Name Field Is Require
                                    </Form.Control.Feedback>
                                </Col>
                                {/* ******************************************* */}
                                <Col md={12}>
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
                                    <Form.Label htmlFor="icon">Bengali</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title_bn"
                                        value={Data.title_bn}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Bengali Field Is Require
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="icon">Gujarati</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title_gu"
                                        value={Data.title_gu}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Gujarati Field Is Require
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="icon">Hindi</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title_hi"
                                        value={Data.title_hi}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Hindi Field Is Require
                                    </Form.Control.Feedback>
                                </Col>

                                <Col md={4}>
                                    <Form.Label htmlFor="icon">Kannad</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title_kn"
                                        value={Data.title_kn}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Kannad Field Is Require
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="icon">Malyalam</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title_ml"
                                        value={Data.title_ml}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Malyalam Field Is Require
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="icon">Marathi</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title_mr"
                                        value={Data.title_mr}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Marathi Field Is Require
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="icon">Odia</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title_or"
                                        value={Data.title_or}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Odia Field Is Require
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="icon">Punjabi</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title_pa"
                                        value={Data.title_pa}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Punjabi Field Is Require
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="icon">Tamil</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title_ta"
                                        value={Data.title_ta}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Tamil Field Is Require
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="icon">Telugu</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title_te"
                                        value={Data.title_te}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Telugu Field Is Require
                                    </Form.Control.Feedback>
                                </Col>

                                {/* ******************************************* */}

                                <Col md={12}>
                                    <Form.Label htmlFor="icon">Sub-Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="sub_title"
                                        value={Data.sub_title}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Sub-Title Field Is Require
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="icon">Bengali</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="sub_title_bn"
                                        value={Data.sub_title_bn}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Bengali Field Is Require
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="icon">Gujarati</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="sub_title_gu"
                                        value={Data.sub_title_gu}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Gujarati Field Is Require
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="icon">Hindi</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="sub_title_hi"
                                        value={Data.sub_title_hi}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Hindi Field Is Require
                                    </Form.Control.Feedback>
                                </Col>

                                <Col md={4}>
                                    <Form.Label htmlFor="icon">Kannad</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="sub_title_kn"
                                        value={Data.sub_title_kn}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Kannad Field Is Require
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="icon">Malyalam</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="sub_title_ml"
                                        value={Data.sub_title_ml}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Malyalam Field Is Require
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="icon">Marathi</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="sub_title_mr"
                                        value={Data.sub_title_mr}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Marathi Field Is Require
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="icon">Odia</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="sub_title_or"
                                        value={Data.sub_title_or}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Odia Field Is Require
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="icon">Punjabi</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="sub_title_pa"
                                        value={Data.sub_title_pa}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Punjabi Field Is Require
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="icon">Tamil</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="sub_title_ta"
                                        value={Data.sub_title_ta}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Tamil Field Is Require
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="icon">Telugu</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="sub_title_te"
                                        value={Data.sub_title_te}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Telugu Field Is Require
                                    </Form.Control.Feedback>
                                </Col>

                                {/* ******************************************* */}

                                <Col md={12}>
                                    <Form.Label htmlFor="icon">Content</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="content"
                                        value={Data.content}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Content Field Is Require
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="icon">Bengali</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="content_bn"
                                        value={Data.content_bn}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Bengali Field Is Require
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="icon">Gujarati</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="content_gu"
                                        value={Data.content_gu}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Gujarati Field Is Require
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="icon">Hindi</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="content_hi"
                                        value={Data.content_hi}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Hindi Field Is Require
                                    </Form.Control.Feedback>
                                </Col>

                                <Col md={4}>
                                    <Form.Label htmlFor="icon">Kannad</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="content_kn"
                                        value={Data.content_kn}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Kannad Field Is Require
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="icon">Malyalam</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="content_ml"
                                        value={Data.content_ml}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Malyalam Field Is Require
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="icon">Marathi</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="content_mr"
                                        value={Data.content_mr}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Marathi Field Is Require
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="icon">Odia</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="content_or"
                                        value={Data.content_or}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Odia Field Is Require
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="icon">Punjabi</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="content_pa"
                                        value={Data.content_pa}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Punjabi Field Is Require
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="icon">Tamil</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="content_ta"
                                        value={Data.content_ta}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Tamil Field Is Require
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="icon">Telugu</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="content_te"
                                        value={Data.content_te}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Telugu Field Is Require
                                    </Form.Control.Feedback>
                                </Col>
                                {/* ******************************************* */}

                                <Col md={12}>
                                    <Form.Label htmlFor="icon">Disclaimer</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="disclaimer"
                                        value={Data.disclaimer}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Disclaimer Field Is Require
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="icon">Bengali</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="disclaimer_bn"
                                        value={Data.disclaimer_bn}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Bengali Field Is Require
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="icon">Gujarati</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="disclaimer_gu"
                                        value={Data.disclaimer_gu}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Gujarati Field Is Require
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="icon">Hindi</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="disclaimer_hi"
                                        value={Data.disclaimer_hi}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Hindi Field Is Require
                                    </Form.Control.Feedback>
                                </Col>

                                <Col md={4}>
                                    <Form.Label htmlFor="icon">Kannad</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="disclaimer_kn"
                                        value={Data.disclaimer_kn}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Kannad Field Is Require
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="icon">Malyalam</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="disclaimer_ml"
                                        value={Data.disclaimer_ml}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Malyalam Field Is Require
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="icon">Marathi</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="disclaimer_mr"
                                        value={Data.disclaimer_mr}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Marathi Field Is Require
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="icon">Odia</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="disclaimer_or"
                                        value={Data.disclaimer_or}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Odia Field Is Require
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="icon">Punjabi</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="disclaimer_pa"
                                        value={Data.disclaimer_pa}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Punjabi Field Is Require
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="icon">Tamil</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="disclaimer_ta"
                                        value={Data.disclaimer_ta}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Tamil Field Is Require
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="icon">Telugu</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="disclaimer_te"
                                        value={Data.disclaimer_te}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Telugu Field Is Require
                                    </Form.Control.Feedback>
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer className="text-end">
                            <Button variant="primary" onClick={Submite} className="me-3">Save</Button>
                            <Link to={`/view/Traffic_state/${params.id}`}>
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

export default Edit_traffic_state