import React, { useState } from "react";
import { Row, Col, Card, Button, Table, Form, InputGroup, Image, Breadcrumb } from 'react-bootstrap';
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from '../../layout/Layout';
import Switch from 'react-switch'
import { API } from "../../App";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Cookies from "js-cookie";

const Add_service_state = () => {
  const token = Cookies.get("fmljwt");
  const [validated, setvalidated] = useState(false)
  const navigate = useNavigate()
  const [Data, setData] = useState([{
    name:"",
}])

  const SaveData = async(e)=>{
    setData({...Data , [e.target.name]:e.target.value})
  }

  const Submite = async()=>{
    if(Data.name == undefined){
      setvalidated(true)
    }else{
      const Result = await API.post("/srevice_create_state" , Data ,  {headers: { Authorization: `Bearer ${token}` }})
        toast.success("Data Saved successfully");
      navigate("/service_state")
    }
  }
  return (
    <Layout sidebar={true}>
    <div className="page-heading">
        <h3>Service Center State Add</h3>
        <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
            <Breadcrumb.Item >
                <Link to="/"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item >
                <Link to="/service_state">Service Center State</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Create Service Center</Breadcrumb.Item>
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
                                    <Form.Label htmlFor="icon">State Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
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
                            <Link to='/service_state'>
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

export default Add_service_state