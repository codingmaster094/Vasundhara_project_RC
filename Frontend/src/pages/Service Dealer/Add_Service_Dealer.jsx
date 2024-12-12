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
import Select from "react-select"

var option1 = []
let option2 = []
var Type_array = []
var city_array = []
const Add_Service_Dealer = () => {
  const token = Cookies.get("fmljwt");
  const [validated, setvalidated] = useState(false)
  const [PaymentData, setPaymentData] = useState([])
  const [Type_Data, setType_Data] = useState([])
  const [Brand_Data, setBrand_Data] = useState([])
  const [CityData, setCityData] = useState([])
  const [featured, setfeatured] = useState(0)
  const navigate = useNavigate()
  const [Data, setData] = useState([{
    type: "",
    city_id: "",
    brand_id: "",
    name: "",
    address: "",
    zipcode: "",
    website: "",
    number: "",
    email: "",
    featured: "",
    type: "",
    paymentMode: "",
    sun:"",
    mon: "",
    tue: "",
    wed: "",
    thu: "",
    fri: "",
    sat: ""
  }])


  useEffect(() => {
    serchoption1()
    Type_Dropdown()
    News_Headline_dropdown()
  }, [])

  const Type_Dropdown = async () => {
    const resut = [
      {label:"Car" , value:1},
      {label:"Bike" , value:2},
    ]
    Type_array = []
    Type_array.push({ label: "Select Type", value: "" })
    resut.map((val, index) => {
      console.log('val', val)
        Type_array.push({ label: val.label, value: val.value })
    })
    setType_Data(Type_array)
}

  const SaveData = async (e) => {
    setData({ ...Data, [e.target.name]: e.target.value })
    console.log('Data', Data)
  }

  const serchoption2 = async (e) => {
    option2 = []
    const From = new FormData()
    From.append("type" ,e)
    const res = await API.post("/Brand_dropdown_Data", From , { headers: { Authorization: `Bearer ${token}` } })
    console.log('res', res)
    const result1 = res.data.Data
    result1.map(x => {
        option2.push({ value: x._id, label: x.brand_name })
    })
  }

  let Brand = []
  const BrandHandler = (e) => {
    Brand = []
    e.map((val) => {
      Brand.push(val)
    })
    setBrand_Data(Brand)
  }

  const News_Headline_dropdown = async () => {
    const resut = await API.post("/srevice_get_city", {}, { headers: { Authorization: `Bearer ${token}` } });
    console.log('resut', resut.data.Data)
    city_array = []
    city_array.push({ label: "Select City", value: "" })
    resut.data.Data.map((val, index) => {
      city_array.push({ label: val.name, value: val._id })
    })
    setCityData(city_array)
  }

  
  const serchoption1 = async () => {
    const defaultData = [
      { label: "Cash", value: "Cash" },
      { label: "Cheque", value: "Cheque" },
      { label: "Mentioned", value: "Mentioned" },
      { label: "UPI/online", value: "UPI/online" },
    ]
    defaultData.map(x => {
      option1.push({ value: x.value, label: x.label })
    })
  }

  let payment = []
  const CategoryHandler = (e) => {
    payment = []
    e.map((val) => {
      payment.push(val)
    })
    setPaymentData(payment)
  }

  const Type_Hendler = async (e, name) => {
    setData({ ...Data, [name]: e });
    serchoption2(e)
  };

  const News_headline_Hendler = async (e, name) => {
    setData({ ...Data, [name]: e });
  };


  const Submite = async () => {
    if(
    Data.name== undefined ||
    Data.address== undefined ||
    Data.zipcode== undefined ||
    Data.website== undefined ||
    Data.number== undefined ||
    Data.email== undefined ||
    Data.sun == undefined ||
    Data.mon== undefined ||
    Data.tue== undefined ||
    Data.wed== undefined ||
    Data.thu== undefined ||
    Data.fri== undefined ||
    Data.sat== undefined){
      setvalidated(true)
    } else {
      const Form = new FormData()
      Form.append("type", Data.type)
      const brand = []
      Brand_Data.map((val) => {
        brand.push(val.value)
      })
      Form.append("brand_id", JSON.stringify(brand))
      Form.append("city_id", Data.city_id)
      Form.append("name", Data.name)
      Form.append("number", Data.number)
      const pay = []
      PaymentData.map((val) => {
        pay.push(val.value)
      })
      Form.append("paymentMode", JSON.stringify(pay))
      Form.append("email", Data.email)
      Form.append("website", Data.website)
      Form.append("address", Data.address)
      Form.append("zipcode", Data.zipcode)
      Form.append("featured",featured)
      Form.append("sun", Data.sun)
      Form.append("mon", Data.mon)
      Form.append("tue", Data.tue)
      Form.append("wed", Data.wed)
      Form.append("thu", Data.thu)
      Form.append("fri", Data.fri)
      Form.append("sat", Data.sat)
      
      const Result = await API.post("/srevice_create_dealer", Form, { headers: { Authorization: `Bearer ${token}` } })
      console.log('Result', Result)
      if (Result) {
        toast.success("Data Saved successfully");
        navigate("/service_Dealer")
      }
    }
  }
  return (
    <Layout sidebar={true}>
      <div className="page-heading">
        <h3>Service Dealer Add</h3>
        <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
          <Breadcrumb.Item >
            <Link to="/"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item >
            <Link to="/service_Dealer">Service Dealer </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Create service Dealer</Breadcrumb.Item>
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
                      <Form.Label htmlFor="icon">Type</Form.Label>
                      <SelectPicker
                        cleanable={false}
                        data={Type_Data}
                        searchable={false}
                        name="type  "
                        defaultValue={""}
                        className="my-2"
                        block
                        placeholder="Select state_id"
                        onChange={(e) => Type_Hendler(e, "type")}
                      />
                    </Col>
                    <Col md={3}>
                      <Form.Label htmlFor="icon">Brand Name</Form.Label>
                      <Select
                        closeMenuOnSelect={false}
                        name="brand_id"
                        defaultValue={""}
                        isClearable={true}
                        placeholder="Select Brand"
                        className='customMulSelect'
                        classNamePrefix="react-select"
                        isMulti
                        onChange={BrandHandler}
                        options={option2}
                      />
                    </Col>
                    <Col md={3}>
                      <Form.Label htmlFor="icon">City Name</Form.Label>
                      <SelectPicker
                        cleanable={false}
                        data={CityData}
                        searchable={false}
                        name="city_id"
                        defaultValue={""}
                        className="my-2"
                        block
                        placeholder="Select state_id"
                        onChange={(e) => News_headline_Hendler(e, "city_id")}
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Label htmlFor="icon">Dealer Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        // value={Data.title}
                        onChange={SaveData}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                      Dealer Name Field Is Require
                      </Form.Control.Feedback>
                    </Col>
                    <Col md={6}>
                      <Form.Label htmlFor="icon">Dealer Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="number"
                        // value={Data.title}
                        onChange={SaveData}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                      Dealer Number Field Is Require
                      </Form.Control.Feedback>
                    </Col>
                    <Col md={4}>
                      <Form.Label htmlFor="icon">Dealer Email</Form.Label>
                      <Form.Control
                        type="text"
                        name="email"
                        // value={Data.title}
                        onChange={SaveData}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Email Field Is Require
                      </Form.Control.Feedback>
                    </Col>

                    <Col md={4}>
                      <Form.Label htmlFor="icon">Dealer Website </Form.Label>
                      <Form.Control
                        type="text"
                        name="website"
                        // value={Data.title}
                        onChange={SaveData}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Website Name Field Is Require
                      </Form.Control.Feedback>
                    </Col>

                    <Col md={4}>
                      <Form.Label htmlFor="icon">Payment</Form.Label>
                      <Select
                        closeMenuOnSelect={false}
                        name="paymentMode"
                        defaultValue={""}
                        isClearable={true}
                        placeholder="Select Vehicle Category"
                        className='customMulSelect'
                        classNamePrefix="react-select"
                        isMulti
                        onChange={CategoryHandler}
                        options={option1}
                      />
                    </Col>

                    <Col md={8}>
                      <Form.Label htmlFor="icon">Dealer Address</Form.Label>
                      <Form.Control
                        type="text"
                        name="address"
                        // value={Data.title}
                        onChange={SaveData}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                      Dealer Address Field Is Require
                      </Form.Control.Feedback>
                    </Col>
                    <Col md={2}>
                      <Form.Label htmlFor="icon">Center Zipcode</Form.Label>
                      <Form.Control
                        type="text"
                        name="zipcode"
                        // value={Data.title}
                        onChange={SaveData}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                      Center Zipcode Field Is Require
                      </Form.Control.Feedback>
                    </Col>
                    <Col md={2}>
                      <Form.Label htmlFor="status" className="d-block mb-2">
                        Featured
                      </Form.Label>
                      <Switch
                        onChange={(checked) => { if (checked === true) { setfeatured(1); console.log(checked, "s-on") } else { setfeatured(0); console.log(checked, "s-off") } }}
                        name="featured"
                        checked={featured === 1 ? true : false}
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

                    <Col md={3}>
                      <Form.Label htmlFor="icon">Sunday</Form.Label>
                      <Form.Control
                        type="text"
                        name="sun"
                        // value={Data.title}
                        onChange={SaveData}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Sunday Field Is Require
                      </Form.Control.Feedback>
                    </Col>
                    <Col md={3}>
                      <Form.Label htmlFor="icon">Monday</Form.Label>
                      <Form.Control
                        type="text"
                        name="mon"
                        // value={Data.title}
                        onChange={SaveData}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Monday Field Is Require
                      </Form.Control.Feedback>
                    </Col>
                    <Col md={3}>
                      <Form.Label htmlFor="icon">Tuesday</Form.Label>
                      <Form.Control
                        type="text"
                        name="tue"
                        // value={Data.title}
                        onChange={SaveData}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Tuesday Field Is Require
                      </Form.Control.Feedback>
                    </Col>
                    <Col md={3}>
                      <Form.Label htmlFor="icon">Wednesday</Form.Label>
                      <Form.Control
                        type="text"
                        name="wed"
                        // value={Data.title}
                        onChange={SaveData}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Wednesday Field Is Require
                      </Form.Control.Feedback>
                    </Col>
                    <Col md={3}>
                      <Form.Label htmlFor="icon">Thursday</Form.Label>
                      <Form.Control
                        type="text"
                        name="thu"
                        // value={Data.title}
                        onChange={SaveData}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Thursday Field Is Require
                      </Form.Control.Feedback>
                    </Col>
                    <Col md={3}>
                      <Form.Label htmlFor="icon">Friday</Form.Label>
                      <Form.Control
                        type="text"
                        name="fri"
                        // value={Data.title}
                        onChange={SaveData}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Friday Field Is Require
                      </Form.Control.Feedback>
                    </Col>
                    <Col md={3}>
                      <Form.Label htmlFor="icon">Saturday</Form.Label>
                      <Form.Control
                        type="text"
                        name="sat"
                        // value={Data.title}
                        onChange={SaveData}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Saturday Field Is Require
                      </Form.Control.Feedback>
                    </Col>

                  </Row>
                </Card.Body>
                <Card.Footer className="text-end">
                  <Button variant="primary" onClick={Submite} className="me-3">Save</Button>
                  <Link to='/service_Dealer'>
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

export default Add_Service_Dealer