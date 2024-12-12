import React, { useState } from "react";
import { Row, Col, Card, Button, Table, Form, InputGroup, Image, Breadcrumb } from 'react-bootstrap';
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from '../../layout/Layout';
import Switch from 'react-switch'
import { API } from "../../App";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Cookies from "js-cookie";

const Add_Driving_school_state = () => {
  const token = Cookies.get("fmljwt");
  const [validated, setvalidated] = useState(false)
  const navigate = useNavigate()
  const [Data, setData] = useState([{
    state_code:"",
    state_name:"",
}])

  const SaveData = async(e)=>{
    setData({...Data , [e.target.name]:e.target.value})
  }

  const Submite = async()=>{
    if(Data.state_code == undefined || Data.state_name == undefined ){
      setvalidated(true)
    }else{
      const Result = await API.post("/create_state" , Data ,  {headers: { Authorization: `Bearer ${token}` }})
        toast.success("Data Saved successfully");
      navigate("/driving")
    }
  }
  return (
    <Layout sidebar={true}>
    <div className="page-heading">
        <h3>Driving School State Add</h3>
        <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
            <Breadcrumb.Item >
                <Link to="/"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item >
                <Link to="/driving">Driving School State</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Create Driving School State</Breadcrumb.Item>
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
                            </Row>
                        </Card.Body>
                        <Card.Footer className="text-end">
                            <Button variant="primary" onClick={Submite} className="me-3">Save</Button>
                            <Link to='/driving'>
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

export default Add_Driving_school_state