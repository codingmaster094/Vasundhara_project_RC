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

var Category_Array = []
var Brand_Array = []
var vehicle_Array = []
var Page_array = [];
const Variant_specification = () => {
    const token = Cookies.get("fmljwt");
    const [Data, setData] = useState([])
    const [perPage, setPerPage] = useState(10);
    const [size, setSize] = useState(perPage);
    const [current, setCurrent] = useState(1);
    const [PageHook, setPageHook] = useState([])
    const [CategoryName, setCategoryName] = useState([])
    const [BrandName, setBrandName] = useState([])
    const [VehicleName, setVehicleName] = useState([])
    const [loading, setloading] = useState(true)
    const [query, setquery] = useState({
        VeriantID: "",
        categoryId: "",
        BrandId: "",
        VehicleID:""
    });
    const GetData = async () => {
        const result = await API.post("/GET/Specification_Variant", {}, { headers: { Authorization: `Bearer ${token}` } })
        console.log('result', result)
        setData(result.data.Data)
        PageGetData()
        Category_dropdown()
        Brand_dropdown()
        Vehicle_dropdown()
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

    const Category_dropdown = async () => {
        const Result = await API.post("/get/vehicle/category", {}, { headers: { Authorization: `Bearer ${token}` } })
        console.log('Result', Result)
        Category_Array = []
        Category_Array.push({ label: "Select category", value: "" })
        Result.data.data.map((val) => {
            Category_Array.push({ label: val.name, value: val._id })
        })
        setCategoryName(Category_Array)
    }

    const Brand_dropdown = async () => {
        const Result = await API.post("/get/vehicle/brand", {}, { headers: { Authorization: `Bearer ${token}` } })
        console.log('Result', Result)
        Brand_Array = []
        Brand_Array.push({ label: "Select Brand", value: "" })
        Result.data.data.map((val) => {
            Brand_Array.push({ label: val.name, value: val._id })
        })
        setBrandName(Brand_Array)
    }

    const Vehicle_dropdown = async () => {
        const Result = await API.post("/get/vehicleinformation", {}, { headers: { Authorization: `Bearer ${token}` } })
        console.log('Result', Result)
        vehicle_Array = []
        vehicle_Array.push({ label: "Select Vehicle Name", value: "" })
        Result.data.data.map((val) => {
            vehicle_Array.push({ label: val.name, value: val._id })
        })
        setVehicleName(vehicle_Array)
    }


    const Togglechange = async (id, e, name) => {
        var upcoming;
        var latest;
        if (name === "upcoming") {
            upcoming = e === true ? 1 : 0;
        }
        if (name === "latest") {
            latest = e === true ? 1 : 0;
        }
        const Form = new FormData();
        Form.append("id", id);
        Form.append("name", name);
        Form.append("upcoming", upcoming);
        Form.append("latest", latest);
        const result = await API.post("/Toggle/vehicleinformation", Form, { headers: { Authorization: `Bearer ${token}` } });
        if (result) {
            toast.success(" status Update successfully");
            GetData();
        }
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
                    await API.post(`/Delete/Specification_Table_data`, form, { headers: { Authorization: `Bearer ${token}` } });
                    GetData();
                } else {
                    count = 10
                    clearInterval(swalCountdownInterval)
                }
            });
    };

    const Seaching = async (e, name) => {
        setCurrent(1);
        if (name === "VeriantID") {
            setquery({ ...query, [e.target.name]: e.target.value });
        } else if (name === "") {
            GetData()
        } else {
            setquery({ ...query, [name]: e })
        }
        const Form = new FormData();
        Form.append("VeriantID", name == "VeriantID" ? e.target.value : query.VeriantID);
        Form.append("categoryId", name == "categoryId" ? e : query.categoryId);
        Form.append("BrandId", name == "BrandId" ? e : query.BrandId);
        Form.append("VehicleID", name == "VehicleID" ? e : query.VehicleID);
        const result = await API.post("/Searching/Specification_Variant", Form, { headers: { Authorization: `Bearer ${token}` } });
        setData(result.data.Data);
    }

    useEffect(() => {
        GetData()
    }, [])
    return (
        <Layout sidebar={true}>
            <div className="page-heading">
                <h3 className="my-1">Vehicle Variant</h3>
                <div className="page-heading-right">
                    <Form.Control
                        type="text"
                        name="VeriantID"
                        id=""
                        placeholder="Search Brand Name"
                        className="wv-200 my-1 ms-3"
                        onChange={(e) => Seaching(e, "VeriantID")}

                    />
                    <SelectPicker
                        cleanable={false}
                        data={CategoryName}
                        searchable={false}
                        defaultValue={""}
                        className="wv-200 my-1 ms-3"
                        placeholder="Select State"
                        // value={search[2].search.status}
                        onChange={(e) => Seaching(e, "categoryId")}
                    />

                    <SelectPicker
                        cleanable={false}
                        data={BrandName}
                        searchable={false}
                        defaultValue={""}
                        className="wv-200 my-1 ms-3"
                        placeholder="Select State"
                        // value={search[2].search.status}
                        onChange={(e) => Seaching(e, "BrandId")}
                    />

                    <SelectPicker
                        cleanable={false}
                        data={VehicleName}
                        searchable={false}
                        defaultValue={""}
                        className="wv-200 my-1 ms-3"
                        placeholder="Select State"
                        // value={search[2].search.status}
                        onChange={(e) => Seaching(e, "VehicleID")}
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

                    <Link to="/Add/Variant_specification" className="my-1 ms-3">
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
                                            <th width="30%">Variant Name</th>
                                            <th width="10%">Fule Type</th>
                                            <th width="10%" >Variant Image</th>
                                            <th width="15%" className='text-center' >Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            getData1(current, size).map((val, i) => {
                                                return (
                                                    <tr>
                                                          <td className='text-center'>{(current === 1) ? i + 1 : current * size + i + 1 - size}</td>
                                                        <td>{val.Vehicle_Variant_id.name}</td>
                                                        <td>{val.Vehicle_Variant_id.fuel_type}</td>
                                                        <td>
                                                            <Fancybox>
                                                                <a href={val.Vehicle_Variant_id.variant_image} data-fancybox="gallery">
                                                                    <img src={val.Vehicle_Variant_id.variant_image} className="hv-40 rounded-3" alt="" />
                                                                </a>
                                                            </Fancybox>
                                                        </td>
                                                        <td className='text-center'>
                                                            <Link to={`/view/Variant_specification/${val._id}`}>
                                                                <Button variant="outline-warning" size="sm" className="me-2 btn-icon"><i className='bx bx-show'></i></Button>
                                                            </Link>
                                                            <Button variant="outline-danger" size="sm" onClick={() =>  DeleteData(val._id)} className="btn-icon"><i className='bx bx-trash-alt' ></i></Button>
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

export default Variant_specification