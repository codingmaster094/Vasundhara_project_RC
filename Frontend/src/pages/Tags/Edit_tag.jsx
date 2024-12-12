import React, { useState } from "react";
import { Row, Col, Card, Button, Table, Form, InputGroup, Image, Breadcrumb } from 'react-bootstrap';
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from '../../layout/Layout';
import Switch from 'react-switch'
import { API } from "../../App";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Cookies from "js-cookie";

const Edit_tag = () => {
  const token = Cookies.get("fmljwt");
    const params = useParams()
  const [validated, setvalidated] = useState(false)
  const navigate = useNavigate()
  const [Data, setData] = useState([{
    name:"",
}])

const Getview = async (Eid) => {
    const result = await API.post(`/get_tags_ID/${params.id}` , {} , {headers: { Authorization: `Bearer ${token}` }});
    console.log('result', result)
    setData({
      _id:result.data.Data[0]._id,
      name:result.data.Data[0].name,
    });
  };

  useEffect(() => {
   Getview()
  }, [])
  


  const SaveData = async(e)=>{
    setData({...Data , [e.target.name]:e.target.value})
  }

  const Submite = async()=>{
    if(Data.name == ""){
      setvalidated(true)
    }else{
      const Result = await API.post(`/update_tags/${params.id}` , Data , {headers: { Authorization: `Bearer ${token}` }})
      if (Result) {
        toast.success("Data Update successfully");
        navigate(`/view/tag/${params.id}`)
  }
      
    }
  }

  return (
    <Layout sidebar={true}>
    <div className="page-heading">
        <h3>Tag Edit</h3>
        <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
            <Breadcrumb.Item >
                <Link to="/"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item >
                <Link to="/tag">Tag</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Create Tag</Breadcrumb.Item>
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
                                    <Form.Label htmlFor="icon">Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={Data.name}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Tag Name Field Is Require
                                    </Form.Control.Feedback>
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer className="text-end">
                            <Button variant="primary" onClick={Submite} className="me-3">Save</Button>
                            <Link to={`/view/tag/${params.id}`}>
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

export default Edit_tag