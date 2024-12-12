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
const View_Service_Dealer = () => {
  const token = Cookies.get("fmljwt");
  const navigate = useNavigate();
  const params = useParams();
  const [BRAND, setBRAND] = useState([])
  const [id, setid] = useState({ _id: params.id });
  const [Data, SetData] = useState({
    _id:"",
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
    sat: "",
  });
  const [DropDropValue, setDropDropValue] = useState([])
  const Dropdown_Name = async()=>{
      const Result = await API.post("/srevice_center_get_dealer" ,{},{headers: { Authorization: `Bearer ${token}` }})
      DropDownArr = []
      reloadId = []
      Result.data.Data.map((val,i)=>{
        console.log('val', val)
          DropDownArr.push({label:val?.city_id.name , value:val._id})
          reloadId.push(val._id)
      })
      setDropDropValue(DropDownArr)
  }

  const Getview = async (Eid) => {
      const result = await API.post(`/srevice_center_get_dealer_ID/${Eid !== "" ? Eid : id._id}` , {} , {headers: { Authorization: `Bearer ${token}` }});
      console.log('result', result)
      SetData({
        _id:result.data.Data[0]._id,
        city_id: result.data.Data[0].city_id.name,
        brand_id: result.data.Data[0].brand_id.brand_name,
        name: result.data.Data[0].name,
        address: result.data.Data[0].address,
        zipcode: result.data.Data[0].zipcode,
        website: result.data.Data[0].website,
        number: result.data.Data[0].number,
        email: result.data.Data[0].email,
        featured: result.data.Data[0].featured,
        paymentMode: result.data.Data[0].paymentMode,
        sun:result.data.Data[0].sun,
        mon: result.data.Data[0].mon,
        tue: result.data.Data[0].tue,
        wed: result.data.Data[0].wed,
        thu: result.data.Data[0].thu,
        fri: result.data.Data[0].fri,
        sat: result.data.Data[0].sat,
      });
      var brand_Data = []
    result?.data?.Data[0].brand_id?.map((val) => {
            brand_Data.push(val.brand_name)
      })
      setBRAND(brand_Data)

    };

    const selectpickerData = (e) => {
      setid({ _id: e });
      Getview(e);
    };

  useEffect(() => {
      Dropdown_Name()
      Getview("")
  }, [])


  let count = 10
  let swalCountdownInterval
  const Deleteproject = async (id) => {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-danger btn-lg counter",
          cancelButton: "btn btn-primary btn-lg me-3",
        },
        buttonsStyling: false,
      });
  
      swalWithBootstrapButtons
        .fire({
          title: "Are you sure you want to delete?",
          text: "You won't be able to revert this!",
          imageUrl: '../../icon/alert.svg',
          imageWidth: 80,
          imageHeight: 80,
          confirmButtonText: "OK (10)",
          cancelButtonText: "Cancel",
          showCancelButton: true,
          reverseButtons: true,
          didOpen: () => {
            $(".swal2-confirm").attr('disabled',true);
            swalCountdownInterval = setInterval(function(){
              count--
              if( count<1){
                $(".counter").text(`OK`)
                $(".swal2-confirm").attr('disabled',false);
                clearInterval(swalCountdownInterval)
              }else{
                $(".counter").text(`OK (${count})`)
              }
            }, 1000);
          }
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            const ind = reloadId.indexOf(Data._id)
            reloadId.splice(ind,1)
            const formdata = new FormData()
            formdata.append("id" , Data._id)
           const result =  await API.post("/srevice_delete_dealer", formdata , {headers: { Authorization: `Bearer ${token}` }});
            if(reloadId.length === 0){
              // window.location.replace(`http://localhost:3000/service_Dealer`)
              window.location.replace(`${process.env.REACT_APP_BASE_URL}service_Dealer`)
            }else{
              // window.location.replace(`http://localhost:3000/view/service_Dealer/${reloadId[0]}`)
              window.location.replace(`${process.env.REACT_APP_BASE_URL}view/service_Dealer/${reloadId[0]}`)
            }
          }else{
            count = 10
            clearInterval(swalCountdownInterval)
          }
        });
    };
  return (
    <Layout sidebar={true}>
      {console.log('Data.type_id', Data.type_id)}
    <div className="page-heading">
        <h3><Link to="/service_Dealer" className='btn btn-primary btn-icon-lg me-3'><i className='bx bxs-left-arrow-alt'></i></Link>View Service Dealer</h3>
        <div className="page-heading-right">
            <SelectPicker data={DropDropValue} defaultValue={id._id} cleanable={false} className="wv-200 my-1 ms-3" onChange={(e) => selectpickerData(e)} placeholder="Select Center Name" placement="bottomEnd" />
            <Link to={`/Edit/service_Dealer/${id._id}`}>
                <Button variant="primary ms-3 my-1" value="edit">Edit</Button>
            </Link>
            <Button variant="danger ms-3 my-1 btn-icon-lg" type="button" onClick={(i) => Deleteproject()}><i className="bx bx-trash-alt"></i></Button>
        </div>
    </div>
    <div className='page-content'>
      {console.log('Data', Data)}
        <Card>
            <Card.Body>
                <Row>
                    <Col md={4}>
                        <div className='mb-4'>
                        <p className='mb-0 fw-bold'>Category</p><span>{BRAND.length !== 0 ? BRAND.toString() : "-"}</span>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className='mb-4'>
                            <p className='mb-0 fw-bold'>City Name</p><span>{Data.city_id}</span>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className='mb-4'>
                            <p className='mb-0 fw-bold'>Dealer Name</p><span>{Data.name}</span>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className='mb-4'>
                            <p className='mb-0 fw-bold'>Address</p><span>{Data.address}</span>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className='mb-4'>
                            <p className='mb-0 fw-bold'>Dealer Contect</p>
                            <span>{Data.number}</span>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className='mb-4'>
                            <p className='mb-0 fw-bold'>Dealer Website</p>
                            <span>
                            <a href={Data.website} target="_blank" >
                                <Button variant="outline-info" size="sm" className="btn-icon">
                                  <i className="bx bx-link-external"></i>
                                </Button>
                              </a>  
                            </span>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className='mb-4'>
                            <p className='mb-0 fw-bold'>Dealer Email</p>
                            <span>{Data.email}</span>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className='mb-4'>
                            <p className='mb-0 fw-bold'>Featured</p>
                            <span>{Data.featured == 1 ? "On" : "Off"}</span>
                        </div>
                    </Col>  
                </Row>
            </Card.Body>
        </Card>
    </div>
</Layout>
  )
}

export default View_Service_Dealer