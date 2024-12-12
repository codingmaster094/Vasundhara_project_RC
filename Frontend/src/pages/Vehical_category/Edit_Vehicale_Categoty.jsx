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

const Edit_Vehicale_Categoty = () => {
  const token = Cookies.get("fmljwt");
  const navigate = useNavigate();
  const params = useParams();
  const [validated, setvalidated] = useState(false)
  const [status, setstatus] = useState(0)
  const [thum_image, setthum_image] = useState("")
  const [Data, setData] = useState({
    name: "",
    image: "",
    status: ""
  });

  const Getview = async (Eid) => {
    const result = await API.post(`/vehicle/category/${params.id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
    console.log('result', result)
    setData({
      name: result.data.data.name,
      image: result.data.data.image,
      status: result.data.data.status,
    });
  };

  useEffect(() => {
    Getview()
  }, [])


  const image_hendler = (e) => {
    setthum_image(e.target.files[0]);
  };

  const SaveData = async (e) => {
    setData({ ...Data, [e.target.name]: e.target.value })
  }

  const statushendler = (e) => {
    const Result = e === true ? 1 : 0;
    setData({
        name:Data.name,
        image:Data.image, 
        status:Result
    });
  };

  const Submite = async () => {
    if (Data.name == "") {
      setvalidated(true)
    } else {
      const Form = new FormData()
      Form.append("name", Data.name)
      Form.append("image", thum_image)
      Form.append("status", Data.status)
      const Result = await API.post(`/update/vehicle/category/${params.id}`, Form, { headers: { Authorization: `Bearer ${token}` } })
      toast.success("Data Saved successfully");
      navigate(`/view/Vehicale_Categoty/${params.id}`)
    }
  }
  return (
    <Layout sidebar={true}>
      <div className="page-heading">
        <h3>Vehicale Category Edit</h3>
        <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
          <Breadcrumb.Item >
            <Link to="/"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item >
            <Link to="/Vehicale_Categoty">vehicale Category</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Edit vehicale Category</Breadcrumb.Item>
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
                        value={Data.name}
                        onChange={SaveData}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Category Name Field Is Require
                      </Form.Control.Feedback>
                    </Col>
                    <Col md={6}>
                      <Form.Label htmlFor="icon">Thumb Image</Form.Label>
                      <InputGroup className="my-2">
                        <Form.Control
                          type="file"
                          name="image"
                          onChange={image_hendler}

                        />
                        <InputGroup.Text>
                          <Image
                            className="hv-30 rounded-3"
                            src={Data.image}
                          ></Image>
                        </InputGroup.Text>
                      </InputGroup>
                    </Col>
                    <Col md={2}>
                      <Form.Label htmlFor="status" className="d-block mb-2">
                        Status
                      </Form.Label>
                      <Switch
                        onChange={statushendler}
                        name="status"
                        checked={Data.status === 1 ? true : false}
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
                  <Link to={`/view/Vehicale_Categoty/${params.id}`}>
                    <Button variant="secondary">Cancle</Button>
                  </Link>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Form>
      </div>
    </Layout >
  )
}

export default Edit_Vehicale_Categoty