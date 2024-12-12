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

var status_array = [];
var Typr_array = [];
var Page_array = [];
const RC_DL_Info = () => {
    const token = Cookies.get("fmljwt");
    const [Data, setData] = useState([])
    const [perPage, setPerPage] = useState(10);
    const [size, setSize] = useState(perPage);
    const [current, setCurrent] = useState(1);
    const [statusHook, setstatusHook] = useState([])
    const [TypeHook, setTypeHook] = useState([])
    const [PageHook, setPageHook] = useState([])
    const [loading, setloading] = useState(true)
    const [query, setquery] = useState({
        search: "",
        status: "",
        type: ""
    });
    const Togglechange = async (id, e, name) => {
        var status;
        if (name === "status") {
            status = e === true ? 1 : 0;
        }
        const Form = new FormData();
        Form.append("id", id);
        Form.append("name", name);
        Form.append("status", status);
        const result = await API.post("/toggle_RC_DL_information", Form, { headers: { Authorization: `Bearer ${token}` } });
        if (result) {
            toast.success(" status Update successfully");
            GetData();
        }
    };


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

    const GetData = async () => {
        if (query.type !== "" || query.status || query.search) {
            const Form = new FormData()
            Form.append("type", query.type)
            Form.append("status", query.status)
            Form.append("search", query.search)
            const Result = await API.post("/searching_RC_DL_information", Form, { headers: { Authorization: `Bearer ${token}` } })
            console.log('Result', Result)
            if (Result.data.Data === 0) {
                setData([])
            } else {
                setData(Result.data.Data)
            }
        } else {
        const Result = await API.post("/Get_RC_DL_information", {}, { headers: { Authorization: `Bearer ${token}` } })
        setData(Result.data.Data)
        StatusGetData()
        TypeGetData()
        PageGetData()
        setloading(false)
        }
    }

    useEffect(() => {
        GetData()
    }, [])

    const PageGetData = async () => {
        var PageNumber = [10, 25, 50, 100]
        Page_array = []
        PageNumber.map((val, index) => {
          Page_array.push({ label: val, value: val })
        })
        setPageHook(Page_array)
      };

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
                    await API.post(`/Delete_RC_DL_information`, form, { headers: { Authorization: `Bearer ${token}` } });
                    GetData();
                } else {
                    count = 10
                    clearInterval(swalCountdownInterval)
                }
            });
    };
    const StatusGetData = async () => {
        var status = ["Active", "Deactive"]
        status_array = []
        status_array.push({ label: "All Status", value: "" })
        status.map((val, index) => {
            status_array.push({ label: val, value: val })
        })
        setstatusHook(status_array)
    };
    const TypeGetData = async () => {
        var status = ["DL", "RC"]
        Typr_array = []
        Typr_array.push({ label: "All Type", value: "" })
        status.map((val, index) => {
            Typr_array.push({ label: val, value: val })
        })
        setTypeHook(Typr_array)
    };

    const Seaching = async (e, name) => {
        setCurrent(1);
        if (name === "search") {
            setquery({ ...query, [e.target.name]: e.target.value });
        } else if (name === "") {
            GetData()
        }
        else {
            setquery({ ...query, [name]: e });
        }
        const Form = new FormData();
        Form.append("search", name == "search" ? e.target.value : query.search);
        Form.append("status", name == "status" ? e : query.status);
        Form.append("type", name == "type" ? e : query.type);
        const result = await API.post("/searching_RC_DL_information", Form, { headers: { Authorization: `Bearer ${token}` } });
        setData(result.data.Data);

    }

    return (
        <Layout sidebar={true}>
            <div className="page-heading">
                <h3 className="my-1">DL - RC Info</h3>
                <div className="page-heading-right">
                    <SelectPicker
                        cleanable={false}
                        data={TypeHook}
                        searchable={false}
                        defaultValue={""}
                        className="wv-200 my-1 ms-3"
                        placeholder="Select Type"
                        // value={search[2].search.status}
                        onChange={(e) => Seaching(e, "type")}
                    />
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
                    <Form.Control
                        type="text"
                        name="search"
                        id=""
                        placeholder="Search DL-RC Title Here"
                        className="wv-200 my-1 ms-3"
                        // value={search[2].search.name}
                        onChange={(e) => Seaching(e, "search")}

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
                    <Link to="/Add/DL_RC_info" className="my-1 ms-3">
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
                                            <th width="2%" className="text-center">No</th>
                                            <th width="2%">Type</th>
                                            <th width="14%" className="text-center">Title</th>
                                            <th width="5%" className="text-center">Thumb Image</th>
                                            <th width="5%" className="text-center">En</th>
                                            <th width="5%" className="text-center">Hi</th>
                                            <th width="5%" className="text-center">Mr</th>
                                            <th width="5%" className="text-center">Gu</th>
                                            <th width="5%" className="text-center">Ta</th>
                                            <th width="5%" className="text-center">Te</th>
                                            <th width="5%" className="text-center">Kn</th>
                                            <th width="5%" className="text-center">Bn</th>
                                            <th width="5%" className="text-center">Ml</th>
                                            <th width="5%" className="text-center">Or</th>
                                            <th width="5%" className="text-center">Pa</th>
                                            <th width="8%" className="text-center">Status</th>
                                            <th width="14%" className='text-center'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            getData1(current, size).map((val, i) => {
                                                return (
                                                    <tr>
                                                        <td className='text-center'>{(current === 1) ? i + 1 : current * size + i + 1 - size}</td>
                                                        <td>{val.type}</td>
                                                        <td>{val.title}</td>
                                                        <td className="text-center">
                                                            <Fancybox>
                                                                <a href={val.thumb_image} data-fancybox="gallery">
                                                                    <img src={val.thumb_image} className="hv-40 rounded-3" alt="" />
                                                                </a>
                                                            </Fancybox>
                                                        </td>
                                                        <td className="text-center">
                                                            <a href={val.en} target="_blank" >
                                                                <Button variant="outline-info" size="sm" className="btn-icon">
                                                                    <i className="bx bx-link-external"></i>
                                                                </Button>
                                                            </a>
                                                        </td>
                                                        <td className="text-center">
                                                            <a href={val.hi} target="_blank" >
                                                                <Button variant="outline-info" size="sm" className="btn-icon">
                                                                    <i className="bx bx-link-external"></i>
                                                                </Button>
                                                            </a>
                                                        </td>
                                                        <td className="text-center">
                                                            <a href={val.mr} target="_blank" >
                                                                <Button variant="outline-info" size="sm" className="btn-icon">
                                                                    <i className="bx bx-link-external"></i>
                                                                </Button>
                                                            </a>
                                                        </td>
                                                        <td className="text-center">
                                                            <a href={val.gu} target="_blank" >
                                                                <Button variant="outline-info" size="sm" className="btn-icon">
                                                                    <i className="bx bx-link-external"></i>
                                                                </Button>
                                                            </a>
                                                        </td>
                                                        <td className="text-center">
                                                            <a href={val.ta} target="_blank" >
                                                                <Button variant="outline-info" size="sm" className="btn-icon">
                                                                    <i className="bx bx-link-external"></i>
                                                                </Button>
                                                            </a>
                                                        </td>
                                                        <td className="text-center">
                                                            <a href={val.te} target="_blank" >
                                                                <Button variant="outline-info" size="sm" className="btn-icon">
                                                                    <i className="bx bx-link-external"></i>
                                                                </Button>
                                                            </a>
                                                        </td>
                                                        <td className="text-center">
                                                            <a href={val.kn} target="_blank" >
                                                                <Button variant="outline-info" size="sm" className="btn-icon">
                                                                    <i className="bx bx-link-external"></i>
                                                                </Button>
                                                            </a>
                                                        </td>
                                                        <td className="text-center">
                                                            <a href={val.bn} target="_blank" >
                                                                <Button variant="outline-info" size="sm" className="btn-icon">
                                                                    <i className="bx bx-link-external"></i>
                                                                </Button>
                                                            </a>
                                                        </td>
                                                        <td className="text-center">
                                                            <a href={val.ml} target="_blank" >
                                                                <Button variant="outline-info" size="sm" className="btn-icon">
                                                                    <i className="bx bx-link-external"></i>
                                                                </Button>
                                                            </a>
                                                        </td>
                                                        <td className="text-center">
                                                            <a href={val.or} target="_blank" >
                                                                <Button variant="outline-info" size="sm" className="btn-icon">
                                                                    <i className="bx bx-link-external"></i>
                                                                </Button>
                                                            </a>
                                                        </td>
                                                        <td className="text-center">
                                                            <a href={val.pa} target="_blank" >
                                                                <Button variant="outline-info" size="sm" className="btn-icon">
                                                                    <i className="bx bx-link-external"></i>
                                                                </Button>
                                                            </a>
                                                        </td>
                                                        <td className='text-center'>
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
                                                        </td>
                                                        <td className='text-center'>
                                                            <Link to={`/view/DL_RC_info/${val._id}`}>
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

export default RC_DL_Info