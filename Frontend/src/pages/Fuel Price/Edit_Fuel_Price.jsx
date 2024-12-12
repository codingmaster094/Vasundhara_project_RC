import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Table, Form, Breadcrumb } from 'react-bootstrap';
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from '../../layout/Layout';
import { API } from "../../App";
import { toast } from "react-toastify";
import { SelectPicker } from "rsuite";
import Cookies from "js-cookie";

var StateNAmeArray = []
const Edit_Fuel_Price = () => {
  const params = useParams()
  const token = Cookies.get("fmljwt");
  const [validated, setvalidated] = useState(false)
  const [Sate_nameData, setSate_nameData] = useState([])
  const navigate = useNavigate()
  const [Data, setData] = useState([{
    petrol_price: "",
    diesel_price: "",
    cng_price: "",
    lpg_price: "",
  }])

  const SaveData = async (e) => {
    setData({ ...Data, [e.target.name]: e.target.value })
  }

  const State_name_dropdown = async () => {
    const Result = await API.post("/get_Fuel_state", {}, { headers: { Authorization: `Bearer ${token}` } })
    console.log('Result', Result)
    StateNAmeArray = []
    StateNAmeArray.push({ label: "Select Categories", value: "", role: "" })
    Result.data.map((val) => {
      StateNAmeArray.push({ label: val.state, value: val._id })
    })
    setSate_nameData(StateNAmeArray)
  }

  const CategoryHendler = async (e, name) => {
    setData({ ...Data, [name]: e });
  };

  const Getview = async (Eid) => {
    const result = await API.post(`/get_Fuel_price_ID/${params.id}` , {} , {headers: { Authorization: `Bearer ${token}` }});
    console.log('result', result)
    setData({
      petrol_price:result.data.Data[0].petrol_price,
      diesel_price:result.data.Data[0].diesel_price,
      lpg_price:result.data.Data[0].lpg_price,
      cng_price:result.data.Data[0].cng_price,
    });
    State_name_dropdown()
  };

  useEffect(() => {
    Getview()
  }, [])

  const Submite = async () => {
    if (Data.petrol_price == '' ||  Data.diesel_price == "" ||  Data.cng_price == "" ||  Data.lpg_price == "") {
      setvalidated(true)
    } else {
      const Result = await API.post(`/update_Fuel_price/${params.id}`, Data, { headers: { Authorization: `Bearer ${token}` } })
      toast.success("Data Update successfully");
      navigate(`/View/fuel/price/${params.id}`)
    }
  }
  return (
    <Layout sidebar={true}>
    <div className="page-heading">
      <h3>Fuel Price Edit</h3>
      <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
        <Breadcrumb.Item >
          <Link to="/"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item >
          <Link to="/Traffic_rule">Fuel Price</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Edit Fuel Price</Breadcrumb.Item>
      </Breadcrumb>
    </div>

    <div className="page-content">
      <Form noValidate validated={validated}>
        <Row>
          <Col xs={12}>
            <Card className="mb-4">
              <Card.Body>
                <Row>
                  <Col md={3}>
                    <Form.Label htmlFor="icon">Petrol Price</Form.Label>
                    <Form.Control
                      type="text"
                      name="petrol_price"
                      value={Data.petrol_price}
                      onChange={SaveData}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      petrol_price Is Require
                    </Form.Control.Feedback>
                  </Col>

                  <Col md={3}>
                    <Form.Label htmlFor="icon">Diesel Price</Form.Label>
                    <Form.Control
                      type="text"
                      name="diesel_price"
                      value={Data.diesel_price}
                      onChange={SaveData}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      diesel_price Field Is Require
                    </Form.Control.Feedback>
                  </Col>

                  <Col md={3}>
                    <Form.Label htmlFor="icon">CNG Price</Form.Label>
                    <Form.Control
                      type="text"
                      name="cng_price"
                      value={Data.cng_price}
                      onChange={SaveData}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      cng_price Field Is Require
                    </Form.Control.Feedback>
                  </Col>

                  <Col md={3}>
                    <Form.Label htmlFor="icon">LPG Price</Form.Label>
                    <Form.Control
                      type="text"
                      name="lpg_price"
                      value={Data.lpg_price}
                      onChange={SaveData}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      lpg_price Field Is Require
                    </Form.Control.Feedback>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer className="text-end">
                <Button variant="primary" onClick={Submite} className="me-3">Save</Button>
                <Link to={`/View/fuel/price/${params.id}`}>
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

export default Edit_Fuel_Price