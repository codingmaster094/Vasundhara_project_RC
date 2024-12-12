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
const View_Driving_school_Detail = () => {
  const token = Cookies.get("fmljwt");
  const navigate = useNavigate();
  const params = useParams();
  const [variableData, setvariableData] = useState([]);
  const [id, setid] = useState({ _id: params.id });
  const [Data, SetData] = useState({
    _id:"",
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
    S_id:""

  });
  const [DropDropValue, setDropDropValue] = useState([])
  const Dropdown_Name = async()=>{
      const Result = await API.post("/get_details" ,{},{headers: { Authorization: `Bearer ${token}` }})
      console.log('Result', Result)
      DropDownArr = []
      reloadId = []
      Result.data.Data.map((val,i)=>{
          DropDownArr.push({label:val.city_id.city_name , value:val._id})
          reloadId.push(val._id)
      })
      setDropDropValue(DropDownArr)
  }

  const Getview = async (Eid) => {
      const result = await API.post(`/Get_details_ID/${Eid !== "" ? Eid : id._id}` , {} , {headers: { Authorization: `Bearer ${token}` }});
      console.log('result', result)
      SetData({
        _id:result.data.Data[0]._id,
        city_id: result.data.Data[0].city_id.city_name,
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
        S_id:result.data.Data[0].city_id._id
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
           const result =  await API.post("/delete_details", formdata , {headers: { Authorization: `Bearer ${token}` }});
            if(reloadId.length === 0){
              // window.location.replace(`http://localhost:3000/driving_Detail`)
              window.location.replace(`${process.env.REACT_APP_BASE_URL}driving_Detail`)
            }else{
              // window.location.replace(`http://localhost:3000/view/driving_Detail/${reloadId[0]}`)
              window.location.replace(`${process.env.REACT_APP_BASE_URL}view/driving_Detail/${reloadId[0]}`)
            }
          }else{
            count = 10
            clearInterval(swalCountdownInterval)
          }
        });
    };
  return (
    <Layout sidebar={true}>
    <div className="page-heading">
        <h3><Link to="/driving_Detail" className='btn btn-primary btn-icon-lg me-3'><i className='bx bxs-left-arrow-alt'></i></Link>View Driving School Details</h3>
        <div className="page-heading-right">
            <SelectPicker data={DropDropValue} defaultValue={id._id} cleanable={false} className="wv-200 my-1 ms-3" onChange={(e) => selectpickerData(e)} placeholder="Select Categories" placement="bottomEnd" />
            <Link to={`/Edit/driving_Detail/${id._id}`}>
                <Button variant="primary ms-3 my-1" value="edit">Edit</Button>
            </Link>
            <Button variant="danger ms-3 my-1 btn-icon-lg" type="button" onClick={(i) => Deleteproject()}><i className="bx bx-trash-alt"></i></Button>
        </div>
    </div>
    <div className='page-content'>
        <Card>
            <Card.Body>
                <Row>
                    <Col md={4}>
                        <div className='mb-4'>
                            <p className='mb-0 fw-bold'>City Name</p><span>{Data.city_id}</span>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className='mb-4'>
                            <p className='mb-0 fw-bold'>Zip-Code</p><span>{Data.zip_code}</span>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className='mb-4'>
                            <p className='mb-0 fw-bold'>Driving School Name</p><span>{Data.name}</span>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className='mb-4'>
                            <p className='mb-0 fw-bold'>Address</p><span>{Data.address}</span>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className='mb-4'>
                            <p className='mb-0 fw-bold'>Contect Info</p>
                            <span>{
                              `
                              ${Data.contactNumber1} , 
                              ${Data.contactNumber2}
                              `
                              }</span>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className='mb-4'>
                            <p className='mb-0 fw-bold'>Website</p>
                            <span>
                            <a href={Data.website} target="_blank" >
                                <Button variant="outline-info" size="sm" className="btn-icon">
                                  <i className="bx bx-link-external"></i>
                                </Button>
                              </a>  
                            </span>
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    </div>
</Layout>
  )
}

export default View_Driving_school_Detail