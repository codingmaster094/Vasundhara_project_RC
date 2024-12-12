import React, { useState } from "react";
import { Row, Col, Card, Button, Table, Form, InputGroup, Image, Breadcrumb } from 'react-bootstrap';
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from '../../layout/Layout';
import Switch from 'react-switch'
import { API } from "../../App";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { SelectPicker } from "rsuite";

const Add_Key_Specification = () => {
  const token = Cookies.get("fmljwt");
  const [validated, setvalidated] = useState(false)
  const [image, setimage] = useState("")
  const navigate = useNavigate()
  const [Data, setData] = useState([{
    name: "",
  }])

  const SaveData = async (e) => {
    setData({ ...Data, [e.target.name]: e.target.value })
  }

const imageHendler = async(e)=>{
  setimage(e.target.files[0])
}

  const Submite = async () => {
    if ( Data.name == undefined || image.length ==0) {
      setvalidated(true)
    } else {
      const Form = new FormData()
      Form.append("name",Data.name)
      Form.append("image",image)
      const Result = await API.post("/add/Key_specification", Form, { headers: { Authorization: `Bearer ${token}` } })
      toast.success("Data Saved successfully");
      navigate("/Key_Specification")
    }
  }

  return (
    <Layout sidebar={true}>
    <div className="page-heading">
      <h3>Key Specification Add</h3>
      <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
        <Breadcrumb.Item >
          <Link to="/"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item >
          <Link to="/Key_Specification">Key Specification</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Create Key Specification</Breadcrumb.Item>
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
                    <Form.Label htmlFor="icon"> Category Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      // value={Data.title}
                      onChange={SaveData}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                       Name Field Is Require
                    </Form.Control.Feedback>
                  </Col>

                  <Col md={6}>
                    <Form.Label htmlFor="icon">Thumb Image</Form.Label>
                    <Form.Control
                      type="file"
                      name="image"
                      // value={Data.title}
                      onChange={imageHendler}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                    Image Field Is Require
                    </Form.Control.Feedback>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer className="text-end">
                <Button variant="primary" onClick={Submite} className="me-3">Save</Button>
                <Link to='/Key_Specification'>
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

export default Add_Key_Specification