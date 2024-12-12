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
const Edit_service_center = () => {
  const [Brand_Data, setBrand_Data] = useState([])
  var Payment_Data = []
  const token = Cookies.get("fmljwt");
  const params = useParams()
  const [validated, setvalidated] = useState(false)
  const [PaymentData, setPaymentData] = useState([])
  const [Type_Data, setType_Data] = useState([])
  const [BrandData, setBrandData] = useState([])
  const [CityData, setCityData] = useState([])
  const [opt, setopt] = useState([])
  const [opt2, setopt2] = useState([])
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
    featured: 0,
    type: "",
    paymentMode: "",
    sun: "",
    mon: "",
    tue: "",
    wed: "",
    thu: "",
    fri: "",
    sat: ""
  }])

  const Getview = async (Eid) => {
    const result = await API.post(`/srevice_center_get_data_ID/${params.id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
    setData({
      type: result.data.Data[0].type,
      city_id: result.data.Data[0].city_id._id,
      name: result.data.Data[0].name,
      address: result.data.Data[0].address,
      zipcode: result.data.Data[0].zipcode,
      website: result.data.Data[0].website,
      number: result.data.Data[0].number,
      email: result.data.Data[0].email,
      featured: result.data.Data[0].featured,
      paymentMode: result.data.Data[0].paymentMode,
      sun: result.data.Data[0].sun,
      mon: result.data.Data[0].mon,
      tue: result.data.Data[0].tue,
      wed: result.data.Data[0].wed,
      thu: result.data.Data[0].thu,
      fri: result.data.Data[0].fri,
      sat: result.data.Data[0].sat,
    });

    var Payment_array = []
    result.data.Data.map((val) => {
      val.paymentMode.map((val, i) => {
        Payment_Data.push({ value: val, label: val })
      })
      Payment_array.push(val._id)
    })

    const brandArray = [];
    result.data.Data.forEach((val) => {
      val.brand_id.forEach((brand) => {
        brandArray.push({ value: brand._id, label: brand.brand_name });
      });
    });
    setBrandData(brandArray);
    setPaymentData(result.data.Data[0].paymentMode)
    Type_Dropdown()
    city_dropdown()
    payment_dropdown()

  };


  useEffect(() => {
    Getview()
  }, [])


  const SaveData = async (e) => {
    setData({ ...Data, [e.target.name]: e.target.value })
  }

  const Type_Dropdown = async () => {
    const resut = [
      { label: "Car", value: 1 },
      { label: "Bike", value: 2 },
    ]
    Type_array = []
    Type_array.push({ label: "Select Type", value: "" })
    resut.map((val, index) => {
      Type_array.push({ label: val.label, value: val.value })
    })
    setType_Data(Type_array)
  }



  const city_dropdown = async () => {
    const resut = await API.post("/srevice_get_city", {}, { headers: { Authorization: `Bearer ${token}` } });
    city_array = []
    city_array.push({ label: "Select City", value: "" })
    resut.data.Data.map((val, index) => {
      city_array.push({ label: val.name, value: val._id })
    })
    setCityData(city_array)
  }

  const Brand_hendler = async (e) => {
    setBrandData(e);
  }


  const Brand_dropdown = async (e) => {
    const Form = new FormData()
    Form.append("type", e)
    const res = await API.post(`/Brand_dropdown_Data`, Form, { headers: { Authorization: `Bearer ${token}` } })
    setopt(res.data.Data)
  }

  option2 = opt.map((val) => {
    return { value: val._id, label: val.brand_name }
  })


  const payment_dropdown = async () => {
    const defaultData = [
      { label: "Cash", value: "Cash" },
      { label: "Cheque", value: "Cheque" },
      { label: "Mentioned", value: "Mentioned" },
      { label: "UPI/online", value: "UPI/online" },
    ]
    setopt2(defaultData)
  }
  option1 = opt2.map((val) => {
    return { value: val.value, label: val.label }
  })

  const Payment_hendler = async (e) => {
    setPaymentData(Array.isArray(e) ? e.map(x => x.value) : []);
  }

  const Type_Hendler = async (e, name) => {
    setData({ ...Data, [name]: e });
    Brand_dropdown(e)
    const result = await API.post(`/srevice_center_get_data_ID/${params.id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
    if (result.data.Data[0].type !== e) {
      setBrandData([])
    } else {
      const brandArray = [];
      result.data.Data.forEach((val) => {
        val.brand_id.forEach((brand) => {
          brandArray.push({ value: brand._id, label: brand.brand_name });
        });
      });
      setBrandData(brandArray);
    }


  };


  const City_Hendler = async (e, name) => {
    setData({ ...Data, [name]: e });
  };

  const Statushendler = (e) => {
    const Result = e === true ? 1 : 0;
    setData({
      type: Data.type,
      city_id: Data.city_id,
      brand_id: Data.brand_id,
      name: Data.name,
      address: Data.address,
      zipcode: Data.zipcode,
      website: Data.website,
      number: Data.number,
      email: Data.email,
      paymentMode: Data.paymentMode,
      sun: Data.sun,
      mon: Data.mon,
      tue: Data.tue,
      wed: Data.wed,
      thu: Data.thu,
      fri: Data.fri,
      sat: Data.d,
      featured: Result,
    });
  };


  const Submite = async () => {
    if (
      Data.name == "" || Data.number == "" || Data.email == "" || Data.website == "" || Data.address == "" || Data.zipcode == "" ||
      Data.sun == "" || Data.mon == "" || Data.tue == "" || Data.wed == "" || Data.thu == "" || Data.fri == "" || Data.sat == "") {
      setvalidated(true)
    } else {
      const Form = new FormData()
      Form.append("type", Data.type)
      const brand = []
      BrandData.map((val) => {
        brand.push(val.value)
      })
      Form.append("brand_id", JSON.stringify(brand))
      Form.append("city_id", Data.city_id)
      Form.append("name", Data.name)
      Form.append("number", Data.number)
      const pay = []
      PaymentData.map((val) => {
        pay.push(val)
      })
      Form.append("paymentMode", JSON.stringify(pay))
      Form.append("email", Data.email)
      Form.append("website", Data.website)
      Form.append("address", Data.address)
      Form.append("zipcode", Data.zipcode)
      Form.append("featured", Data.featured)
      Form.append("sun", Data.sun)
      Form.append("mon", Data.mon)
      Form.append("tue", Data.tue)
      Form.append("wed", Data.wed)
      Form.append("thu", Data.thu)
      Form.append("fri", Data.fri)
      Form.append("sat", Data.sat)

      const Result = await API.post(`/srevice_update_data/${params.id}`, Form, { headers: { Authorization: `Bearer ${token}` } })
      console.log('Result', Result)
      if (Result) {
        toast.success("Data Saved successfully");
        navigate(`/view/service_center/${params.id}`)
      }
    }
  }

  return (
    <Layout sidebar={true}>
      <div className="page-heading">
        <h3>Service Center Edit</h3>
        <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
          <Breadcrumb.Item >
            <Link to="/"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item >
            <Link to="/service_center">Service Center </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Edit service_center</Breadcrumb.Item>
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
                        name="type"
                        value={Data.type}
                        className="my-2"
                        block
                        placeholder="Select state_id"
                        onChange={(e) => Type_Hendler(e, "type")}
                      />
                    </Col>
                    <Col md={3}>
                      {
                        console.log('option2', option2)
                      }
                      <Form.Label htmlFor="icon">Brand Name</Form.Label>
                      <Select
                        closeMenuOnSelect={false}
                        name="brand_id"
                        value={BrandData}
                        isClearable={true}
                        placeholder="Select Brand"
                        className='customMulSelect'
                        classNamePrefix="react-select"
                        isMulti
                        onChange={Brand_hendler}
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
                        value={Data.city_id}
                        className="my-2"
                        block
                        placeholder="Select state_id"
                        onChange={(e) => City_Hendler(e, "city_id")}
                      />
                    </Col>
                    <Col md={4}>
                      <Form.Label htmlFor="icon">Center Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={Data.name}
                        onChange={SaveData}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Center Name Field Is Require
                      </Form.Control.Feedback>
                    </Col>
                    <Col md={4}>
                      <Form.Label htmlFor="icon">Center Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="number"
                        value={Data.number}
                        onChange={SaveData}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Center Number Field Is Require
                      </Form.Control.Feedback>
                    </Col>
                    <Col md={4}>
                      <Form.Label htmlFor="icon">Payment</Form.Label>
                      <Select
                        closeMenuOnSelect={false}
                        name="paymentMode"
                        defaultValue={Payment_Data}
                        isClearable={true}
                        placeholder="Select Vehicle Category"
                        className='customMulSelect'
                        classNamePrefix="react-select"
                        isMulti
                        onChange={Payment_hendler}
                        options={option1}
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Label htmlFor="icon">Center Email</Form.Label>
                      <Form.Control
                        type="text"
                        name="email"
                        value={Data.email}
                        onChange={SaveData}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Email Field Is Require
                      </Form.Control.Feedback>
                    </Col>

                    <Col md={6}>
                      <Form.Label htmlFor="icon">Center Website </Form.Label>
                      <Form.Control
                        type="text"
                        name="website"
                        value={Data.website}
                        onChange={SaveData}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Website Name Field Is Require
                      </Form.Control.Feedback>
                    </Col>



                    <Col md={8}>
                      <Form.Label htmlFor="icon">Center Address</Form.Label>
                      <Form.Control
                        type="text"
                        name="address"
                        value={Data.address}
                        onChange={SaveData}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Center Address Field Is Require
                      </Form.Control.Feedback>
                    </Col>
                    <Col md={2}>
                      <Form.Label htmlFor="icon">Center Zipcode</Form.Label>
                      <Form.Control
                        type="text"
                        name="zipcode"
                        value={Data.zipcode}
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
                        checked={Data.featured === 1 ? true : false}
                        onChange={Statushendler}
                        name="featured"
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
                        value={Data.sun}
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
                        value={Data.mon}
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
                        value={Data.tue}
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
                        value={Data.wed}
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
                        value={Data.thu}
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
                        value={Data.fri}
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
                        value={Data.sat}
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
                  <Link to={`/view/service_center/${params.id}`}>
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

export default Edit_service_center