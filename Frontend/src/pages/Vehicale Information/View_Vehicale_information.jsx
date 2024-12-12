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
import dayjs from 'dayjs'

var DropDownArr = []
var reloadId = [];
const View_Vehicale_information = () => {
  const token = Cookies.get("fmljwt");
  const params = useParams();
  const [Modal_Color_Data, setModal_Color_Data] = useState([])
  const [Modal_Color_Image, setModal_Color_Image] = useState([])
  const [Price_variant_data, setPrice_variant_data] = useState([])
  const [DropDropValue, setDropDropValue] = useState([])
  const [id, setid] = useState({ _id: params.id });

  const [Data, SetData] = useState({
    _id: "",
    category_id: "",
    brand_id: "",
    body_id: "",
    name: "",
    fuel_type: "",
    rating: "",
    review: "",
    min_price: "",
    max_price: "",
    varient_name: "",
    price_range: "",
    status: "",
    image: "",
    thumb_image: "",
    launched_at: "",
    launched_date: "",
    popularity: "",
    mileage: "",
    engine: "",
    max_power: "",
    showroom_price: "",
    road_price: "",
    rto_price: "",
    insurance_price: "",
    other_price: "",
    upcoming: "",
    latest: "",
    manu_des: "",
    price_des: "",
    high_des: "",
    key_specs: "",
    seo_note: "",


    color_code: "",
    color_name: "",

    Vengine: "",
    Vex_show_room_rice: "",
    Vfuel_type: "",
    Vinsurance_price: "",
    Vis_scrapping: "",
    Vlatest_update: "",
    Vlaunched_at: "",
    Vvariant_image: "",
    Vmileage: "",
    Vname: "",
    Von_road_price: "",
    Vother_price: "",
    Vprice: "",
    Vprice_range: "",
    Vrating: "",
    Vreview_count: "",
    Vrto_price: "",
    Vstatus: ""

  });
  const Dropdown_Name = async () => {
    const Result = await API.post("/get/vehicleinformation", {}, { headers: { Authorization: `Bearer ${token}` } })
    DropDownArr = []
    reloadId = []
    // DropDownArr.push({label:"Select Title" , value:"" })
    Result.data.data.map((val, i) => {
      DropDownArr.push({ label: val.name, value: val._id })
      reloadId.push(val._id)
    })
    setDropDropValue(DropDownArr)
  }

  const Getview = async (Eid) => {
    const result = await API.post(`/View/vehicleinformation/${Eid !== "" ? Eid : id._id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
    console.log('result', result)
    SetData({
      _id: result.data._id,
      category_id: result.data.category_id.name,
      brand_id: result.data.brand_id.name,
      body_id: result.data.body_id.name,
      name: result.data.name,
      fuel_type: result.data.fuel_type,
      rating: result.data.rating,
      review: result.data.review,
      min_price: result.data.min_price,
      max_price: result.data.max_power,
      varient_name: result.data.varient_name,
      price_range: result.data.price_range,
      status: result.data.status,
      image: result.data.image,
      thumb_image: result.data.thumb_image,
      launched_at: dayjs(result.data.launched_at).format("DD-MM-YYYY"),
      launched_date: dayjs(result.data.launched_date).format("DD-MM-YYYY"),
      popularity: result.data.popularity,
      mileage: result.data.mileage,
      engine: result.data.engine,
      max_power: result.data.max_power,
      showroom_price: result.data.showroom_price,
      road_price: result.data.road_price,
      rto_price: result.data.rto_price,
      insurance_price: result.data.insurance_price,
      other_price: result.data.other_price,
      upcoming: result.data.upcoming,
      latest: result.data.latest,
      manu_des: result.data.manu_des,
      price_des: result.data.price_des,
      high_des: result.data.high_des,
      key_specs: result.data.key_specs,
      seo_note: result.data.seo_note,
      Cate_id: result.data.category_id._id,
      brn_id: result.data.brand_id._id,
      bod_id: result.data.body_id._id,
  })
  setModal_Color_Data(result.data.Modal_color_Data)
  setPrice_variant_data(result.data.pricevariants)
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
          const result = await API.post("/delete/vehicleinfo", formdata, { headers: { Authorization: `Bearer ${token}` } });
          if (reloadId.length === 0) {
            window.location.replace(`http://localhost:3000/Vehicale_information`)
            // window.location.replace(`${process.env.REACT_APP_BASE_URL}Vehicale_information`)
          } else {
            window.location.replace(`http://localhost:3000/view/Vehicale_information/${reloadId[0]}`)
            // window.location.replace(`${process.env.REACT_APP_BASE_URL}view/Vehicale_information/${reloadId[0]}`)
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
        <h3><Link to="/Vehicale_information" className='btn btn-primary btn-icon-lg me-3'><i className='bx bxs-left-arrow-alt'></i></Link>View Vehicle Information</h3>
        <div className="page-heading-right">
          <SelectPicker data={DropDropValue} defaultValue={id._id} cleanable={false} className="wv-200 my-1 ms-3" onChange={(e) => selectpickerData(e)} placeholder="Select Categories" placement="bottomEnd" />
          <Link to={`/Edit/Vehicale_information/${id._id}`}>
          {/* <Link to={`/Edit/Vehicale_information/${id._id}`}> */}

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
                  <p className='mb-0 fw-bold'>Category</p><span>{Data.category_id}</span>
                </div>
              </Col>
              <Col md={4}>
                <div className='mb-4'>
                  <p className='mb-0 fw-bold'>Brand</p><span>{Data.brand_id}</span>
                </div>
              </Col>
              <Col md={4}>
                <div className='mb-4'>
                  <p className='mb-0 fw-bold'>Body Type</p><span>{Data.body_id}</span>
                </div>
              </Col>
              <Col md={4}>
                <div className='mb-4'>
                  <p className='mb-0 fw-bold'>Model Name</p><span>{Data.name}</span>
                </div>
              </Col>
              <Col md={4}>
                <div className='mb-4'>
                  <p className='mb-0 fw-bold'>Fuel Type</p><span>{Data.fuel_type}</span>
                </div>
              </Col>
              <Col md={4}>
                <div className='mb-4'>
                  <p className='mb-0 fw-bold'>Avg Rating</p><span>{Data.rating}</span>
                </div>
              </Col>
              <Col md={4}>
                <div className='mb-4'>
                  <p className='mb-0 fw-bold'>Review Count</p><span>{Data.review}</span>
                </div>
              </Col>
              <Col md={4}>
                <div className='mb-4'>
                  <p className='mb-0 fw-bold'>Minimum Price</p><span>{Data.min_price}</span>
                </div>
              </Col>
              <Col md={4}>
                <div className='mb-4'>
                  <p className='mb-0 fw-bold'>Maximum Price</p><span>{Data.max_price}</span>
                </div>
              </Col>
              <Col md={4}>
                <div className='mb-4'>
                  <p className='mb-0 fw-bold'>Body Type</p><span>{Data.body_id}</span>
                </div>
              </Col>
              <Col md={4}>
                <div className='mb-4'>
                  <p className='mb-0 fw-bold'>Variant Name</p><span>{Data.varient_name}</span>
                </div>
              </Col>
              <Col md={4}>
                <div className='mb-4'>
                  <p className='mb-0 fw-bold'>Price Range</p><span>{Data.price_range}</span>
                </div>
              </Col>
              <Col md={4}>
                <div className='mb-4'>
                  <p className='mb-0 fw-bold'>Status</p><span>{Data.status}</span>
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
                  <p className="mb-0 fw-bold">Thumb Image</p>
                  <Fancybox>
                    <a data-fancybox="gallery" href={Data.thumb_image}>
                      <img
                        src={Data.thumb_image}
                        className="hv-40 rounded-3"
                        alt="Image"
                      />
                    </a>
                  </Fancybox>
                </div>
              </Col>
              <Col md={4}>
                <div className='mb-4'>
                  <p className='mb-0 fw-bold'>Launched At</p><span>{Data.launched_at}</span>
                </div>
              </Col>
              <Col md={4}>
                <div className='mb-4'>
                  <p className='mb-0 fw-bold'>Launched Date</p><span>{Data.launched_date}</span>
                </div>
              </Col>
              <Col md={4}>
                <div className='mb-4'>
                  <p className='mb-0 fw-bold'>Model Popularity</p><span>{Data.popularity}</span>
                </div>
              </Col>
              <Col md={4}>
                <div className='mb-4'>
                  <p className='mb-0 fw-bold'>Mileage</p><span>{Data.mileage}</span>
                </div>
              </Col>
              <Col md={4}>
                <div className='mb-4'>
                  <p className='mb-0 fw-bold'>Engine</p><span>{Data.engine}</span>
                </div>
              </Col>
              <Col md={4}>
                <div className='mb-4'>
                  <p className='mb-0 fw-bold'>Max Power</p><span>{Data.max_power}</span>
                </div>
              </Col>
              <Col md={4}>
                <div className='mb-4'>
                  <p className='mb-0 fw-bold'>Showroom Price</p><span>{Data.showroom_price}</span>
                </div>
              </Col>
              <Col md={4}>
                <div className='mb-4'>
                  <p className='mb-0 fw-bold'>On Road Price</p><span>{Data.road_price}</span>
                </div>
              </Col>
              <Col md={4}>
                <div className='mb-4'>
                  <p className='mb-0 fw-bold'>RTO Price</p><span>{Data.rto_price}</span>
                </div>
              </Col>
              <Col md={4}>
                <div className='mb-4'>
                  <p className='mb-0 fw-bold'>Insurance Price</p><span>{Data.insurance_price}</span>
                </div>
              </Col>
              <Col md={4}>
                <div className='mb-4'>
                  <p className='mb-0 fw-bold'>Other Price</p><span>{Data.other_price}</span>
                </div>
              </Col>

              <Col md={4}>
                <div className='mb-4'>
                  <p className='mb-0 fw-bold'>Is Upcoming</p><span>{Data.upcoming == 1 ? "Open" : "Close"}</span>
                </div>
              </Col>
              <Col md={4}>
                <div className='mb-4'>
                  <p className='mb-0 fw-bold'>Is Latest</p><span>{Data.latest == 1 ? "Open" : "Close"}</span>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <div className='page-content mt-2'>
          <Card>
            <Card.Body>
              <Row>
                {
                  Modal_Color_Data.map((val, i) => {
                    console.log('val', val)
                    return (
                      <>
                        <Col md={4}>
                          <div className='mb-4'>
                            <p className='mb-0 fw-bold'>Color Name</p><span>{val.color_name}</span>
                          </div>
                        </Col>
                        <Col md={4}>
                          <div className='mb-4'>
                            <p className='mb-0 fw-bold'>Color Code</p><span>{val.color_code}</span>
                          </div>
                        </Col>
                        <Col md={4}>
                        <div className="mb-4">
                          <p className="mb-0 fw-bold">Variant Image</p>
                          {
                            val?.Modal_color_image?.map((Data) => {
                              return (
                                <Fancybox>
                                  <a data-fancybox="gallery" href={Data.Modal_color_image}>
                                    <img
                                      src={Data.Modal_color_image}
                                      className="hv-40 rounded-3 me-1"
                                      alt="Image"
                                    />
                                  </a>
                                </Fancybox>
                              )
                            })
                          }
                        </div>
                      </Col>
                      </>
                    )
                  })
                }
              </Row>
            </Card.Body>
          </Card>
        </div>

        <div className='page-content mt-2'>
          <Card>
            <Card.Body>
              <Row>
                {
                  Price_variant_data.map((val) => {
                    return (
                      <>
                        <Col md={4}>
                          <div className='mb-4'>
                            <p className='mb-0 fw-bold'>Name</p><span>{val.name}</span>
                          </div>
                        </Col>
                        <Col md={4}>
                          <div className='mb-4'>
                            <p className='mb-0 fw-bold'>Engine</p><span>{val.engine}</span>
                          </div>
                        </Col>
                        <Col md={4}>
                          <div className='mb-4'>
                            <p className='mb-0 fw-bold'>Price</p><span>{val.price}</span>
                          </div>
                        </Col>
                        <Col md={4}>
                          <div className='mb-4'>
                            <p className='mb-0 fw-bold'>Price Range</p><span>{val.price_range}</span>
                          </div>
                        </Col>
                        <Col md={4}>
                          <div className='mb-4'>
                            <p className='mb-0 fw-bold'>Review Count</p><span>{val.review_count}</span>
                          </div>
                        </Col>
                        <Col md={4}>
                          <div className='mb-4'>
                            <p className='mb-0 fw-bold'>Rating</p><span>{val.rating}</span>
                          </div>
                        </Col>
                        <Col md={4}>
                          <div className='mb-4'>
                            <p className='mb-0 fw-bold'>Status</p><span>{val.status}</span>
                          </div>
                        </Col>
                        <Col md={4}>
                          <div className='mb-4'>
                            <p className='mb-0 fw-bold'>Fuel Type</p><span>{val.fuel_type}</span>
                          </div>
                        </Col>
                        <Col md={4}>
                          <div className='mb-4'>
                            <p className='mb-0 fw-bold'>Ex Show Room Price</p><span>{val.ex_show_room_rice}</span>
                          </div>
                        </Col>
                        <Col md={4}>
                          <div className='mb-4'>
                            <p className='mb-0 fw-bold'>Mileage</p><span>{val.mileage}</span>
                          </div>
                        </Col>
                        <Col md={4}>
                          <div className='mb-4'>
                            <p className='mb-0 fw-bold'>RTO Price</p><span>{val.rto_price}</span>
                          </div>
                        </Col>
                        <Col md={4}>
                          <div className='mb-4'>
                            <p className='mb-0 fw-bold'>Insurance Price</p><span>{val.insurance_price}</span>
                          </div>
                        </Col>
                        <Col md={4}>
                          <div className='mb-4'>
                            <p className='mb-0 fw-bold'>Other Price</p><span>{val.other_price}</span>
                          </div>
                        </Col>
                        <Col md={4}>
                          <div className='mb-4'>
                            <p className='mb-0 fw-bold'>On-Road Price</p><span>{val.on_road_price}</span>
                          </div>
                        </Col>
                        <Col md={4}>
                          <div className='mb-4'>
                            <p className='mb-0 fw-bold'>Latest Update</p><span>{val.latest_update}</span>
                          </div>
                        </Col>
                        <Col md={4}>
                          <div className='mb-4'>
                            <p className='mb-0 fw-bold'>Launched At</p><span>{val.launched_at}</span>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="mb-4">
                            <p className="mb-0 fw-bold">Variant Image</p>
                            <Fancybox>
                              <a data-fancybox="gallery" href={val.variant_image}>
                                <img
                                  src={val.variant_image}
                                  className="hv-40 rounded-3"
                                  alt="Image"
                                />
                              </a>
                            </Fancybox>
                          </div>
                        </Col>
                      </>
                    )
                  })
                }
              </Row>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

export default View_Vehicale_information