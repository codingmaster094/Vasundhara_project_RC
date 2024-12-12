import React, { useState } from "react";
import { Row, Col, Card, Button, Table, Form, InputGroup, Image, Breadcrumb } from 'react-bootstrap';
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from '../../layout/Layout';
import Switch from 'react-switch'
import { API } from "../../App";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { SelectPicker } from "rsuite";

var Category_Array = []
var Brand_Array = []
var Vehicale_name = []
var Variant_name = []
var Specificaton_Data = []
var Key_Specificaton_Data = []
const Variant_specification_edit = () => {
  const token = Cookies.get("fmljwt");
  const [Category_Name, setCategory_Name] = useState([])
  const [Brand_Name, setBrand_Name] = useState([])
  const [Vehicle__Name, setVehicle__Name] = useState([])
  const [Variant_Name, setVariant_Name] = useState([])
  const params = useParams()
  const navigate = useNavigate()
  const [validated, setvalidated] = useState(false)
  const [Data, setData] = useState([{
    category_id: "",
    brand_id: "",
    vehicle_id: "",
    Variant_id: "",
  }])

  const [SpecificationDATA, setSpecificationDATA] = useState([])
  const [Key_SpecificationDATA, setKey_SpecificationDATA] = useState([])
  const [AddMoreSpecification, setAddMoreSpecification] = useState([{
    specification: "",
    specification_name: "",
    specification_value: "",
    key_specification: "",
    is_feature: 0,
    is_specification: 0,
    is_overview: 0,
  }])

  const GetData = async()=>{
    const result = await API.post(`/ViewData/Specification_Variant/${params.id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
    console.log('result===>', result)
    setData(
      {
        category_id: result.data.Data[0].category_id._id,
        brand_id: result.data.Data[0].brand_id._id,
        vehicle_id: result.data.Data[0].Vehicle_name_id._id,
        Variant_id: result.data.Data[0].Vehicle_Variant_id._id,
      }
    )
  }

  const [ShowColorModal, setShowColorModal] = useState(false)
  const addspecificationRow = async () => {
    setShowColorModal(true)
    if (ShowColorModal == true) {
    setAddMoreSpecification([
      ...AddMoreSpecification,
      {
        specification: "",
        specification_name: "",
        specification_value: "",
        key_specification: "",
        is_feature: 0,
        is_specification: 0,
        is_overview: 0,
      }
    ])
  }
  }

  const removespecificationRow = async (i, d) => {
    if (i == undefined) {
      let SpcificatonDatas = [...AddMoreSpecification]
      SpcificatonDatas.splice(d, 1)
      setAddMoreSpecification(SpcificatonDatas)
    } else {
      let SpcificatonDatas = [...AddMoreSpecification]
      SpcificatonDatas.splice(d, 1)
      setAddMoreSpecification(SpcificatonDatas)
    }

  }

  const Specification_dropdown = async () => {
    const resut = await API.post("/get/specification", {}, { headers: { Authorization: `Bearer ${token}` } });
    Specificaton_Data = []
    Specificaton_Data.push({ label: "Select Specififcation", value: "" })
    resut.data.data.map((val, index) => {
      Specificaton_Data.push({ label: val.name, value: val._id })
    })
    setSpecificationDATA(Specificaton_Data)
  }

  const Specificaton_Hendler = async (e, index, name) => {
    const updatedRows = [...AddMoreSpecification];
    updatedRows[index][name] = e;
    setAddMoreSpecification(updatedRows);
  };

  const Key_Specification_dropdown = async () => {
    const resut = await API.post("/get/Key_specification", {}, { headers: { Authorization: `Bearer ${token}` } });
    Key_Specificaton_Data = []
    Key_Specificaton_Data.push({ label: "Select Key Specififcation", value: "" })
    resut.data.data.map((val, index) => {
      Key_Specificaton_Data.push({ label: val.name, value: val._id })
    })
    setKey_SpecificationDATA(Key_Specificaton_Data)
  }

  const Key_Specificaton_Hendler = async (e, index, name) => {
    const updatedRows = [...AddMoreSpecification];
    updatedRows[index][name] = e;
    setAddMoreSpecification(updatedRows);
  };


  const Category_dropdown = async () => {
    const resut = await API.post("/get/vehicle/category", {}, { headers: { Authorization: `Bearer ${token}` } });
    Category_Array = []
    Category_Array.push({ label: "Select Category", value: "" })
    resut.data.data.map((val, index) => {
      Category_Array.push({ label: val.name, value: val._id })
    })
    setCategory_Name(Category_Array)
  }

  const Brand_dropdown = async (e) => {
    const Form = new FormData()
    Form.append("Brand", e)
    const resut = await API.post("/Get/Brand", Form, { headers: { Authorization: `Bearer ${token}` } });
    Brand_Array = []
    Brand_Array.push({ label: "Select Brand", value: "" })
    resut.data.map((val, index) => {
      Brand_Array.push({ label: val.name, value: val._id })
    })
    setBrand_Name(Brand_Array)
  }

  const Vehicle_dropdown = async (e) => {
    const Form = new FormData()
    Form.append("BrandID", e)
    const resut = await API.post("/get/vehicle_name_get", Form, { headers: { Authorization: `Bearer ${token}` } });
    Vehicale_name = []
    Vehicale_name.push({ label: "Select Vehicle Name", value: "" })
    resut.data.map((val, index) => {
      Vehicale_name.push({ label: val.name, value: val._id })
    })
    setVehicle__Name(Vehicale_name)
  }

  const Variant_dropdown = async (e) => {
    const Form = new FormData()
    Form.append("variantID", e)
    const resut = await API.post("/get/Variant_name_get", Form, { headers: { Authorization: `Bearer ${token}` } });
    Variant_name = []
    Variant_name.push({ label: "Select Variant Name", value: "" })
    resut.data.map((val, index) => {
      Variant_name.push({ label: val.name, value: val._id })
    })
    setVariant_Name(Variant_name)
  }

  const Category_Hendler = async (e, name) => {
    setData({ ...Data, [name]: e });
    Brand_dropdown(e)
  };

  const Brand_Hendler = async (e, name) => {
    setData({ ...Data, [name]: e });
    Vehicle_dropdown(e)
  };

  const Vehicle_Hendler = async (e, name) => {
    setData({ ...Data, [name]: e });
    Variant_dropdown(e)
  };

  const Variant_Hendler = async (e, name) => {
    setData({ ...Data, [name]: e });
    // GetSpecification()
  };

  const GetSpecification = async () => {
    const Form = new FormData()
    Form.append('categoryId', Data.category_id)
    Form.append('BrandId', Data.brand_id)
    Form.append('VehicleID', Data.vehicle_id)
    Form.append('VeriantID', Data.Variant_id)
    const Result = await API.post('/ID_Wise_Data_get/Specification_Variant', Form)
    // setAddMoreSpecification(Result.data.Data)
  }

  const SaveData = (e, index) => {
    const { name, value } = e.target;
    const updatedRows = [...AddMoreSpecification];
    updatedRows[index][name] = value;
    setAddMoreSpecification(updatedRows);
  }

  const returnStatus = (e, index, name) => {
    let data = [...AddMoreSpecification];
    if (name == "is_feature") {
      data[index]['is_feature'] = e == true ? 1 : 0
      setAddMoreSpecification(data)
    }
    if (name == "is_specification") {
      data[index]['is_specification'] = e == true ? 1 : 0
      setAddMoreSpecification(data)
    }
    if (name == "is_overview") {
      data[index]['is_overview'] = e == true ? 1 : 0
      setAddMoreSpecification(data)
    }
  }


  useEffect(() => {
    Category_dropdown()
    Specification_dropdown()
    Key_Specification_dropdown()
    GetData()
  }, [])

  const Submite = async () => {
      let count = 0
      AddMoreSpecification.map((vals, ind) => {
        if (vals.specification_name == "" || vals.specification_value == "") {
          count++
        }
      })
      if (count !== 0) {
        setvalidated(true)
      } else {
        const Form = new FormData()
        Form.append("category_id", Data.category_id)
        Form.append("brand_id", Data.brand_id)
        Form.append("vehicle_id", Data.vehicle_id)
        Form.append("Variant_id", Data.Variant_id)
        AddMoreSpecification.forEach((row, index) => {
          Form.append(`_ID-${index}`, row._id);
          Form.append(`specification-${index}`, row.specification);
          Form.append(`key_specification-${index}`, row.key_specification);
          Form.append(`specification_name-${index}`, row.specification_name);
          Form.append(`specification_value-${index}`, row.specification_value);
          Form.append(`is_feature-${index}`, row.is_feature);
          Form.append(`is_overview-${index}`, row.is_overview);
          Form.append(`is_specification-${index}`, row.is_specification);
        });
        const result = await API.post('/add/Specification_Variant', Form)
        console.log('result', result)
        if(result){
          toast.success("Data Save Successfuly")
          navigate("/Variant_specification")
        }
      }
  }

  useEffect(() => {
    if(Data.category_id != undefined || Data.brand_id !=undefined || Data.vehicle_id){
      Brand_dropdown(Data.category_id)
      Vehicle_dropdown(Data.brand_id)
      Variant_dropdown(Data.vehicle_id)
    }
  }, [Data.category_id , Data.brand_id  , Data.vehicle_id])

  return (
    <Layout sidebar={true}>
      <div className="page-heading">
        <h3>Vehicle Variant Add</h3>
        <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
          <Breadcrumb.Item >
            <Link to="/"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item >
            <Link to="/Variant_specification">Vehicle Variant</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Create Vehicle Variant</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="page-content">
        <Form noValidate validated={validated}>
          <Row>
            <Col xs={12}>
              <Card className="mb-4">
                <Card.Body>
                  <Row>
                    <Col md={3}>
                      <Form.Label htmlFor="icon">Category</Form.Label>
                      <SelectPicker
                        cleanable={false}
                        data={Category_Name}
                        searchable={false}
                        name="category_id  "
                        value={Data.category_id ? Data.category_id : "" }
                        className="my-2"
                        block
                        placeholder="Select category_id"
                        onChange={(e) => Category_Hendler(e, "category_id")}
                      />
                    </Col>
                    <Col md={3}>
                      <Form.Label htmlFor="icon">Brand</Form.Label>
                      <SelectPicker
                        cleanable={false}
                        data={Brand_Name}
                        searchable={false}
                        name="brand_id"
                        value={Data.brand_id ? Data.brand_id : "" }
                        className="my-2"
                        block
                        placeholder="Select Brand"
                        onChange={(e) => Brand_Hendler(e, "brand_id")}
                      />
                    </Col>
                    <Col md={3}>
                      <Form.Label htmlFor="icon">Vehicle Name</Form.Label>
                      <SelectPicker
                        cleanable={false}
                        data={Vehicle__Name}
                        searchable={false}
                        name="vehicle_id"
                        value={Data.vehicle_id ? Data.vehicle_id : "" }
                        className="my-2"
                        block
                        placeholder="Select Body Type"
                        onChange={(e) => Vehicle_Hendler(e, "vehicle_id")}
                      />
                    </Col>
                    <Col md={3}>
                      <Form.Label htmlFor="icon">Vehicle Variant</Form.Label>
                      <SelectPicker
                        cleanable={false}
                        data={Variant_Name}
                        searchable={false}
                        name="Variant_id  "
                        value={Data.Variant_id ? Data.Variant_id : "" }
                        className="my-2"
                        block
                        placeholder="Select Body Type"
                        onChange={(e) => Variant_Hendler(e, "Variant_id")}
                      />
                    </Col>
                    {
                      Data.Variant_id !== undefined ?
                        <Button
                          variant="primary"
                          className="m-2 wv-200"
                          onClick={addspecificationRow}
                        >
                          Add More Specification
                        </Button>
                        : ""
                    }
                    {
                      ShowColorModal == true &&
                      Data.Variant_id !== undefined ?
                        AddMoreSpecification.map((val, i) => (
                          <Row>
                            {console.log('val', val)}
                            <Col md={3}>
                              <Form.Label htmlFor="icon">Specification</Form.Label>
                              <SelectPicker
                                cleanable={false}
                                data={SpecificationDATA}
                                searchable={false}
                                name="specification"
                                value={val.specification}
                                className="my-2"
                                block
                                placeholder="Select category_id"
                                onChange={(e) => Specificaton_Hendler(e, i, "specification")}
                              />
                            </Col>

                            <Col md={3}>
                              <Form.Label htmlFor="color_code">Specification Name</Form.Label>
                              <Form.Control
                                type="text"
                                className="my-2"
                                name="specification_name"
                                value={val.specification_name}
                                onChange={(e) => SaveData(e, i)}
                                required
                              />
                              <Form.Control.Feedback type="invalid">
                                Specification_name Field Is Require
                              </Form.Control.Feedback>
                            </Col>

                            <Col md={3}>
                              <Form.Label htmlFor="color_code">Specification Value</Form.Label>
                              <Form.Control
                                type="text"
                                className="my-2"
                                name="specification_value"
                                value={val.specification_value}
                                onChange={(e) => SaveData(e, i)}
                                required
                              />
                              <Form.Control.Feedback type="invalid">
                                Specification_value Field Is Require
                              </Form.Control.Feedback>
                            </Col>
                            <Col md={1}>
                              <Form.Label htmlFor="color_code">Is Feature</Form.Label>
                              <Switch
                                offColor="#C8C8C8"
                                onColor="#0093ed"
                                checked={val.is_feature}
                                onChange={(e) => returnStatus(e, i, "is_feature")}
                                height={30}
                                width={70}
                                name="is_feature"
                                className="react-switch"
                                uncheckedIcon={
                                  <div className="react-switch-off">OFF</div>
                                }
                                checkedIcon={
                                  <div className="react-switch-on">ON</div>
                                }
                              />
                            </Col>
                            <Col md={1}>
                              <Form.Label htmlFor="color_code">Is Specification</Form.Label>
                              <Switch
                                offColor="#C8C8C8"
                                onColor="#0093ed"
                                checked={val.is_specification}
                                onChange={(e) => returnStatus(e, i, "is_specification")}
                                height={30}
                                width={70}
                                name="is_specification"
                                className="react-switch"
                                uncheckedIcon={
                                  <div className="react-switch-off">OFF</div>
                                }
                                checkedIcon={
                                  <div className="react-switch-on">ON</div>
                                }
                              />
                            </Col>

                            <Col md={1}>
                              <Form.Label htmlFor="color_code">Is Overview</Form.Label>
                              <Switch
                                offColor="#C8C8C8"
                                onColor="#0093ed"
                                checked={val.is_overview}
                                onChange={(e) => returnStatus(e, i, "is_overview")}
                                height={30}
                                width={70}
                                name="is_overview"
                                className="react-switch"
                                uncheckedIcon={
                                  <div className="react-switch-off">OFF</div>
                                }
                                checkedIcon={
                                  <div className="react-switch-on">ON</div>
                                }
                              />
                            </Col>
                            <Col md={3}>
                              <Form.Label htmlFor="icon">Key Specification</Form.Label>
                              <SelectPicker
                                cleanable={false}
                                data={Key_SpecificationDATA}
                                searchable={false}
                                name="key_specification"
                                value={val.key_specification}
                                className="my-2"
                                block
                                placeholder="Select Key_specification"
                                onChange={(e) => Key_Specificaton_Hendler(e, i, "key_specification")}
                              />
                            </Col>

                            <Col md={1} className="d-flex align-self-end mb-2 justify-content-end">
                              <Button
                                variant="danger"
                                className="btn-icon-lg"
                                onClick={() => removespecificationRow(val._id, i)}
                              >
                                <i class='bx bx-minus' ></i>
                              </Button>
                            </Col>
                          </Row>
                        ))
                        : ""
                    }
                  </Row>
                </Card.Body>
                <Card.Footer className="text-end">
                  <Button variant="primary" onClick={Submite} className="me-3">Save</Button>
                  <Link to='/Variant_specification'>
                    <Button variant="secondary">Cancle</Button>
                  </Link>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Form>
      </div>
    </Layout>
  )
}

export default Variant_specification_edit