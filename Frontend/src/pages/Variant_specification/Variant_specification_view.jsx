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
const Variant_specification_view = () => {
  const token = Cookies.get("fmljwt");
  const navigate = useNavigate();
  const params = useParams();
  const [variableData, setvariableData] = useState([]);
  const [id, setid] = useState({ _id: params.id });
  const [Data, SetData] = useState({
    _id: "",
    category_id: "",
    brand_id: "",
    vehicle_id: "",
    Variant_id: "",
    specification: "",
    specification_name: "",
    specification_value: "",
    key_specification: "",
    is_feature: 0,
    is_specification: 0,
    is_overview: 0,
  });
  const [DropDropValue, setDropDropValue] = useState([])
  const Dropdown_Name = async () => {
    const Result = await API.post("/GET/Specification_Variant", {}, { headers: { Authorization: `Bearer ${token}` } })
    console.log('Result===>>', Result)
    DropDownArr = []
    reloadId = []
    // DropDownArr.push({label:"Select Title" , value:"" })
    Result.data.Data.map((val, i) => {
      DropDownArr.push({ label: val?.specification?.name, value: val._id })
      reloadId.push(val._id)
    })
    setDropDropValue(DropDownArr)
  }

  const Getview = async (Eid) => {
    const result = await API.post(`/ViewData/Specification_Variant/${Eid !== "" ? Eid : id._id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
    console.log('result', result)
    SetData({
    _id:result.data.Data[0]._id,
    category_id: result.data.Data[0].category_id.name,
    brand_id: result.data.Data[0].brand_id.name,
    vehicle_id: result.data.Data[0].Vehicle_name_id.name,
    Variant_id: result.data.Data[0].Vehicle_Variant_id.name,
    specification: result.data.Data[0].specification.name,
    specification_name: result.data.Data[0].specification_name,
    specification_value: result.data.Data[0].specification_value,
    key_specification: result.data.Data[0].key_specification.name,
    is_feature: result.data.Data[0].is_feature,
    is_specification: result.data.Data[0].is_specification,
    is_overview: result.data.Data[0].is_overview,
    })
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
          $(".swal2-confirm").attr('disabled', true);
          swalCountdownInterval = setInterval(function () {
            count--
            if (count < 1) {
              $(".counter").text(`OK`)
              $(".swal2-confirm").attr('disabled', false);
              clearInterval(swalCountdownInterval)
            } else {
              $(".counter").text(`OK (${count})`)
            }
          }, 1000);
        }
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const ind = reloadId.indexOf(Data._id)
          reloadId.splice(ind, 1)
          const formdata = new FormData()
          formdata.append("id", Data._id)
          const result = await API.post("/delete_tags", formdata, { headers: { Authorization: `Bearer ${token}` } });
          if (reloadId.length === 0) {
            // window.location.replace(`http://localhost:3000/tag`)
            window.location.replace(`${process.env.REACT_APP_BASE_URL}tag`)
          } else {
            // window.location.replace(`http://localhost:3000/view/tag/${reloadId[0]}`)
            window.location.replace(`${process.env.REACT_APP_BASE_URL}view/tag/${reloadId[0]}`)
          }
        } else {
          count = 10
          clearInterval(swalCountdownInterval)
        }
      });
  };

  return (
    <Layout sidebar={true}>
      <div className="page-heading">
        <h3><Link to="/Variant_specification" className='btn btn-primary btn-icon-lg me-3'><i className='bx bxs-left-arrow-alt'></i></Link>View Variant Specification</h3>
        <div className="page-heading-right">
          <SelectPicker data={DropDropValue} defaultValue={id._id} cleanable={false} className="wv-200 my-1 ms-3" onChange={(e) => selectpickerData(e)} placeholder="Select Categories" placement="bottomEnd" />
          <Link to={`/Edit/Variant_specification/${id._id}`}>
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
                  <p className='mb-0 fw-bold'>category</p><span>{Data.category_id}</span>
                </div>
              </Col>

              <Col md={4}>
                <div className='mb-4'>
                  <p className='mb-0 fw-bold'>Brand</p><span>{Data.brand_id}</span>
                </div>
              </Col>

              <Col md={4}>
                <div className='mb-4'>
                  <p className='mb-0 fw-bold'>Vehicle Name</p><span>{Data.vehicle_id}</span>
                </div>
              </Col>

              <Col md={4}>
                <div className='mb-4'>
                  <p className='mb-0 fw-bold'>Specification</p><span>{Data.specification}</span>
                </div>
              </Col>

              <Col md={4}>
                <div className='mb-4'>
                  <p className='mb-0 fw-bold'>Specification Name</p><span>{Data.specification_name}</span>
                </div>
              </Col>

              <Col md={4}>
                <div className='mb-4'>
                  <p className='mb-0 fw-bold'>Specification Value</p><span>{Data.specification_value}</span>
                </div>
              </Col>

              <Col md={4}>
                <div className='mb-4'>
                  <p className='mb-0 fw-bold'>Key Specification</p><span>{Data.key_specification}</span>
                </div>
              </Col>

              <Col md={4}>
                <div className='mb-4'>
                  <p className='mb-0 fw-bold'>Is Feature</p><span>{Data.is_feature == 1 ? "On" : "Off"}</span>
                </div>
              </Col>

              <Col md={4}>
                <div className='mb-4'>
                  <p className='mb-0 fw-bold'>Is Specification</p><span>{Data.is_specification == 1 ? "On" : "Off"}</span>
                </div>
              </Col>

              <Col md={4}>
                <div className='mb-4'>
                  <p className='mb-0 fw-bold'>Is Overview</p><span>{Data.is_overview == 1 ? "On" : "Off"}</span>
                </div>
              </Col>

            </Row>
          </Card.Body>
        </Card>
      </div>
    </Layout>
  )
}

export default Variant_specification_view