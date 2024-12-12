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
const View_service_center_brand = () => {
  const token = Cookies.get("fmljwt");
  const navigate = useNavigate();
  const params = useParams();
  const [variableData, setvariableData] = useState([]);
  const [id, setid] = useState({ _id: params.id });
  const [Data, SetData] = useState({
    _id: "",
    brand_name: "",
    brand_slug: "",
    brand_image: "",
  });
  const [DropDropValue, setDropDropValue] = useState([])
  const Dropdown_Name = async () => {
    const Result = await API.post("/srevice_get_brand", {}, { headers: { Authorization: `Bearer ${token}` } })
    DropDownArr = []
    reloadId = []
    Result.data.Data.map((val, i) => {
      DropDownArr.push({ label: val.brand_name, value: val._id })
      reloadId.push(val._id)
    })
    setDropDropValue(DropDownArr)
  }

  const Getview = async (Eid) => {
    const result = await API.post(`/srevice_get_brand_ID/${Eid !== "" ? Eid : id._id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
    console.log('result', result)
    SetData({
      _id: result.data.Data[0]._id,
      brand_name: result.data.Data[0].brand_name,
      brand_slug: result.data.Data[0].brand_slug,
      brand_image: result.data.Data[0].brand_image,
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
          const result = await API.post("/srevice_delete_brand", formdata, { headers: { Authorization: `Bearer ${token}` } });
          if (reloadId.length === 0) {
            // window.location.replace(`http://localhost:3000/service_brand`)
            window.location.replace(`${process.env.REACT_APP_BASE_URL}service_brand`)
          } else {
            // window.location.replace(`http://localhost:3000/view/service_brand/${reloadId[0]}`)
            window.location.replace(`${process.env.REACT_APP_BASE_URL}view/service_brand/${reloadId[0]}`)
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
        <h3><Link to="/service_brand" className='btn btn-primary btn-icon-lg me-3'><i className='bx bxs-left-arrow-alt'></i></Link>View Service center Brand</h3>
        <div className="page-heading-right">
          <SelectPicker data={DropDropValue} defaultValue={id._id} cleanable={false} className="wv-200 my-1 ms-3" onChange={(e) => selectpickerData(e)} placeholder="Select Categories" placement="bottomEnd" />
          <Link to={`/Edit/service_brand/${id._id}`}>
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
                  <p className='mb-0 fw-bold'>Brand Name</p><span>{Data.brand_name}</span>
                </div>
              </Col>
              <Col md={4}>
                <div className='mb-4'>
                  <p className='mb-0 fw-bold'>Brand Slug</p><span>{Data.brand_slug}</span>
                </div>
              </Col>
              <Col md={4}>
                <div className='mb-4'>
                  <p className='mb-0 fw-bold'>Brand Image</p>
                  <span>
                    <Fancybox>
                      <a href={Data.brand_image} data-fancybox="gallery">
                        <img src={Data.brand_image} className="hv-40 rounded-3" alt="" />
                      </a>
                    </Fancybox>
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

export default View_service_center_brand