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


var DropDownName = []
var reloadId = [];
const View_RC_DL_info = () => {
    const token = Cookies.get("fmljwt");
    const params = useParams();
    const [DropDropValue, setDropDropValue] = useState([])
    const [id, setid] = useState({ _id: params.id });
    const [Data, SetData] = useState({
      _id:"",
      type: "",
      title: "",
      en: "",
      hi: "",
      mr: "",
      gu: "",
      kn: "",
      ta: "",
      te: "",
      bn: "",
      ml: "",
      or: "",
      pa: "",
      thumb_image: "",
      status: "",
    });
    const Dropdown_Name = async()=>{
        const Result = await API.post("/Get_RC_DL_information" ,{},{headers: { Authorization: `Bearer ${token}` }})
        DropDownName = []
        reloadId = []
        // DropDownName.push({label:"Select Title" , value:"" })
        Result.data.Data.map((val,i)=>{
            DropDownName.push({label:val.title , value:val._id})
            reloadId.push(val._id)
        })
        setDropDropValue(DropDownName)
    }

    const Getview = async (Eid) => {
        const result = await API.post(`/Get_RC_DL_information_ID/${Eid !== "" ? Eid : id._id}` , {} , {headers: { Authorization: `Bearer ${token}` }});
        SetData({
          _id:result.data.Data[0]._id,
          type: result.data.Data[0].type,
          title: result.data.Data[0].title,
          en: result.data.Data[0].en,
          hi: result.data.Data[0].hi,
          mr: result.data.Data[0].mr,
          gu: result.data.Data[0].gu,
          kn: result.data.Data[0].kn,
          ta: result.data.Data[0].ta,
          te: result.data.Data[0].te,
          bn: result.data.Data[0].bn,
          ml: result.data.Data[0].ml,
          or: result.data.Data[0].or,
          pa: result.data.Data[0].pa,
          thumb_image: result.data.Data[0].thumb_image,
          status: result.data.Data[0].status,
        });
        Dropdown_Name()
      };

      const selectpickerData = (e) => {
        setid({ _id: e });
        Getview(e);
      };

    useEffect(() => {
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
             const result =  await API.post("/Delete_RC_DL_information", formdata , {headers: { Authorization: `Bearer ${token}` }});
              if(reloadId.length === 0){
                // window.location.replace(`http://localhost:3000/DL_RC_info`)
                window.location.replace(`${process.env.REACT_APP_BASE_URL}DL_RC_info`)
              }else{
                // window.location.replace(`http://localhost:3000/view/DL_RC_info/${reloadId[0]}`)
                window.location.replace(`${process.env.REACT_APP_BASE_URL}view/DL_RC_info/${reloadId[0]}`)
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
                <h3><Link to="/DL_RC_info" className='btn btn-primary btn-icon-lg me-3'><i className='bx bxs-left-arrow-alt'></i></Link>View RC/DL </h3>
                <div className="page-heading-right">
                    <SelectPicker data={DropDropValue} defaultValue={id._id} cleanable={false} className="wv-200 my-1 ms-3" onChange={(e) => selectpickerData(e)} placeholder="Select Categories" placement="bottomEnd" />
                    <Link to={`/Edit/DL_RC_info/${id._id}`}>
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
                                    <p className='mb-0 fw-bold'>Type</p><span>{Data.type}</span>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Title</p><span>{Data.title}</span>
                                </div>
                            </Col>
                            <Col md={4}>
                            <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>English</p>
                                    <span><a href={Data.en} target="_blank" >
                                    <Button variant="outline-info" size="sm" className="btn-icon">
                                        <i className="bx bx-link-external"></i>
                                    </Button>
                                </a></span>
                                </div> 
                            </Col>
                             <Col md={4}>
                            <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Hindi</p>
                                    <span><a href={Data.hi} target="_blank" >
                                    <Button variant="outline-info" size="sm" className="btn-icon">
                                        <i className="bx bx-link-external"></i>
                                    </Button>
                                </a></span>
                                </div> 
                            </Col>
                             <Col md={4}>
                            <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Marathi</p>
                                    <span><a href={Data.mr} target="_blank" >
                                    <Button variant="outline-info" size="sm" className="btn-icon">
                                        <i className="bx bx-link-external"></i>
                                    </Button>
                                </a></span>
                                </div> 
                            </Col>
                             <Col md={4}>
                            <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Gujarati</p>
                                    <span><a href={Data.gu} target="_blank" >
                                    <Button variant="outline-info" size="sm" className="btn-icon">
                                        <i className="bx bx-link-external"></i>
                                    </Button>
                                </a></span>
                                </div> 
                            </Col>
                             <Col md={4}>
                            <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Tamil</p>
                                    <span><a href={Data.ta} target="_blank" >
                                    <Button variant="outline-info" size="sm" className="btn-icon">
                                        <i className="bx bx-link-external"></i>
                                    </Button>
                                </a></span>
                                </div> 
                            </Col>
                             <Col md={4}>
                            <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Kannada</p>
                                    <span><a href={Data.kn} target="_blank" >
                                    <Button variant="outline-info" size="sm" className="btn-icon">
                                        <i className="bx bx-link-external"></i>
                                    </Button>
                                </a></span>
                                </div> 
                            </Col>
                             <Col md={4}>
                            <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Telugu</p>
                                    <span><a href={Data.te} target="_blank" >
                                    <Button variant="outline-info" size="sm" className="btn-icon">
                                        <i className="bx bx-link-external"></i>
                                    </Button>
                                </a></span>
                                </div> 
                            </Col>
                             <Col md={4}>
                            <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Bangali</p>
                                    <span><a href={Data.bn} target="_blank" >
                                    <Button variant="outline-info" size="sm" className="btn-icon">
                                        <i className="bx bx-link-external"></i>
                                    </Button>
                                </a></span>
                                </div> 
                            </Col>
                             <Col md={4}>
                            <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Panjabi</p>
                                    <span><a href={Data.pn} target="_blank" >
                                    <Button variant="outline-info" size="sm" className="btn-icon">
                                        <i className="bx bx-link-external"></i>
                                    </Button>
                                </a></span>
                                </div> 
                            </Col>
                             <Col md={4}>
                            <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Odisha</p>
                                    <span><a href={Data.or} target="_blank" >
                                    <Button variant="outline-info" size="sm" className="btn-icon">
                                        <i className="bx bx-link-external"></i>
                                    </Button>
                                </a></span>
                                </div> 
                            </Col>
                             <Col md={4}>
                            <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Malyalam</p>
                                    <span><a href={Data.ml} target="_blank" >
                                    <Button variant="outline-info" size="sm" className="btn-icon">
                                        <i className="bx bx-link-external"></i>
                                    </Button>
                                </a></span>
                                </div> 
                            </Col>
                            <Col md={4}>
                                <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Thumb Image</p>
                                    <span>
                                        <Fancybox>
                                            <a href={Data.thumb_image} data-fancybox="gallery">
                                                <img src={Data.thumb_image} className="hv-40 rounded-3" alt="" />
                                            </a>
                                        </Fancybox>
                                    </span>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Status</p><span>{Data.status == 1 ? "On" : "Off"}</span>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        </Layout>
    )
}

export default View_RC_DL_info