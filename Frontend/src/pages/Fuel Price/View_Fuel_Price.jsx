import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Col, Row } from "react-bootstrap";
import Layout from '../../layout/Layout';
import { SelectPicker } from 'rsuite';
import Fancybox from "../../Component/FancyBox";
import { API } from '../../App';
import $ from "jquery";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

var DropDownArr = []
var reloadId = [];
const View_Fuel_Price = () => {
  const token = Cookies.get("fmljwt");
  const params = useParams();
  const [id, setid] = useState({ _id: params.id });
  const [Data, SetData] = useState({
    _id:"",
    state: "",
    city: "",
    petrol_price: "",
    diesel_price: "",
    cng_price: "",
    lpg_price: "",
    date: "",
  });
  const [DropDropValue, setDropDropValue] = useState([])
  const Dropdown_Name = async()=>{
      const Result = await API.post("/get_Fuel_price" ,{},{headers: { Authorization: `Bearer ${token}` }})
      console.log(Result)
      DropDownArr = []
      reloadId = []
      Result.data.Data.map((val,i)=>{
          DropDownArr.push({label:val.state.state , value:val._id})
          reloadId.push(val._id)
      })
      setDropDropValue(DropDownArr)
  }

  const Getview = async (Eid) => {
      const result = await API.post(`/get_Fuel_price_ID/${Eid !== "" ? Eid : id._id}` , {} , {headers: { Authorization: `Bearer ${token}` }});
      console.log('result', result)
      SetData({
        _id:result.data.Data[0]._id,
        state:result.data.Data[0].state.state,
        city:result.data.Data[0].city.city,
        petrol_price:result.data.Data[0].petrol_price,
        diesel_price:result.data.Data[0].diesel_price,
        lpg_price:result.data.Data[0].lpg_price,
        cng_price:result.data.Data[0].cng_price,
        date:result.data.Data[0].date,
        
      });
    };

    const selectpickerData = (e) => {
      setid({ _id: e });
      Getview(e);
    };

  useEffect(() => {
      Dropdown_Name()
      Getview("")
  }, [])
  return (
    <Layout sidebar={true}>
    <div className="page-heading">
        <h3><Link to="/fuel/price" className='btn btn-primary btn-icon-lg me-3'><i className='bx bxs-left-arrow-alt'></i></Link>View Driving School State</h3>
        <div className="page-heading-right">
            <SelectPicker data={DropDropValue} defaultValue={id._id} cleanable={false} className="wv-200 my-1 ms-3" onChange={(e) => selectpickerData(e)} placeholder="Select Categories" placement="bottomEnd" />
            <Link to={`/Edit/fuel/price/${id._id}`}>
                <Button variant="primary ms-3 my-1" value="edit">Edit</Button>
            </Link>
        </div>
    </div>
    <div className='page-content'>
        <Card>
            <Card.Body>
                <Row>
                    <Col md={4}>
                        <div className='mb-4'>
                            <p className='mb-0 fw-bold'>State Name</p><span>{Data.state}</span>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className='mb-4'>
                            <p className='mb-0 fw-bold'>City Name</p><span>{Data.city}</span>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className='mb-4'>
                            <p className='mb-0 fw-bold'>petrol Price</p><span>{Data.petrol_price}</span>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className='mb-4'>
                            <p className='mb-0 fw-bold'>Disel price</p><span>{Data.diesel_price}</span>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className='mb-4'>
                            <p className='mb-0 fw-bold'>CNG price</p><span>{Data.cng_price}</span>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className='mb-4'>
                            <p className='mb-0 fw-bold'>LPG Price</p><span>{Data.lpg_price}</span>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className='mb-4'>
                            <p className='mb-0 fw-bold'>Date</p><span>{Data.date}</span>
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    </div>
</Layout>
  )
}

export default View_Fuel_Price