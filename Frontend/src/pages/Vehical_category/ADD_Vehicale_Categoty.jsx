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

const ADD_Vehicale_Categoty = () => {
  const token = Cookies.get("fmljwt");
  const navigate = useNavigate()
  const [validated, setvalidated] = useState(false)
  const [status, setstatus] = useState(0)
  const [thum_image, setthum_image] = useState("")
  const [Data, setData] = useState([{
    name: "",
  }])

  const image_hendler = (e) => {
    setthum_image(e.target.files[0]);
  };

  const SaveData = async (e) => {
    setData({ ...Data, [e.target.name]: e.target.value })
  }

  const Submite = async () => {
    if (Data.name == undefined || thum_image.length == 0) {
      setvalidated(true)
    } else {
      const Form = new FormData()
      Form.append("name", Data.name)
      Form.append("image", thum_image)
      Form.append("status", status)
      const Result = await API.post("/add/vehicle/category", Form, { headers: { Authorization: `Bearer ${token}` } })
      toast.success("Data Saved successfully");
      navigate("/Vehicale_Categoty")
    }
  }
  return (
    <Layout sidebar={true}>
      <div className="page-heading">
        <h3>Vehicale Category Add</h3>
        <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
          <Breadcrumb.Item >
            <Link to="/"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item >
            <Link to="/Vehicale_Categoty">Vehicale_Categoty</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Create Vehicale_Categoty</Breadcrumb.Item>
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
                      <Form.Label htmlFor="icon">Category Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        // value={Data.title}
                        onChange={SaveData}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Category Name Field Is Require
                      </Form.Control.Feedback>
                    </Col>
                    <Col md={6}>
                      <Form.Label htmlFor="icon">Thumb Image</Form.Label>
                      <Form.Control
                        type="file"
                        name="image"
                        // value={Data.title}
                        onChange={image_hendler}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Thumb Image Field Is Require
                      </Form.Control.Feedback>
                    </Col>
                    <Col md={2}>
                      <Form.Label htmlFor="status" className="d-block mb-2">
                        Status
                      </Form.Label>
                      <Switch
                      //  onChange={(checked) => { if (checked === true) { setstatus(1)} else {setstatus(0)} }}
                       onChange={(checked) => checked === true ? setstatus(1) : setstatus(0)}
                        name="status"
                        checked={status === 1 ? true : false}
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
                  <Link to='/Vehicale_Categoty'>
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

export default ADD_Vehicale_Categoty