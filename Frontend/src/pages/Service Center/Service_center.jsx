import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Button, Form, Card, Col, Row, Table } from "react-bootstrap";
import Layout from '../../layout/Layout';
import Pagination from "rc-pagination";
import Switch from 'react-switch';
import Fancybox from "../../Component/FancyBox";
import { API } from "../../App";
import { toast } from "react-toastify";
import $ from "jquery";
import Swal from "sweetalert2";
import { SelectPicker } from "rsuite";
import Cookies from "js-cookie";


var cityNAmeArray = []
var brandnameArray = []
var Page_array = [];
var status_array = [];
var Added_array = [];
var lp = []
// var brandnamedata = []
const Service_center = () => {
  const token = Cookies.get("fmljwt");
  const [Data, setData] = useState([])
  const [perPage, setPerPage] = useState(10);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);
  const [PageHook, setPageHook] = useState([])
  const [city_nameData, setcity_nameData] = useState([])
  const [Brand_nameData, setBrand_nameData] = useState([])
  const [brandnamedata, setbrandnamedata] = useState([])
  const [statusHook, setstatusHook] = useState([])
  const [Added, setAdded] = useState([])
  const [loading, setloading] = useState(true)
  const [query, setquery] = useState({
    searchvalue: "",
    cityid: "",
    brand: "",
    type: "",
    added_by: ""
  });
  const GetData = async () => {
    const result = await API.post("/srevice_center_get_data", {}, { headers: { Authorization: `Bearer ${token}` } })
    console.log('result', result)
    setData(result.data.Data)
    setbrandnamedata(result.data.Data)
    var branddata = []
    PageGetData()
    city_name_dropdown()
    // area_name_dropdown()
    StatusGetData()
    AddedGetData()
    setloading(false)
  }

  // Paggintion Code //
  const getData1 = (current, pageSize) => {
    return Data.slice((current - 1) * pageSize, current * pageSize);
  };

  const PerPageChange = (value) => {
    setSize(value);
    const newPerPage = Math.ceil(Data.length / value);
    if (current > newPerPage) {
      setCurrent(newPerPage);
    }
  };

  const paginationData = (page, pageSize) => {
    setCurrent(page);
    setSize(pageSize);
  };

  const PrevNextArrow = (current, type, originalElement) => {
    if (type === "prev") {
      return <button className="paggination-btn">Previous</button>;
    }
    if (type === "next") {
      return <button className="paggination-btn">Next</button>;
    }
    return originalElement;
  };

  const PageGetData = async () => {
    var PageNumber = [10, 25, 50, 100]
    Page_array = []
    PageNumber.map((val, index) => {
      Page_array.push({ label: val, value: val })
    })
    setPageHook(Page_array)
  };

  const StatusGetData = async () => {
    var status = ["Active", "Deactive"]
    var status = [
      { label: "Car", value: 1 },
      { label: "Bike", value: 2 },
    ]
    status_array = []
    status_array.push({ label: "Select Type", value: "" })
    status.map((val, index) => {
      status_array.push({ label: val.label, value: val.value })
    })
    setstatusHook(status_array)
  };

  const AddedGetData = async () => {
    var Added_By = [
      { label: "Admin", value: 0 },
      { label: "User", value: 1 },
    ]
    Added_array = []
    Added_array.push({ label: " Added By", value: "" })
    Added_By.map((val, index) => {
      Added_array.push({ label: val.label, value: val.value })
    })
    setAdded(Added_array)
  };


  const city_name_dropdown = async () => {
    const Result = await API.post("/srevice_get_city", {}, { headers: { Authorization: `Bearer ${token}` } })
    cityNAmeArray = []
    cityNAmeArray.push({ label: "Select City", value: "", role: "" })
    Result.data.Data.map((val) => {
      cityNAmeArray.push({ label: val.name, value: val._id })
    })
    setcity_nameData(cityNAmeArray)
  }

  const brand_name_dropdown = async (e) => {
    const Form = new FormData()
    Form.append("type", e)
    const Result = await API.post("/Brand_dropdown_Data", Form, { headers: { Authorization: `Bearer ${token}` } })
    console.log('Result', Result)
    brandnameArray = []
    brandnameArray.push({ label: "Select Brand Name", value: "", role: "" })
    Result.data.Data.map((val) => {
      brandnameArray.push({ label: val.brand_name, value: val._id })
    })
    setBrand_nameData(brandnameArray)
  }

  let count = 10
  let swalCountdownInterval
  const DeleteData = async (id) => {
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
          const form = new FormData()
          form.append('id', id)
          await API.post(`/srevice_delete_data`, form, { headers: { Authorization: `Bearer ${token}` } });
          GetData();
        } else {
          count = 10
          clearInterval(swalCountdownInterval)
        }
      });
  };

  const Seaching = async (e, name) => {
    if (name == "type") {
      brand_name_dropdown(e)
    }
    setCurrent(1);
    if (name === "searchvalue") {
      setquery({ ...query, [e.target.name]: e.target.value });
    } else if (name === "") {
      GetData()
    } else {
      setquery({ ...query, [name]: e })
    }

    console.log('query', query)
    const Form = new FormData();
    Form.append("searchvalue", name == "searchvalue" ? e.target.value : query.searchvalue);
    Form.append("cityid", name == "cityid" ? e : query.cityid);
    Form.append("brand", name == "brand" ? e : query.brand);
    Form.append("type", name == "type" ? e : query.type);
    Form.append("added_by", name == "added_by" ? e : query.added_by);
    const result = await API.post("/searching_data", Form, { headers: { Authorization: `Bearer ${token}` } });
    setData(result.data.Data);

  }

  const Togglechange = async (id, e, name) => {
    var status;
    var featured;
    if (name === "status") {
      status = e === true ? 1 : 0;
    }
    if (name === "featured") {
      featured = e === true ? 1 : 0;
    }
    const Form = new FormData();
    Form.append("id", id);
    Form.append("name", name);
    Form.append("status", status);
    Form.append("featured", featured);
    const result = await API.post("/toggle_data", Form, { headers: { Authorization: `Bearer ${token}` } });
    if (result) {
      toast.success(" status Update successfully");
      GetData();
    }
  };

  useEffect(() => {
    GetData()
  }, [])
  return (
    <Layout sidebar={true}>
      <div className="page-heading">
        <h3 className="my-1">Service Center Data</h3>
        <div className="page-heading-right">
          <Form.Control
            type="text"
            name="searchvalue"
            id=""
            placeholder="Search Center Name"
            className="wv-200 my-1 ms-3"
            onChange={(e) => Seaching(e, "searchvalue")}
          />

          <SelectPicker
            cleanable={false}
            data={city_nameData}
            searchable={false}
            defaultValue={""}
            className="wv-200 my-1 ms-3"
            placeholder="Select City"
            // value={search[2].search.status}
            onChange={(e) => Seaching(e, "cityid")}
          />

          <SelectPicker
            cleanable={false}
            data={Brand_nameData}
            searchable={false}
            defaultValue={""}
            className="wv-200 my-1 ms-3"
            placeholder="Select Brand Name"
            // value={search[2].search.status}
            onChange={(e) => Seaching(e, "brand")}
          />

          {/* <SelectPicker
          cleanable={false}
          data={area_nameData}
          searchable={false}
          defaultValue={""}
          className="wv-200 my-1 ms-3"
          placeholder="Select City"
          // value={search[2].search.status}
          onChange={(e) => Seaching(e, "state")}
        /> */}

          <SelectPicker
            cleanable={false}
            data={statusHook}
            searchable={false}
            defaultValue={""}
            className="wv-200 my-1 ms-3"
            placeholder="Select Type"
            // value={search[2].search.status}
            onChange={(e) => Seaching(e, "type")}
          />

          <SelectPicker
            cleanable={false}
            data={Added}
            searchable={false}
            defaultValue={""}
            className="wv-200 my-1 ms-3"
            placeholder="Select Satus"
            // value={search[2].search.status}
            onChange={(e) => Seaching(e, "added_by")}
          />

          <SelectPicker
            cleanable={false}
            data={PageHook}
            searchable={false}
            // style={{ width: 224 }}
            defaultValue={10}
            className="wv-100 my-1 ms-3"
            onChange={(e) => {
              setSize(Number(e));
              setCurrent(1);
            }}
          />

          <Link to="/Add/service_center" className="my-1 ms-3">
            <Button variant="primary" value="create">Add New</Button>
          </Link>

        </div>
      </div>
      <div className="page-content">
        <Row>
          <Col xs={12}>
            <Card>
              <Card.Body>
                <Table bordered responsive>
                  <thead>
                    <tr>
                      <th width="5%" className='text-center'>No</th>
                      <th width="10%">Brand Name</th>
                      <th width="10%">City Name</th>
                      <th width="10%">Center Name</th>
                      <th width="10%" >Address</th>
                      <th width="10%" >Number</th>
                      <th width="10%" >Email</th>
                      <th width="5%" >Added By    </th>
                      <th width="10%" >Featured</th>
                      <th width="10%" >Status</th>
                      {/* <th width="10%" >Data Live</th> */}
                      <th width="10%" className='text-center' >Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      getData1(current, size).map((val, i) => {
                        console.log('val', val)
                        lp = []
                        val?.brand_id?.map((v) => {
                        lp.push(v.brand_name)
                        })
                        return (
                          <tr>
                            <td className='text-center'>{(current === 1) ? i + 1 : current * size + i + 1 - size}</td>
                            <td>{lp.toString()}</td>
                            <td>{val.city_id.name}</td>
                            <td>{val.name}</td>
                            <td>{val.address}</td>
                            <td>{val.number}</td>
                            <td>{val.email}</td>
                            <td>{val.added_by}</td>
                            <td>
                            <Switch
                                onChange={(e) => {
                                  Togglechange(val._id, e, "featured");
                                }}
                                checked={val.featured === 1 ? true : false}
                                offColor="#C8C8C8"
                                onColor="#0093ed"
                                height={30}
                                width={70}
                                className="react-switch"
                                uncheckedIcon={
                                  <div className="react-switch-off">OFF</div>
                                }
                                checkedIcon={
                                  <div className="react-switch-on">ON</div>
                                }
                              />
                            </td>
                            <td>
                              {
                                <Switch
                                  onChange={(e) => {
                                    Togglechange(val._id, e, "status");
                                  }}
                                  checked={val.status === 1 ? true : false}
                                  offColor="#C8C8C8"
                                  onColor="#0093ed"
                                  height={30}
                                  width={70}
                                  className="react-switch"
                                  uncheckedIcon={
                                    <div className="react-switch-off">OFF</div>
                                  }
                                  checkedIcon={
                                    <div className="react-switch-on">ON</div>
                                  }
                                />
                              }
                            </td>
                            {/* <td>1</td> */}
                            <td className='text-center'>
                              <Link to={`/view/service_center/${val._id}`}>
                                <Button variant="outline-warning" size="sm" className="me-2 btn-icon"><i className='bx bx-show'></i></Button>
                              </Link>
                              <Button variant="outline-danger" onClick={() => DeleteData(val._id)} size="sm" className="btn-icon"><i className='bx bx-trash-alt' ></i></Button>
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                  {
                    loading == false && Data.length === 0 ? <tr>
                      <td colSpan="100%" className="p-0">
                        <div className='no-found'>
                          <img src="../../not-found/image.svg" />
                          <p>No Found Remotes</p>
                        </div>
                      </td>
                    </tr> : ""

                  }
                </Table>
                {Data.length > size ? (
                  <div className="pagination-custom">
                    <Pagination
                      showTitle={false}
                      className="pagination-data"
                      onChange={paginationData}
                      total={Data.length}
                      current={current}
                      pageSize={size}
                      showSizeChanger={false}
                      itemRender={PrevNextArrow}
                      onShowSizeChange={PerPageChange}
                    />
                  </div>
                ) : (
                  ""
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Layout>
  )
}

export default Service_center