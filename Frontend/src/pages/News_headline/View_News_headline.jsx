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
const View_News_headline = () => {
  const token = Cookies.get("fmljwt");
  const params = useParams();
  const [CategoryData, setCategoryData] = useState([])
  const [DropDropValue, setDropDropValue] = useState([])
  const [id, setid] = useState({ _id: params.id });
  const [Data, SetData] = useState({
    _id: "",
    category_id: "",
    vehicale_category_id: "",
    brand_id: "",
    tag_id: "",
    title: "",
    description: "",
    news_url: "",
    headtag: "",
    date: "",
    image: "",
    websiteimage: "",
    status: "",
  });
  const Dropdown_Name = async () => {
    const Result = await API.post("/get_news_headline", {}, { headers: { Authorization: `Bearer ${token}` } })
    DropDownArr = []
    reloadId = []
    // DropDownArr.push({label:"Select Title" , value:"" })
    Result.data.Data.map((val, i) => {
      DropDownArr.push({ label: val.title, value: val._id })
      reloadId.push(val._id)
    })
    setDropDropValue(DropDownArr)
  }

  const Getview = async (Eid) => {
    const result = await API.post(`/get_news_headline_ID/${Eid !== "" ? Eid : id._id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
    console.log('result', result?.data?.Data[0])
    SetData({
      _id: result.data.Data[0]._id,
      // category_id: result.data.Data[0].category_id.name,
      vehicale_category_id: result.data.Data[0].vehicale_category_id.name,
      brand_id: result.data.Data[0].brand_id.name,
      tag_id: result.data.Data[0].tag_id.name,
      title: result.data.Data[0].title,
      description: result.data.Data[0].description,
      news_url: result.data.Data[0].news_url,
      headtag: result.data.Data[0].headtag,
      date: result.data.Data[0].date,
      image: result.data.Data[0].image,
      websiteimage: result.data.Data[0].websiteimage,
      status: result.data.Data[0].status,
    });

    var devname = []
    result?.data?.Data[0].category_id?.map((val) => {
            devname.push(val.name)
      })
      setCategoryData(devname)
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
          const result = await API.post("/delete_news_headline", formdata, { headers: { Authorization: `Bearer ${token}` } });
          if (reloadId.length === 0) {
            // window.location.replace(`http://localhost:3000/news_Headline`)
            window.location.replace(`${process.env.REACT_APP_BASE_URL}news_Headline`)
          } else {
            // window.location.replace(`http://localhost:3000/view/news_Headline/${reloadId[0]}`)
            window.location.replace(`${process.env.REACT_APP_BASE_URL}view/news_Headline/${reloadId[0]}`)
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
        <h3><Link to="/news_Headline" className='btn btn-primary btn-icon-lg me-3'><i className='bx bxs-left-arrow-alt'></i></Link>View News Headline</h3>
        <div className="page-heading-right">
          <SelectPicker data={DropDropValue} defaultValue={id._id} cleanable={false} className="wv-200 my-1 ms-3" onChange={(e) => selectpickerData(e)} placeholder="Select Categories" placement="bottomEnd" />
          <Link to={`/Edit/news_Headline/${id._id}`}>
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
                  <p className='mb-0 fw-bold'>Category</p><span>{CategoryData.length !== 0 ? CategoryData.toString() : "-"}</span>
                </div>
              </Col>
              <Col md={4}>
                <div className='mb-4'>
                  <p className='mb-0 fw-bold'>Title</p><span>{Data.title}</span>
                </div>
              </Col>
              <Col md={4}>
                <div className='mb-4'>
                  <p className='mb-0 fw-bold'>Description</p>
                  <span>{Data.description}</span>
                </div>
              </Col>
              <Col md={4}>
                <div className='mb-4'>
                  <p className='mb-0 fw-bold'>Date</p>
                  <span>{Data.date}</span>
                </div>
              </Col>
              <Col md={4}>
                <div className="mb-4">
                  <p className="mb-0 fw-bold">Image</p>
                  <Fancybox>
                    <a data-fancybox="gallery" href={Data.image}>
                      <img
                        src={Data.image}
                        className="hv-40 rounded-3"
                        alt="Image"
                      />
                    </a>
                  </Fancybox>
                </div>
              </Col>
              <Col md={4}>
                <div className="mb-4">
                  <p className="mb-0 fw-bold">Website Image</p>
                  <Fancybox>
                    <a data-fancybox="gallery" href={Data.websiteimage}>
                      <img
                        src={Data.websiteimage}
                        className="hv-40 rounded-3"
                        alt="Image"
                      />
                    </a>
                  </Fancybox>
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

export default View_News_headline