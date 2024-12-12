import React, { useState } from "react";
import { Row, Col, Card, Button, Table, Form, InputGroup, Image, Breadcrumb } from 'react-bootstrap';
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from '../../layout/Layout';
import Switch from 'react-switch'
import { API } from "../../App";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Cookies from "js-cookie";

const Edit_Driving_school_state = () => {
  const token = Cookies.get("fmljwt");
  const params = useParams()
  const [validated, setvalidated] = useState(false)
  const navigate = useNavigate()
  const [Data, setData] = useState([{
    state_code:"",
    state_name:"",
}])

  const SaveData = async(e)=>{
    setData({...Data , [e.target.name]:e.target.value})
  }

  const Getview = async (Eid) => {
    const result = await API.post(`/get_state_ID/${params.id}` , {} , {headers: { Authorization: `Bearer ${token}` }});
    console.log('result', result)
    setData({
      state_code:result.data.Data[0].state_code,
      state_name:result.data.Data[0].state_name,
    });
  };

  useEffect(() => {
    Getview()
}, [])

  const Submite = async()=>{
    if(Data.state_code == "" || Data.state_name == "" ){
      setvalidated(true)
    }else{
      const Result = await API.post(`/Update_state/${params.id}` , Data ,  {headers: { Authorization: `Bearer ${token}` }})
        toast.success("Data Saved successfully");
      navigate(`/View/driving/${params.id}`)
    }
  }
  return (
    <Layout sidebar={true}>
    <div className="page-heading">
        <h3>Driving School State Edit</h3>
        <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
            <Breadcrumb.Item >
                <Link to="/"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item >
                <Link to="/driving">Driving School State</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Edit Driving School State</Breadcrumb.Item>
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
                            </Row>
                        </Card.Body>
                        <Card.Footer className="text-end">
                            <Button variant="primary" onClick={Submite} className="me-3">Save</Button>
                            <Link to={`/View/driving/${params.id}`}>
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

export default Edit_Driving_school_state