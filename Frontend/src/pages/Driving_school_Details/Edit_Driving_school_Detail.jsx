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
var city_array  = []
const Edit_Driving_school_Detail = () => {
  var paymet_Data = []
  const token = Cookies.get("fmljwt");
  const params = useParams()
  const [validated, setvalidated] = useState(false)
  const [PAyment, setPAyment] = useState([])
  const [CityData, setCityData] = useState([])
  const [PaymentData, setPaymentData] = useState([])
  const [opt, setopt] = useState([])
  const [State_name_Data, setState_name_Data] = useState([])
  const navigate = useNavigate()
  const [Data, setData] = useState([{
    city_id: "",
    zip_code: "",
    name: "",
    address: "",
    contact_name: "",
    type: "",
    latitude: "",
    longitude: "",
    open_Time: "",
    close_Time: "",
    close_Days: "",
    contactNumber1: "",
    contactNumber2: "",
    establishedYear: "",
    email: "",
    website: "",
    services: "",
    sun: "",
    mon: "",
    tue: "",
    wed: "",
    thu: "",
    fri: "",
    sat: "",
  }])

  const Getview = async (Eid) => {
    const result = await API.post(`/Get_details_ID/${params.id}` , {} , {headers: { Authorization: `Bearer ${token}` }});
    console.log('result', result)
    setData({
      city_id:result.data.Data[0].city_id._id,
      zip_code: result.data.Data[0].zip_code,
      name: result.data.Data[0].name,
      address: result.data.Data[0].address,
      contact_name: result.data.Data[0].contact_name,
      type: result.data.Data[0].type,
      latitude: result.data.Data[0].latitude,
      longitude: result.data.Data[0].longitude,
      open_Time: result.data.Data[0].open_Time,
      close_Time: result.data.Data[0].close_Time,
      close_Days: result.data.Data[0].close_Days,
      contactNumber1: result.data.Data[0].contactNumber1,
      contactNumber2: result.data.Data[0].contactNumber2,
      establishedYear: result.data.Data[0].establishedYear,
      email: result.data.Data[0].email,
      website: result.data.Data[0].website,
      services: result.data.Data[0].services,
      sun: result.data.Data[0].sun,
      mon: result.data.Data[0].mon,
      tue: result.data.Data[0].tue,
      wed: result.data.Data[0].wed,
      thu: result.data.Data[0].thu,
      fri: result.data.Data[0].fri,
      sat: result.data.Data[0].sat,

    });
    serchoption1()
    var Payment_new_array = []
        result.data.Data.map((val) => {
            val.paymentMode.map((val, i) => {
              paymet_Data.push({ value: val, label: val})
            })
            Payment_new_array.push(val._id)
        })
        setPAyment(result.data.Data[0].paymentMode)
  };

  const News_Headline_dropdown = async () => {
    const resut = await API.post("/get_city", {} ,{headers:{Authorization:`Bearer ${token}`}});
    console.log('resut', resut.data.Data)
    city_array = []
    city_array.push({ label: "Select City", value: "" })
    resut.data.Data.map((val, index) => {
        city_array.push({ label: val.city_name, value: val._id })
    })
    setCityData(city_array)
  }
  const serchoption1 = async () => {
    const defaultData = [
     {label:"Cash",value:"Cash"},
     {label:"Cheque",value:"Cheque"},
     {label:"Mentioned",value:"Mentioned"},
     {label:"UPI/online",value:"UPI/online"},
    ]
     defaultData.map(x => {
         option1.push({ value: x.value, label: x.label })
     })
 }
 
 const payment_dropdown = async()=>{
  const defaultData = [
    {label:"Cash",value:"Cash"},
    {label:"Cheque",value:"Cheque"},
    {label:"Mentioned",value:"Mentioned"},
    {label:"UPI/online",value:"UPI/online"},
   ]
    setopt(defaultData)
}
option1 = opt.map((val) => {
  return { value: val.value, label: val.label }
})

  const SaveData = async (e) => {
    setData({ ...Data, [e.target.name]: e.target.value })
  }

  const News_headline_Hendler = async (e, name) => {
    setData({ ...Data, [name]: e });
};

  const Submite = async () => {
    if (Data.zip_code == "" || Data.name == "" || Data.address == "" ||Data.contact_name == "" ||
      Data.type == "" ||Data.latitude == "" || Data.longitude == "" ||Data.open_Time == "" ||
      Data.close_Time == "" ||Data.close_Days == "" ||Data.contactNumber1 == "" ||Data.contactNumber2 == "" ||
      Data.establishedYear == "" || Data.email == "" ||Data.website == "" ||Data.services == "" ||
      Data.sun == "" ||Data.mon == "" ||Data.tue == "" ||Data.wed == "" ||Data.thu == "" ||
      Data.fri == undefined ||Data.sat == undefined) {
      setvalidated(true)
    } else {
      const Form = new FormData()
      Form.append("city_id",Data.city_id)  
      Form.append("zip_code",Data.zip_code)
      Form.append("name",Data.name)
      Form.append("address",Data.address)
      Form.append("contact_name",Data.contact_name)
      Form.append("type",Data.type)
      Form.append("latitude",Data.latitude)
      Form.append("longitude",Data.longitude)
      Form.append("open_Time",Data.open_Time)
      Form.append("close_Time",Data.close_Time)
      Form.append("close_Days",Data.close_Days)
      Form.append("contactNumber1",Data.contactNumber1)
      Form.append("contactNumber2",Data.contactNumber2)
      Form.append("establishedYear",Data.establishedYear)
      Form.append("email",Data.email)
      Form.append("website",Data.website)
      Form.append("services",Data.services)
      Form.append("sun",Data.sun)
      Form.append("mon",Data.mon)
      Form.append("tue",Data.tue)
      Form.append("wed",Data.wed)
      Form.append("thu",Data.thu)
      Form.append("fri",Data.fri)
      Form.append("sat",Data.sat)
      const pay = []
      PaymentData.map((val)=>{
        pay.push(val)
      }) 
      Form.append("paymentMode",JSON.stringify(pay))
      const Result = await API.post(`/Update_details/${params.id}`, Form, { headers: { Authorization: `Bearer ${token}` } })
      if(Result){
        toast.success("Data Update successfully");
        navigate(`/View/driving_Detail/${params.id}`)
      }
    }
  }
  const CategoryHandler =async(e)=>{
    setPaymentData(Array.isArray(e) ? e.map(x => x.value) : []);
  }

  useEffect(() => {
    payment_dropdown()
    News_Headline_dropdown()
    Getview()
  }, [])
  return (
    <Layout sidebar={true}>
      {console.log('params', params)}
    <div className="page-heading">
      <h3>Driving School Detail Edit</h3>
      <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
        <Breadcrumb.Item >
          <Link to="/"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item >
          <Link to="/driving_Detail">Driving School Details</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Edit Driving School Details</Breadcrumb.Item>
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
                    onChange={(e) => News_headline_Hendler(e, "city_id")}
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Label htmlFor="icon">Zip Code</Form.Label>
                    <Form.Control
                      type="text"
                      name="zip_code"
                      value={Data.zip_code}
                      onChange={SaveData}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                    Zip Code Field Is Require
                    </Form.Control.Feedback>
                  </Col>
                  <Col md={6}>
                    <Form.Label htmlFor="icon">Driving School Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={Data.name}
                      onChange={SaveData}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                    Driving School Name Field Is Require
                    </Form.Control.Feedback>
                  </Col>
                  <Col md={6}>
                    <Form.Label htmlFor="icon">Driving School Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={Data.address}
                      onChange={SaveData}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                    Driving School Address Field Is Require
                    </Form.Control.Feedback>
                  </Col>
                  <Col md={4}>
                    <Form.Label htmlFor="icon">Contact Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="contact_name"
                      value={Data.contact_name}
                      onChange={SaveData}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                    Contact Name Field Is Require
                    </Form.Control.Feedback>
                  </Col>
                  <Col md={2}>
                    <Form.Label htmlFor="icon">Type</Form.Label>
                    <Form.Control
                      type="text"
                      name="type"
                      value={Data.type}
                      onChange={SaveData}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                    Type Field Is Require
                    </Form.Control.Feedback>
                  </Col>
                  <Col md={3}>
                    <Form.Label htmlFor="icon">Latitude</Form.Label>
                    <Form.Control
                      type="text"
                      name="latitude"
                      value={Data.latitude}
                      onChange={SaveData}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                    Latitude Field Is Require
                    </Form.Control.Feedback>
                  </Col>
                  <Col md={3}>
                    <Form.Label htmlFor="icon">Longitude</Form.Label>
                    <Form.Control
                      type="text"
                      name="longitude"
                      value={Data.longitude}
                      onChange={SaveData}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                    Longitude Field Is Require
                    </Form.Control.Feedback>
                  </Col>
                  <Col md={2}>
                    <Form.Label htmlFor="icon">Open Time</Form.Label>
                    <Form.Control
                      type="time"
                      name="open_Time"
                      value={Data.open_Time}
                      onChange={SaveData}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                    Open Time Field Is Require
                    </Form.Control.Feedback>
                  </Col>
                  <Col md={2}>
                    <Form.Label htmlFor="icon">Close Time</Form.Label>
                    <Form.Control
                      type="time"
                      name="close_Time"
                      value={Data.close_Time}
                      onChange={SaveData}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                    Close Time Field Is Require
                    </Form.Control.Feedback>
                  </Col>
                  <Col md={2}>
                    <Form.Label htmlFor="icon">Close Days</Form.Label>
                    <Form.Control
                      type="text"
                      name="close_Days"
                      value={Data.close_Days}
                      onChange={SaveData}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                    Close Days Field Is Require
                    </Form.Control.Feedback>
                  </Col>
                  <Col md={3}>
                    <Form.Label htmlFor="icon">Contact Number1</Form.Label>
                    <Form.Control
                      type="text"
                      name="contactNumber1"
                      value={Data.contactNumber1}
                      onChange={SaveData}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                    Contact Number1 Field Is Require
                    </Form.Control.Feedback>
                  </Col>
                  <Col md={3}>
                    <Form.Label htmlFor="icon">Contact Number2</Form.Label>
                    <Form.Control
                      type="text"
                      name="contactNumber2"
                      value={Data.contactNumber2}
                      onChange={SaveData}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                    Contact Number2 Field Is Require
                    </Form.Control.Feedback>
                  </Col>

                  <Col md={4}>
                    <Form.Label htmlFor="icon">Payment</Form.Label>
                    <Select
                      closeMenuOnSelect={false}
                      name="paymentMode"
                      defaultValue={paymet_Data}
                      isClearable={true}
                      placeholder="Select Vehicle Category"
                      className='customMulSelect'
                      classNamePrefix="react-select"
                      isMulti
                      onChange={CategoryHandler}
                      options={option1}
                    />
                  </Col>
                  <Col md={2}>
                    <Form.Label htmlFor="icon">Established Year</Form.Label>
                    <Form.Control
                      type="text"
                      name="establishedYear"
                      value={Data.establishedYear}
                      onChange={SaveData}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                    Established Year Field Is Require
                    </Form.Control.Feedback>
                  </Col>
                  <Col md={6}>
                    <Form.Label htmlFor="icon">Email</Form.Label>
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
                    <Form.Label htmlFor="icon">Website Name</Form.Label>
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
                  <Col md={12}>
                    <Form.Label htmlFor="icon">Service</Form.Label>
                    <Form.Control
                      type="text"
                      name="services"
                      value={Data.services}
                      onChange={SaveData}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                    Service Field Is Require
                    </Form.Control.Feedback>
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
                <Link to={`/View/driving_Detail/${params.id}`}>
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

export default Edit_Driving_school_Detail