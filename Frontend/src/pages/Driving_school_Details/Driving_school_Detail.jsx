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
// var areaNAmeArray = []
var Page_array = [];
var status_array = [];
var Added_array = [];
const Driving_school_Detail = () => {
  const token = Cookies.get("fmljwt");
  const [Data, setData] = useState([])
  const [perPage, setPerPage] = useState(10);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);
  const [PageHook, setPageHook] = useState([])
  const [city_nameData, setcity_nameData] = useState([])
  // const [area_nameData, setarea_nameData] = useState([])
  const [statusHook, setstatusHook] = useState([])
  const [Added, setAdded] = useState([])
  const [loading, setloading] = useState(true)
  const [query, setquery] = useState({
    searchvalue: "",
    cityid: "",
    status:"",
    added_by:""
  });
  const GetData = async () => {
    const result = await API.post("/get_details", {}, { headers: { Authorization: `Bearer ${token}` } })
    setData(result.data.Data)
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
      {label:"Active" , value:1},
      {label:"Deactive" , value:0},
    ]
    status_array = []
    status_array.push({ label: "All Status", value: "" })
    status.map((val, index) => {
        status_array.push({ label: val.label, value: val.value })
    })
    setstatusHook(status_array)
};

const AddedGetData = async () => {
  var Added_By = [
    {label:"Admin", value:0},
    {label:"User", value:1},
  ]
  Added_array = []
  Added_array.push({ label: " Added By", value: "" })
  Added_By.map((val, index) => {
      Added_array.push({ label: val.label, value: val.value })
  })
  setAdded(Added_array)
};


  const city_name_dropdown = async () => {
    const Result = await API.post("/get_city", {}, { headers: { Authorization: `Bearer ${token}` } })
    cityNAmeArray = []
    cityNAmeArray.push({ label: "Select City", value: "", role: "" })
    Result.data.Data.map((val) => {
      cityNAmeArray.push({ label: val.city_name, value: val._id })
    })
    setcity_nameData(cityNAmeArray)
  }

  // const area_name_dropdown = async () => {
  //   const Result = await API.post("/get_area", {}, { headers: { Authorization: `Bearer ${token}` } })
  //   areaNAmeArray = []
  //   areaNAmeArray.push({ label: "Select Area", value: "", role: "" })
  //   Result.data.Data.map((val) => {
  //     areaNAmeArray.push({ label: val.area_name, value: val._id })
  //   })
  //   setarea_nameData(areaNAmeArray)
  // }

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
          await API.post(`/delete_details`, form, { headers: { Authorization: `Bearer ${token}` } });
          GetData();
        } else {
          count = 10
          clearInterval(swalCountdownInterval)
        }
      });
  };

  const Seaching = async (e, name) => {
    console.log('name', name)
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
    Form.append("status", name == "status" ? e : query.status);
    Form.append("added_by", name == "added_by" ? e : query.added_by);
    const result = await API.post("/details_search", Form, { headers: { Authorization: `Bearer ${token}` } });
    setData(result.data.Data);

  }

  const Togglechange = async (id, e, name) => {
    var status;
    if (name === "status") {
      status = e === true ? 1 : 0;
    }
    const Form = new FormData();
    Form.append("id", id);
    Form.append("name", name);
    Form.append("status", status);
    const result = await API.post("/toggle_deatails", Form, { headers: { Authorization: `Bearer ${token}` } });
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
        <h3 className="my-1">Driving School Details</h3>
        <div className="page-heading-right">
          <Form.Control
            type="text"
            name="searchvalue"
            id=""
            placeholder="Search Driving School"
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
            placeholder="Select Satus"
            // value={search[2].search.status}
            onChange={(e) => Seaching(e, "status")}
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

          <Link to="/Add/driving_Detail" className="my-1 ms-3">
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
                      <th width="10%">city ID</th>
                      <th width="10%">zip code</th>
                      <th width="10%">Name</th>
                      <th width="10%" >Address</th>
                      <th width="10%" >contact info</th>
                      <th width="10%" >Open/close Time</th>
                      <th width="5%" >Website</th>
                      <th width="10%" >Payment Mode</th>
                      <th width="10%" >Added By</th>
                      <th width="10%" >Status</th>
                      {/* <th width="10%" >Deatil Live</th> */}
                      <th width="10%" className='text-center' >Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      getData1(current, size).map((val, i) => {
                        console.log('val', val)
                        return (
                          <tr>
                            <td className='text-center'>{(current === 1) ? i + 1 : current * size + i + 1 - size}</td>
                            <td>{val.city_id.city_name}</td>
                            <td>{val.zip_code}</td>
                            <td>{val.name}</td>
                            <td>{val.address}</td>
                            <td>{`
                            Email:-
                            ${val.email}
                            Number:-
                            ${val.contactNumber1},
                            ${val.contactNumber2},
                          `}</td>
                            <td>
                              {
                                `
                              ${val.open_Time} ,
                              ${val.close_Time} ,
                              `
                              }
                            </td>
                            <td>{
                              <a href={val.website} target="_blank" >
                                <Button variant="outline-info" size="sm" className="btn-icon">
                                  <i className="bx bx-link-external"></i>
                                </Button>
                              </a>
                            }</td>
                            <td><ul>{val.paymentMode.map((valData) => { return (<li>{valData}</li>) })}</ul></td>
                            <td>{val.added_by}</td>
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
                              <Link to={`/view/driving_Detail/${val._id}`}>
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

export default Driving_school_Detail