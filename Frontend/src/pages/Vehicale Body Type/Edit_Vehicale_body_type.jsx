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
import Fancybox from "../../Component/FancyBox";

var Category_array = []
const Edit_Vehicale_body_type = () => {
  const token = Cookies.get("fmljwt");
  const params = useParams()
  const [validated, setvalidated] = useState(false)
  const [CategoryName, setCategoryName] = useState([])
  const [is_popular, setis_popular] = useState(0)
  const [image, setimage] = useState("")
  const navigate = useNavigate()
  const [Data, setData] = useState([{
    category_id: "",
    name: "",
    iamge:"",
    status:0
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

const status_hendler = async(e)=>{
  console.log('e', e)
  const Result = e === true ? 1 : 0;
  setData({
      category_id: Data.category_id,
      name: Data.name,
      image:Data.image,
      status:Result
  });
}

  const Category_dropdown = async () => {
    const resut = await API.post("/get/vehicle/category", {} ,{headers:{Authorization:`Bearer ${token}`}});
    Category_array = []
    Category_array.push({ label: "Select Category", value: "" })
    resut.data.data.map((val, index) => {
        Category_array.push({ label: val.name, value: val._id })
    })
    setCategoryName(Category_array)
}

const Getview = async (Eid) => {
  const result = await API.post(`/vehicle/bodytype/${params.id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
  console.log('result', result)
  setData({
    category_id: result.data.data.category_id._id, 
    name: result.data.data.name,
    image: result.data.data.image,
    status: result.data.data.status,
  });
  Category_dropdown()
};

  const Submite = async () => {
    if ( Data.name == "" ) {
      setvalidated(true)
    } else {
      const Form = new FormData()
      Form.append("category_id",Data.category_id)
      Form.append("name",Data.name)
      Form.append("image",image)
      Form.append("status",Data.status)
      const Result = await API.post(`/update/vehicle/bodytype/${params.id}`, Form, { headers: { Authorization: `Bearer ${token}` } })
      toast.success("Data Update successfully");
      navigate(`/view/Vehicale_body_type/${params.id}`)
    }
  }

  useEffect(() => {
    Getview()
  }, [])
  return (
    <Layout sidebar={true}>
    <div className="page-heading">
      <h3>Vehicale Body Type Edit</h3>
      <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
        <Breadcrumb.Item >
          <Link to="/"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item >
          <Link to="/Vehicale_body_type">Vehicale Body Type</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Edit Vehicale Body Type</Breadcrumb.Item>
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
                      value={Data.category_id}
                      className="my-2"
                      block
                      placeholder="Select category_id"
                      onChange={(e) => Category_hendler(e, "category_id")}
                    />
                    <Form.Control.Feedback type="invalid">
                      Category Field Is Require
                    </Form.Control.Feedback>
                  </Col>
                  <Col md={6}>
                    <Form.Label htmlFor="icon"> Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={Data.name}
                      onChange={SaveData}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                       Name Field Is Require
                    </Form.Control.Feedback>
                  </Col>

                  <Col md={6}>
                    <Form.Label htmlFor="icon"> Image</Form.Label>
                   <InputGroup className="my-2">
                      <Form.Control type="file"name="image" onChange={imageHendler}  />
                      <InputGroup.Text className="p-0">
                          <Fancybox>
                              <a data-fancybox="gallery" href={Data.image}>
                                  <img src={Data.image} className="hv-40 rounded-3" alt="" />
                              </a>
                          </Fancybox>
                      </InputGroup.Text>
                  </InputGroup>
                  </Col>
                  <Col md={1}>
                  <Form.Label htmlFor="status" className="d-block mb-2">
                  Status
                  </Form.Label>
                  <Switch
                      onChange={status_hendler}
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
                <Link to={`/view/Vehicale_body_type/${params.id}`}>
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

export default Edit_Vehicale_body_type