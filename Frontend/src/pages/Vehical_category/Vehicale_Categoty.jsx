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

var type_Array = []
var Page_array = [];
const Vehicale_Categoty = () => {
    const token = Cookies.get("fmljwt");
  const [Data, setData] = useState([])
  const [perPage, setPerPage] = useState(10);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);
  const [PageHook, setPageHook] = useState([])
  const [Type_Data, setType_Data] = useState([])
  const [loading, setloading] = useState(true)
  const [query, setquery] = useState({
    type: "",
    search: "",
  });
  const GetData = async () => {
    const result = await API.post("/get/vehicle/category", {}, { headers: { Authorization: `Bearer ${token}` } })
    console.log('result', result)
    setData(result.data.data)
    PageGetData()
    Type_dropdown()
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

  const Type_dropdown = async () => {
    const resut = [
      {label:"Car" , value:1},
      {label:"Bike" , value:2},
    ]
    type_Array = []
    type_Array.push({ label: "Select Type", value: "" })
    resut.map((val) => {
      type_Array.push({ label: val.label, value: val.value })
    })
    setType_Data(type_Array)
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
          await API.post(`/delete/vehicle/category`, form, { headers: { Authorization: `Bearer ${token}` } });
          GetData();
        } else {
          count = 10
          clearInterval(swalCountdownInterval)
        }
      });
  };

  const Seaching = async (e, name) => {
    setCurrent(1);
    if (name === "search") {
      setquery({ ...query, [e.target.name]: e.target.value });
    } else if (name === "") {
      GetData()
    }else{
      setquery({...query,[name] : e})
    }

    const Form = new FormData();
    Form.append("type", name == "type" ? e : query.type);
    Form.append("search", name == "search" ? e.target.value : query.search);
    const result = await API.post("/searching_brand", Form, { headers: { Authorization: `Bearer ${token}` } });
    setData(result.data.Data);

  }

  const Togglechange = async (id, e, name) => {
    console.log('id , e , name', id , e , name)
    var status;
    if (name === "status") {
      status = e === true ? 1 : 0;
    }
    const Form = new FormData();
    Form.append("id", id);
    Form.append("name", name);
    Form.append("status", status);
    const result = await API.post("/toggle_vehicale_category", Form, { headers: { Authorization: `Bearer ${token}` } });
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
        <h3 className="my-1">Categories</h3>
        <div className="page-heading-right">
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

          <Link to="/Add/Vehicale_Categoty" className="my-1 ms-3">
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
                      <th width="25%">Category Name</th>
                      <th width="20%">Thumb Image</th>
                      <th width="10%" >Status</th>
                      <th width="20%" className='text-center' >Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      getData1(current, size).map((val, i) => {
                        console.log('val', val)
                        return (
                          <tr>
                            <td className='text-center'>{(current === 1) ? i + 1 : current * size + i + 1 - size}</td>
                            <td>{val.name}</td>
                            <td>
                              <Fancybox>
                                <a href={val.image} data-fancybox="gallery">
                                  <img src={val.image} className="hv-40 rounded-3" alt="" />
                                </a>
                              </Fancybox>
                            </td>
                            <td>
                              <Switch
                                onChange={(e) => {
                                  Togglechange(val._id, e, "status");
                                }}
                                checked={val.status === 1 ? true : false}
                                offColor="#C8C8C8"
                                onColor="#0093ed"
                                height={30}
                                width={70}
                                name="status"
                                className="react-switch"
                                uncheckedIcon={
                                  <div className="react-switch-off">OFF</div>
                                }
                                checkedIcon={
                                  <div className="react-switch-on">ON</div>
                                }
                              />
                            </td>
                            {/* <td>1</td> */}
                            <td className='text-center'>
                              <Link to={`/view/Vehicale_Categoty/${val._id}`}>
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

export default Vehicale_Categoty