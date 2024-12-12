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

var News_Headline_Array = []
const Add_Driving_school_city = () => {
  const token = Cookies.get("fmljwt");
  const [validated, setvalidated] = useState(false)
  const [State_name_Data, setState_name_Data] = useState([])
  const navigate = useNavigate()
  const [Data, setData] = useState([{
    state_id: "",
    city_name: "",
  }])

  const SaveData = async (e) => {
    setData({ ...Data, [e.target.name]: e.target.value })
  }

  const News_headline_Hendler = async (e, name) => {
    setData({ ...Data, [name]: e });
};

  const News_Headline_dropdown = async () => {
    const resut = await API.post("/get_state", {} ,{headers:{Authorization:`Bearer ${token}`}});
    console.log('resut', resut.data.Data)
    News_Headline_Array = []
    News_Headline_Array.push({ label: "Select State", value: "" })
    resut.data.Data.map((val, index) => {
        News_Headline_Array.push({ label: `${val.state_code + "-" +val.state_name}`, value: val._id })
    })
    setState_name_Data(News_Headline_Array)
}
  const Submite = async () => {
    if ( Data.city_name == undefined) {
      setvalidated(true)
    } else {
      const Result = await API.post("/create_city", Data, { headers: { Authorization: `Bearer ${token}` } })
      toast.success("Data Saved successfully");
      navigate("/driving")
    }
  }

  useEffect(() => {
    News_Headline_dropdown()
  }, [])
  
  return (
    <Layout sidebar={true}>
      <div className="page-heading">
        <h3>Driving School City Add</h3>
        <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
          <Breadcrumb.Item >
            <Link to="/"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item >
            <Link to="/driving_city">Driving School City</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Create Driving School City</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="page-content">
        <Form noValidate validated={validated}>
          <Row>
            <Col xs={12}>
              <Card className="mb-4">
                <Card.Body>
                  <Row>
                    <Col md={4}>
                      <Form.Label htmlFor="icon">State Name</Form.Label>
                      <SelectPicker
                        cleanable={false}
                        data={State_name_Data}
                        searchable={false}
                        name="state_id"
                        defaultValue={""}
                        className="my-2"
                        block
                        placeholder="Select state_id"
                        onChange={(e) => News_headline_Hendler(e, "state_id")}
                      />
                      <Form.Control.Feedback type="invalid">
                        State Code Field Is Require
                      </Form.Control.Feedback>
                    </Col>
                    <Col md={4}>
                      <Form.Label htmlFor="icon">City Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="city_name"
                        // value={Data.title}
                        onChange={SaveData}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        City Name Field Is Require
                      </Form.Control.Feedback>
                    </Col>
                    <Col md={4}>
                      <Form.Label htmlFor="icon">Other Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="state_name"
                        // value={Data.title}
                        // onChange={SaveData}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Other Name Field Is Require
                      </Form.Control.Feedback>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer className="text-end">
                  <Button variant="primary" onClick={Submite} className="me-3">Save</Button>
                  <Link to='/driving_city'>
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

export default Add_Driving_school_city