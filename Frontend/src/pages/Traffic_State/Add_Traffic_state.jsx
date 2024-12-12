import React, { useState } from "react";
import { Row, Col, Card, Button, Form, Breadcrumb } from 'react-bootstrap';
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from '../../layout/Layout';
import { API } from "../../App";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const Add_Traffic_state = () => {
  const token = Cookies.get("fmljwt");
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
    disclaimer_hi:"",
    disclaimer_pa:"",
    disclaimer_ta:"",
    disclaimer_te:"",
    disclaimer_ml:"",
    disclaimer_kn:"",
    disclaimer_bn:"",
    disclaimer_or:"",
}])

  const SaveData = async(e)=>{
    setData({...Data , [e.target.name]:e.target.value})
  }

  const Submite = async()=>{
    if(Data.state_code == undefined || Data.state_name == undefined || Data.title == undefined ||
      Data.title_gu == undefined || Data.title_hi == undefined || Data.title_mr == undefined || Data.title_pa == undefined || Data.title_ta == undefined || Data.title_te == undefined ||Data.title_ml == undefined ||Data.title_kn == undefined || Data.title_bn == undefined || Data.title_or == undefined ||
      Data.sub_title_gu == undefined || Data.sub_title_hi == undefined || Data.sub_title_mr == undefined || Data.sub_title_pa == undefined || Data.sub_title_ta == undefined || Data.sub_title_te == undefined ||Data.sub_title_ml == undefined ||Data.sub_title_kn == undefined || Data.sub_title_bn == undefined || Data.sub_title_or == undefined ||
      Data.content_gu == undefined || Data.content_hi == undefined || Data.content_mr == undefined || Data.content_pa == undefined || Data.content_ta == undefined || Data.content_te == undefined ||Data.content_ml == undefined ||Data.content_kn == undefined || Data.content_bn == undefined || Data.content_or == undefined ||
      Data.disclaimer_gu == undefined || Data.disclaimer_hi == undefined || Data.disclaimer_mr == undefined || Data.disclaimer_pa == undefined || Data.disclaimer_ta == undefined || Data.disclaimer_te == undefined ||Data.disclaimer_ml == undefined ||Data.disclaimer_kn == undefined || Data.disclaimer_bn == undefined || Data.disclaimer_or == undefined 
      ){
      setvalidated(true)
    }else{
      const Result = await API.post("/create_Traffic_state" , Data ,  {headers: { Authorization: `Bearer ${token}` }})
        toast.success("Data Saved successfully");
        navigate("/Traffic_state")
    }
  }
  return (
    <Layout sidebar={true}>
    <div className="page-heading">
        <h3>Traffic State Add</h3>
        <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
            <Breadcrumb.Item >
                <Link to="/"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item >
                <Link to="/Traffic_state">Traffic State</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Create Traffic State</Breadcrumb.Item>
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
                                        // value={Data.title}
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
                                        // value={Data.title}
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
                                        // value={Data.title}
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
                                        // value={Data.title}
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
                                        // value={Data.title}
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
                                        // value={Data.title}
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
                                        // value={Data.title}
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
                                        // value={Data.title}
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
                                        // value={Data.title}
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
                                        // value={Data.title}
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
                                        // value={Data.title}
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
                                        // value={Data.title}
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
                                        // value={Data.title}
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
                                        // value={Data.title}
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
                                        // value={Data.title}
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
                                        // value={Data.title}
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
                                        // value={Data.title}
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
                                        // value={Data.title}
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
                                        // value={Data.title}
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
                                        // value={Data.title}
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
                                        // value={Data.title}
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
                                        // value={Data.title}
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
                                        // value={Data.title}
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
                                        // value={Data.title}
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
                                        // value={Data.title}
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
                                        // value={Data.title}
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
                                        // value={Data.title}
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
                                        // value={Data.title}
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
                                        // value={Data.title}
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
                                        // value={Data.title}
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
                                        // value={Data.title}
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
                                        // value={Data.title}
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
                                        // value={Data.title}
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
                                        // value={Data.title}
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
                                        // value={Data.title}
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
                                        // value={Data.title}
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
                                        // value={Data.title}
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
                                        // value={Data.title}
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
                                        // value={Data.title}
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
                                        // value={Data.title}
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
                                        // value={Data.title}
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
                                        // value={Data.title}
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
                                        // value={Data.title}
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
                                        // value={Data.title}
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
                                        // value={Data.title}
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
                                        // value={Data.title}
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
                            <Link to='/Traffic_state'>
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

export default Add_Traffic_state