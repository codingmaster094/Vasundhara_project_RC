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

var Category_array = []
const Add_Vehicale_Brand = () => {
  const token = Cookies.get("fmljwt");
  const [validated, setvalidated] = useState(false)
  const [CategoryName, setCategoryName] = useState([])
  const [is_popular, setis_popular] = useState(0)
  const [image, setimage] = useState("")
  const navigate = useNavigate()
  const [Data, setData] = useState([{
    category_id: "",
    name: "",
    title: "",
    driving_url: "",
    note: "",
  }])

  const SaveData = async (e) => {
    setData({ ...Data, [e.target.name]: e.target.value })
  }

  const Category_hendler = async (e, name) => {
    console.log('e , name', e , name)
    setData({ ...Data, [name]: e });
};

const imageHendler = async(e)=>{
  setimage(e.target.files[0])
}

  const Category_dropdown = async () => {
    const resut = await API.post("/get/vehicle/category", {} ,{headers:{Authorization:`Bearer ${token}`}});
    console.log('resut', resut.data.Data)
    Category_array = []
    Category_array.push({ label: "Select Category", value: "" })
    resut.data.data.map((val, index) => {
        Category_array.push({ label: val.name, value: val._id })
    })
    setCategoryName(Category_array)
}
  const Submite = async () => {
    if ( Data.name == undefined || Data.title == undefined || Data.driving_url == undefined || Data.note == undefined || image.length ==0) {
      setvalidated(true)
    } else {
      console.log('Data.category_id', Data.category_id)
      const Form = new FormData()
      Form.append("category_id",Data.category_id)
      Form.append("name",Data.name)
      Form.append("note",Data.note)
      Form.append("title",Data.title)
      Form.append("driving_url",Data.driving_url)
      Form.append("image",image)
      Form.append("is_popular",is_popular)
      const Result = await API.post("/add/vehicle/brand", Form, { headers: { Authorization: `Bearer ${token}` } })
      toast.success("Data Saved successfully");
      navigate("/Vehicale_Brand")
    }
  }

  useEffect(() => {
    Category_dropdown()
  }, [])
  return (
    <Layout sidebar={true}>
    <div className="page-heading">
      <h3>Vehicale Brand Add</h3>
      <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
        <Breadcrumb.Item >
          <Link to="/"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item >
          <Link to="/Vehicale_Brand">Vehicale Brand</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Create Vehicale Brand</Breadcrumb.Item>
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
                    <Form.Label htmlFor="icon">Category</Form.Label>
                    <SelectPicker
                      cleanable={false}
                      data={CategoryName}
                      searchable={false}
                      name="category_id"
                      defaultValue={""}
                      className="my-2"
                      block
                      placeholder="Select category_id"
                      onChange={(e) => Category_hendler(e, "category_id")}
                    />
                    <Form.Control.Feedback type="invalid">
                      State Code Field Is Require
                    </Form.Control.Feedback>
                  </Col>
                  <Col md={6}>
                    <Form.Label htmlFor="icon"> Name</Form.Label>
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
                  <Col md={6}>
                    <Form.Label htmlFor="icon">Driving Url</Form.Label>
                    <Form.Control
                      type="text"
                      name="driving_url"
                      // value={Data.title}
                      onChange={SaveData}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                    Driving Url Field Is Require
                    </Form.Control.Feedback>
                  </Col>
                  <Col md={12}>
                    <Form.Label htmlFor="icon">Head : Note: Headtag Given By SEO</Form.Label>
                    <Form.Control
                     as="textarea" 
                     rows={3}
                      name="note"
                      // value={Data.title}
                      onChange={SaveData}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                    Note Field Is Require
                    </Form.Control.Feedback>
                  </Col>

                  <Col md={6}>
                    <Form.Label htmlFor="icon"> Image</Form.Label>
                    <Form.Control
                      type="file"
                      name="name"
                      // value={Data.title}
                      onChange={imageHendler}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                    Image Field Is Require
                    </Form.Control.Feedback>
                  </Col>
                  <Col md={1}>
                  <Form.Label htmlFor="status" className="d-block mb-2">
                  Is Popular
                  </Form.Label>
                  <Switch
                      onChange={(checked) => { checked === true ?  setis_popular(1) : setis_popular(0) }}
                      name="is_popular"
                      checked={is_popular === 1 ? true : false}
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
                <Link to='/Vehicale_Brand'>
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

export default Add_Vehicale_Brand