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

var Type_Array = []
const Edit_service_center_brand = () => {
  const token = Cookies.get("fmljwt");
  const params = useParams()
  const [validated, setvalidated] = useState(false)
  const [Type_Data, setType_Data] = useState([])
  const navigate = useNavigate()
  const [brand_image, setbrand_image] = useState("")
  const [Data, setData] = useState([{
    type: "",
    brand_name: "",
    brand_slug: "",
    brand_image: "",
    type:""
  }])

  const image_hendler = (e) => {
    setbrand_image(e.target.files[0]);
  };

  const SaveData = async (e) => {
    setData({ ...Data, [e.target.name]: e.target.value })
  }

  const Type_dropdown = async () => {
    const resut = [
      { label: "Car", value: 1 },
      { label: "Bike", value: 2 },
    ]
    Type_Array = []
    Type_Array.push({ label: "Select Type", value: "" })
    resut.map((val, index) => {
      console.log('val', val)
      Type_Array.push({ label: val.label, value: val.value })
    })
    setType_Data(Type_Array)
  }


  const Getview = async () => {
    const result = await API.post(`/srevice_get_brand_ID/${params.id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
    console.log('result', result)
    setData({
      brand_name: result.data.Data[0].brand_name,
      brand_slug: result.data.Data[0].brand_slug,
      brand_image: result.data.Data[0].brand_image,
      type: result.data.Data[0].type,
    });
    Type_dropdown()
  };

  useEffect(() => {
    Getview()
  }, [])

  const type_hendler = async (e, name) => {
    setData({ ...Data, [name]: e });
  };

  const Submite = async () => {
    if (Data.brand_name == "" || Data.brand_slug == "") {
      setvalidated(true)
    } else {
      const Form = new FormData()
      Form.append("type", Data.type)
      Form.append("brand_image", brand_image)
      Form.append("brand_name", Data.brand_name)
      Form.append("brand_slug", Data.brand_slug)
      const Result = await API.post(`/srevice_update_brand/${params.id}`, Form, { headers: { Authorization: `Bearer ${token}` } })
      toast.success("Data Update successfully");
      navigate(`/View/service_brand/${params.id}`)
    }
  }
  return (
    <Layout sidebar={true}>
      <div className="page-heading">
        <h3>Service Center brand Edit</h3>
        <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
          <Breadcrumb.Item >
            <Link to="/"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item >
            <Link to="/service_brand">Service Center brand</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Edit Service Center brand</Breadcrumb.Item>
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
                      <Form.Label htmlFor="icon">Brand Type</Form.Label>
                      <SelectPicker
                        cleanable={false}
                        data={Type_Data}
                        searchable={false}
                        name="type"
                        value={Data.type}
                        className="my-2"
                        block
                        placeholder="Select state_id"
                        onChange={(e) => type_hendler(e, "type")}
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Label htmlFor="icon">Brand Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="brand_name"
                        value={Data.brand_name}
                        onChange={SaveData}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Brand Name Field Is Require
                      </Form.Control.Feedback>
                    </Col>
                    <Col md={6}>
                      <Form.Label htmlFor="icon">Brand Slug</Form.Label>
                      <Form.Control
                        type="text"
                        name="brand_slug"
                        value={Data.brand_slug}
                        onChange={SaveData}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Brand Slug Field Is Require
                      </Form.Control.Feedback>
                    </Col>

                    <Col md={6}>
                      <Form.Label htmlFor="icon">Brand Image</Form.Label>
                      <InputGroup className="my-2">
                        <Form.Control
                          type="file"
                          name="brand_image"
                          onChange={image_hendler}

                        />
                        <InputGroup.Text>
                          <Image
                            className="hv-30 rounded-3"
                            src={Data.brand_image}
                          ></Image>
                        </InputGroup.Text>
                      </InputGroup>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer className="text-end">
                  <Button variant="primary" onClick={Submite} className="me-3">Save</Button>
                  <Link to={`/View/service_brand/${params.id}`}>
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

export default Edit_service_center_brand