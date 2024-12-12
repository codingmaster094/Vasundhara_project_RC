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

const Edit_Key_Specification = () => {
  const params = useParams()
  const token = Cookies.get("fmljwt");
  const [validated, setvalidated] = useState(false)
  const [image, setimage] = useState("")
  const navigate = useNavigate()
  const [Data, setData] = useState([{
    name: "",
    image:""
  }])

  const SaveData = async (e) => {
    setData({ ...Data, [e.target.name]: e.target.value })
  }

const imageHendler = async(e)=>{
  setimage(e.target.files[0])
}
  const Getview = async () => {
    const result = await API.post(`/Key_specification/${params.id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
    console.log('result', result)
    setData({
      name: result.data.data.name,
      image: result.data.data.image,
    });
  };

  const Submite = async () => {
    if ( Data.name == "") {
      setvalidated(true)
    } else {
      const Form = new FormData()
      Form.append("name",Data.name)
      Form.append("image",image)
      const Result = await API.post(`/update/Key_specification/${params.id}`, Form, { headers: { Authorization: `Bearer ${token}` } })
      toast.success("Data Saved successfully");
      navigate(`/view/Key_Specification/${params.id}`)
    }
  }

  useEffect(() => {
    Getview()
  }, [])

  return (
    <Layout sidebar={true}>
    <div className="page-heading">
      <h3>Key Specification Edit</h3>
      <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
        <Breadcrumb.Item >
          <Link to="/"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item >
          <Link to="/Key_Specification">Key Specification</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Edit Key Specification</Breadcrumb.Item>
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
                      value={Data.name}
                      onChange={SaveData}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                       Name Field Is Require
                    </Form.Control.Feedback>
                  </Col>

                  <Col md={6}>
                    <Form.Label htmlFor="icon">Thumb Image</Form.Label>
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
                </Row>
              </Card.Body>
              <Card.Footer className="text-end">
                <Button variant="primary" onClick={Submite} className="me-3">Save</Button>
                <Link to={`/view/Key_Specification/${params.id}`}>
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

export default Edit_Key_Specification