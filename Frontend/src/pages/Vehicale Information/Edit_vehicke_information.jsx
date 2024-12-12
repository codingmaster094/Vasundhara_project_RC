import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import { Row, Col, Card, Button, Form, Breadcrumb, InputGroup, Image } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import { API } from '../../App';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import Select from "react-select"
import Switch from "react-switch";
import { SelectPicker } from "rsuite";
import dayjs from 'dayjs'
import Swal from "sweetalert2";

var Category_Array = []
var Brand_Array = []
var Body_Type_Array = []

const Edit_vehicke_information = () => {
  const token = Cookies.get("fmljwt");
  const params = useParams()
  const navigate = useNavigate()
  const [validated, setvalidated] = useState(false)
  const [Update, setUpdate] = useState(0)
  const [DesUpdate, setDesUpdate] = useState(0)
  const [image, setimage] = useState([])
  const [thumb_image, setthumb_image] = useState([])
  const [Data, setData] = useState([{
    category_id: null,
    brand_id: null,
    body_id: null,
    name: "",
    fuel_type: "",
    rating: "",
    review: "",
    min_price: "",
    max_price: "",
    varient_name: "",
    price_range: "",
    status: "",
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
    manu_des: "",
    price_des: "",
    high_des: "",
    key_specs: "",
    seo_note: ""
  }])
  const [Category_Name, setCategory_Name] = useState([])
  const [Brand_Name, setBrand_Name] = useState([])
  const [Body_type__Name, setBody_type__Name] = useState([])


  const SaveData = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value })
  }

  const upcomigHendler = (e) => {
    const Result = e == true ? 1 : 0
    setData({
      category_id: Data.category_id,
      brand_id: Data.brand_id,
      body_id: Data.body_id,
      name: Data.name,
      fuel_type: Data.fuel_type,
      rating: Data.rating,
      review: Data.review,
      min_price: Data.min_price,
      max_price: Data.max_power,
      varient_name: Data.varient_name,
      price_range: Data.price_range,
      status: Data.status,
      image: Data.image,
      thumb_image: Data.thumb_image,
      launched_at: Data.launched_at.split("T")[0],
      launched_date: Data.launched_date.split("T")[0],
      popularity: Data.popularity,
      mileage: Data.mileage,
      engine: Data.engine,
      max_power: Data.max_power,
      showroom_price: Data.showroom_price,
      road_price: Data.road_price,
      rto_price: Data.rto_price,
      insurance_price: Data.insurance_price,
      other_price: Data.other_price,
      upcoming: Result,
      latest: Data.latest,
      manu_des: Data.manu_des,
      price_des: Data.price_des,
      high_des: Data.high_des,
      key_specs: Data.key_specs,
      seo_note: Data.seo_note,
    })
  }
  const latestHendler = (e) => {
    const Result = e == true ? 1 : 0
    setData({
      category_id: Data.category_id,
      brand_id: Data.brand_id,
      body_id: Data.body_id,
      name: Data.name,
      fuel_type: Data.fuel_type,
      rating: Data.rating,
      review: Data.review,
      min_price: Data.min_price,
      max_price: Data.max_power,
      varient_name: Data.varient_name,
      price_range: Data.price_range,
      status: Data.status,
      image: Data.image,
      thumb_image: Data.thumb_image,
      launched_at: Data.launched_at.split("T")[0],
      launched_date: Data.launched_date.split("T")[0],
      popularity: Data.popularity,
      mileage: Data.mileage,
      engine: Data.engine,
      max_power: Data.max_power,
      showroom_price: Data.showroom_price,
      road_price: Data.road_price,
      rto_price: Data.rto_price,
      insurance_price: Data.insurance_price,
      other_price: Data.other_price,
      upcoming: Data.upcoming,
      latest: Result,
      manu_des: Data.manu_des,
      price_des: Data.price_des,
      high_des: Data.high_des,
      key_specs: Data.key_specs,
      seo_note: Data.seo_note,
    })
  }

  const Getview = async (Eid) => {
    const result = await API.post(`/View/vehicleinformation/${params.id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
    setData({
      _id: result.data._id,
      category_id: result.data.category_id._id,
      brand_id: result.data.brand_id._id,
      body_id: result.data.body_id._id,
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
      launched_at: dayjs(result.data.launched_at).format("YYYY-MM-DD"),
      launched_date: dayjs(result.data.launched_date).format("YYYY-MM-DD"),
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
    })
    setModal_color_Data(result.data.Modal_color_Data)
    setVariant_Price(result.data.pricevariants)
  };

  const Category_dropdown = async () => {
    const resut = await API.post("/get/vehicle/category", {}, { headers: { Authorization: `Bearer ${token}` } });
    Category_Array = []
    Category_Array.push({ label: "Select Category", value: "" })
    resut.data.data.map((val, index) => {
      Category_Array.push({ label: val.name, value: val._id })
    })
    setCategory_Name(Category_Array)
    // Brand_dropdown(Data.category_id)
    // Body_Type_dropdown(params.Cate_id)
  }

  const Category_Hendler = async (e, name) => {
    setData({ ...Data, [name]: e});
    Brand_dropdown(e)
    Body_Type_dropdown(e)
  };

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

  const Brand_Hendler = async (e, name) => {
    setData({ ...Data, [name]: e });
  };

  const Body_Type_dropdown = async (e) => {
    const Form = new FormData()
    Form.append("type", e)
    const resut = await API.post("/Get/Body_Type", Form, { headers: { Authorization: `Bearer ${token}` } });
    Body_Type_Array = []
    Body_Type_Array.push({ label: "Select body Type", value: "" })
    resut.data.map((val, index) => {
      Body_Type_Array.push({ label: val.name, value: val._id })
    })
    setBody_type__Name(Body_Type_Array)
  }

  const Body_type_Hendler = async (e, name) => {
    setData({ ...Data, [name]: e });
  };

  // Modal Color Add
  const [Modal_color_Data, setModal_color_Data] = useState([{
    color_name: "",
    color_code: "",
    Modal_color_image: []
  }])

  const addReturnModalColor = () => {
    setModal_color_Data([
      ...Modal_color_Data,
      {
        color_name: "",
        color_code: "",
        Modal_color_image: []
      },
    ]);
  }

  const [ModalRecord_del, setModalRecord_del] = useState([])
  const [Record_Delete_show, setRecord_Delete_show] = useState(false)
  const removeReturnModalColor = async (i, d) => {
    if (i == undefined) {
      let ColorData = [...Modal_color_Data]
      ColorData.splice(d, 1)
      setModal_color_Data(ColorData)
    } else {
      let ColorData = [...Modal_color_Data]
      ColorData.splice(d, 1)
      setModal_color_Data(ColorData)
      setModalRecord_del(pre => [...pre, i])
      setRecord_Delete_show(true)
    }

  }

  const [Delete_ID, setDelete_ID] = useState([])
  const [Delete_show, setDelete_show] = useState(false)

  const Remove_image = async (val_id, img_id) => {
    setDelete_show(true)
    let ArrayData = [...Modal_color_Data];
    const updatedData = ArrayData.map(item => {
      const updatedImages =  item.Modal_color_image?.filter(img => img._id !== img_id)
      console.log('updatedImages', updatedImages)
      return { ...item, Modal_color_image: updatedImages };
    });
    setModal_color_Data(updatedData);
    setDelete_ID(pre => [...pre, img_id])

  }

  const SaveDataModalColor = (e, index) => {
    const { name, value } = e.target;
    const updatedRows = [...Modal_color_Data];
    updatedRows[index][name] = value;
    setModal_color_Data(updatedRows);
  }


  const SaveDataModalColorIcon = (e, index) => {
    var data = [...Modal_color_Data]
    var files = []
    for (var val of e.target.files) {
      files.push(val)
    }
    data[index][e.target.name] = files
    setModal_color_Data(data)
  }


  // Price Variant Add
  const [Variant_Price, setVariant_Price] = useState([{
    name: "",
    engine: "",
    price: "",
    price_range: "",
    status: "",
    fuel_type: "",
    ex_show_room_rice: "",
    mileage: "",
    on_road_price: "",
    latest_update: "",
    insurance_price: "",
    rto_price: "",
    other_price: "",
    review_count: "",
    rating: "",
    launched_at: "",
    is_scrapping: "",
    variant_image: []
  }])

  const addReturnPriceVariant = () => {
    setVariant_Price([
      ...Variant_Price,
      {
        name: "",
        engine: "",
        price: "",
        price_range: "",
        status: "",
        fuel_type: "",
        ex_show_room_rice: "",
        mileage: "",
        on_road_price: "",
        latest_update: "",
        insurance_price: "",
        rto_price: "",
        other_price: "",
        review_count: "",
        rating: "",
        launched_at: "",
        is_scrapping: "",
        variant_image: []
      },
    ]);
  }

  const [PriceRecord_del, setPriceRecord_del] = useState([])
  const [P_Record_Delete_show, setP_Record_Delete_show] = useState(false)
  const removeReturnPriceVariant = (index, d) => {
    if (index == undefined) {
      let PriceData = [...Variant_Price]
      PriceData.splice(d, 1)
      setVariant_Price(PriceData)
    } else {
      let PriceData = [...Variant_Price]
      PriceData.splice(d, 1)
      setVariant_Price(PriceData)
      setPriceRecord_del(pre => [...pre, index])
      setP_Record_Delete_show(true)
    }
  }

  const SaveDataPriceVariant = (e, index) => {
    const { name, value } = e.target;
    const updatedRows = [...Variant_Price];
    updatedRows[index][name] = value;
    setVariant_Price(updatedRows);
  }

  const returnChangePriceVariantIcon = (e, index) => {
    var data = [...Variant_Price]
    data[index][e.target.name] = e.target.files[0]
    setVariant_Price(data)
  }

  const Submite = async () => {
    if (Data.name == undefined || Data.fuel_type == undefined || Data.rating == undefined || Data.review == undefined || Data.min_price == undefined ||
      Data.max_price == undefined || Data.varient_name == undefined || Data.price_range == undefined || Data.status == undefined || Data.launched_at == undefined ||
      Data.launched_date == undefined || Data.popularity == undefined || Data.mileage == undefined || Data.engine == undefined || Data.max_power == undefined ||
      Data.showroom_price == undefined || Data.road_price == undefined || Data.insurance_price == undefined || Data.other_price == undefined || Data.manu_des == undefined ||
      Data.price_des == undefined || Data.high_des == undefined || Data.key_specs == undefined || Data.seo_note == undefined) {
      setvalidated(true)
    } else {
      let count = 0
      Modal_color_Data.map((val, ind) => {
        if (val.color_name === "" || val.color_code === "") {
          count++
        }
      })
      if (count !== 0) {
        setvalidated(true)
      } else {
        let count1 = 0
        Variant_Price.map((valData) => {
          if (valData.color_name === "" || valData.engine === "" || valData.price == "" || valData.price_range == "" || valData.status == "" || valData.fuel_type == "" ||
            valData.ex_show_room_rice === "" || valData.mileage === "" || valData.on_road_price == "" || valData.latest_update == "" || valData.insurance_price == "" || valData.rto_price == "" ||
            valData.other_price === "" || valData.review_count == "" || valData.rating == "" || valData.launched_at == "") {
            count1++
          }
        })
        if (count1 !== 0) {
          console.log("0")
          setvalidated(true)
        }
        else {

          const Form = new FormData()
          const DeleteForm = new FormData()
          const C_RecordDeleteForm = new FormData()
          const P_RecordDeleteForm = new FormData()
          Form.append("category_id", Data.category_id)
          Form.append("brand_id", Data.brand_id)
          Form.append("body_id", Data.body_id)
          Form.append("name", Data.name)
          Form.append("fuel_type", Data.fuel_type)
          Form.append("rating", Data.rating)
          Form.append("review", Data.review)
          Form.append("min_price", Data.min_price)
          Form.append("max_price", Data.max_price)
          Form.append("varient_name", Data.varient_name)
          Form.append("price_range", Data.price_range)
          Form.append("status", Data.status)
          Form.append("launched_at", Data.launched_at)
          Form.append("launched_date", Data.launched_date)
          Form.append("popularity", Data.popularity)
          Form.append("mileage", Data.mileage)
          Form.append("engine", Data.engine)
          Form.append("max_power", Data.max_power)
          Form.append("showroom_price", Data.showroom_price)
          Form.append("road_price", Data.road_price)
          Form.append("rto_price", Data.rto_price)
          Form.append("insurance_price", Data.insurance_price)
          Form.append("other_price", Data.other_price)
          Form.append("manu_des", Data.manu_des)
          Form.append("price_des", Data.price_des)
          Form.append("high_des", Data.high_des)
          Form.append("key_specs", Data.key_specs)
          Form.append("seo_note", Data.seo_note)
          Form.append("image", image)
          Form.append("thumb_image", thumb_image)
          Form.append("upcoming", Data.upcoming)
          Form.append("latest", Data.latest)
          Form.append("content_updated", Update)
          Form.append("designer_updated", DesUpdate)

          // Modal Image Color Add 
          Modal_color_Data.forEach((row, index) => {
            for (const file of row.Modal_color_image) {
              Form.append(`Modal_color_image-${index}`, file);
            }
            Form.append(`__id-${index}`, row._id);
            Form.append(`color_name-${index}`, row.color_name);
            Form.append(`color_code-${index}`, row.color_code);
          });

          if (Delete_show == true) {
            DeleteForm.append('Delete_IDS', JSON.stringify(Delete_ID))
            await API.post("delete/Image", DeleteForm)
          }

          if (Record_Delete_show == true) {
            C_RecordDeleteForm.append('RecordDelete_IDS', JSON.stringify(ModalRecord_del))
            const result = await API.post('/delete/ColorModal', C_RecordDeleteForm)
          }

          if (P_Record_Delete_show == true) {
            P_RecordDeleteForm.append('PriceRecordDelete_IDS', JSON.stringify(PriceRecord_del))
            const result = await API.post('/delete/PriceVariant', P_RecordDeleteForm)
          }

          // Price Variant Add
          Variant_Price.forEach((row, index) => {
            Form.append(`variant_image-${index}`, row.variant_image);
            Form.append(`_Price_id-${index}`, row._id);
            Form.append(`name-${index}`, row.name);
            Form.append(`engine-${index}`, row.engine);
            Form.append(`price-${index}`, row.price);
            Form.append(`price_range-${index}`, row.price_range);
            Form.append(`status-${index}`, row.status);
            Form.append(`fuel_type-${index}`, row.fuel_type);
            Form.append(`ex_show_room_rice-${index}`, row.ex_show_room_rice);
            Form.append(`mileage-${index}`, row.mileage);
            Form.append(`on_road_price-${index}`, row.on_road_price);
            Form.append(`latest_update-${index}`, row.latest_update);
            Form.append(`insurance_price-${index}`, row.insurance_price);
            Form.append(`rto_price-${index}`, row.rto_price);
            Form.append(`other_price-${index}`, row.other_price);
            Form.append(`review_count-${index}`, row.review_count);
            Form.append(`rating-${index}`, row.rating);
            Form.append(`launched_at-${index}`, row.launched_at);
          });
          const resut = await API.post(`/update/vehicleinformation/${params.id}`, Form)
          if (resut) {
            toast.success("Data Save Successfully")
            navigate(`/view/Vehicale_information/${params.id}`)
          }

        }
      }
    }
  }

  useEffect(() => {
    Category_dropdown()
    Getview()
  }, [])

  useEffect(() => {
    if(Data.category_id != undefined){
      Brand_dropdown(Data.category_id)
      Body_Type_dropdown(Data.category_id)
    }
  }, [Data.category_id])
  

  
  return (
    <Layout sidebar={true}>
      <div className="page-heading">
        <h3>Vehicle Information Edit</h3>
        <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
          <Breadcrumb.Item >
            <Link to="/"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item >
            <Link to="/Vehicle Information">Vehicle Information </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Create Vehicle Information</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="page-content">
        <Row>
          <Col xs={12}>
            <Card className="mb-4">
              <Card.Body>
                <Form noValidate >
                  <Row>
                    <Col xs={12}>
                      <div className="page-content">
                        {/**********************************************************  Add Vehicle Info *****************************************************************************************************/}
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
                                        name="category_id"
                                        value={Data.category_id}
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
                                        value={Data.brand_id}
                                        className="my-2"
                                        block 
                                        placeholder="Select Brand"
                                        onChange={(e) => Brand_Hendler(e, "brand_id")}
                                      />
                                    </Col>
                                    <Col md={3}>
                                      <Form.Label htmlFor="icon">Body Type</Form.Label>
                                      <SelectPicker
                                        cleanable={false}
                                        data={Body_type__Name}
                                        searchable={false}
                                        name="body_id  "
                                        value={Data.body_id}
                                        className="my-2"
                                        block
                                        placeholder="Select Body Type"
                                        onChange={(e) => Body_type_Hendler(e, "body_id")}
                                      />
                                    </Col>

                                    <Col md={3}>
                                      <Form.Label htmlFor="name">Model Name</Form.Label>
                                      <Form.Control
                                        type="text"
                                        className="my-2"
                                        name="name"
                                        required
                                        defaultValue={Data.name}
                                        onChange={SaveData}
                                      />
                                      <Form.Control.Feedback type="invalid">
                                        Model Name Field Is Require
                                      </Form.Control.Feedback>
                                    </Col>

                                    <Col md={3}>
                                      <Form.Label htmlFor="name">Fuel Type</Form.Label>
                                      <Form.Control
                                        type="text"
                                        className="my-2"
                                        name="fuel_type"
                                        required
                                        value={Data.fuel_type}
                                        onChange={SaveData}
                                      />
                                      <Form.Control.Feedback type="invalid">
                                        Fuel Type Field Is Require
                                      </Form.Control.Feedback>
                                    </Col>
                                    <Col md={3}>
                                      <Form.Label htmlFor="name">Avg Rating</Form.Label>
                                      <Form.Control
                                        type="number"
                                        className="my-2"
                                        name="rating"
                                        required
                                        value={Data.rating}
                                        onChange={SaveData}
                                      />
                                      <Form.Control.Feedback type="invalid">
                                        Avg Rating Field Is Require
                                      </Form.Control.Feedback>
                                    </Col>
                                    <Col md={3}>
                                      <Form.Label htmlFor="name">Review Count</Form.Label>
                                      <Form.Control
                                        type="number"
                                        className="my-2"
                                        name="review"
                                        required
                                        value={Data.review}
                                        onChange={SaveData}
                                      />
                                      <Form.Control.Feedback type="invalid">
                                        Review Count Field Is Require
                                      </Form.Control.Feedback>
                                    </Col>
                                    <Col md={3}>
                                      <Form.Label htmlFor="name">Minimum Price</Form.Label>
                                      <Form.Control
                                        type="number"
                                        className="my-2"
                                        name="min_price"
                                        required
                                        value={Data.min_price}
                                        onChange={SaveData}
                                      />
                                      <Form.Control.Feedback type="invalid">
                                        Minimum Price Field Is Require
                                      </Form.Control.Feedback>
                                    </Col>
                                    <Col md={3}>
                                      <Form.Label htmlFor="name">Maximum Price</Form.Label>
                                      <Form.Control
                                        type="number"
                                        className="my-2"
                                        name="max_price"
                                        required
                                        value={Data.max_price}
                                        onChange={SaveData}
                                      />
                                      <Form.Control.Feedback type="invalid">
                                        Maximum Price Field Is Require
                                      </Form.Control.Feedback>
                                    </Col>
                                    <Col md={3}>
                                      <Form.Label htmlFor="name">Variant Name</Form.Label>
                                      <Form.Control
                                        type="text"
                                        className="my-2"
                                        name="varient_name"
                                        required
                                        value={Data.varient_name}
                                        onChange={SaveData}
                                      />
                                      <Form.Control.Feedback type="invalid">
                                        Variant Name Field Is Require
                                      </Form.Control.Feedback>
                                    </Col>
                                    <Col md={3}>
                                      <Form.Label htmlFor="name">Price Range</Form.Label>
                                      <Form.Control
                                        type="text"
                                        className="my-2"
                                        name="price_range"
                                        required
                                        value={Data.price_range}
                                        onChange={SaveData}
                                      />
                                      <Form.Control.Feedback type="invalid">
                                        Price Range Field Is Require
                                      </Form.Control.Feedback>
                                    </Col>
                                    <Col md={3}>
                                      <Form.Label htmlFor="name">Status</Form.Label>
                                      <Form.Control
                                        type="text"
                                        className="my-2"
                                        name="status"
                                        required
                                        value={Data.status}
                                        onChange={SaveData}
                                      />
                                      <Form.Control.Feedback type="invalid">
                                        Status Field Is Require
                                      </Form.Control.Feedback>
                                    </Col>
                                    <Col md={3}>
                                      <Form.Label htmlFor="name">Image</Form.Label>
                                      <InputGroup className="my-2">
                                        <Form.Control
                                          type="file"
                                          name="image"
                                          onChange={(e) => setimage(e.target.files[0])}

                                        />
                                        <InputGroup.Text>
                                          <Image
                                            className="hv-30 rounded-3"
                                            src={Data.image}
                                          ></Image>
                                        </InputGroup.Text>
                                      </InputGroup>
                                    </Col>
                                    <Col md={3}>
                                      <Form.Label htmlFor="name">Thumb Image</Form.Label>
                                      <InputGroup className="my-2">
                                        <Form.Control
                                          type="file"
                                          name="thumb_image"
                                          onChange={(e) => setthumb_image(e.target.files[0])}
                                        />
                                        <InputGroup.Text>
                                          <Image
                                            className="hv-30 rounded-3"
                                            src={Data.thumb_image}
                                          ></Image>
                                        </InputGroup.Text>
                                      </InputGroup>
                                    </Col>
                                    <Col md={3}>
                                      <Form.Label htmlFor="name">Launched At</Form.Label>
                                      <Form.Control
                                        type="date"
                                        className="my-2"
                                        name="launched_at"
                                        required
                                        value={Data.launched_at}
                                        onChange={SaveData}
                                      />
                                      <Form.Control.Feedback type="invalid">
                                        Launched At Field Is Require
                                      </Form.Control.Feedback>
                                    </Col>
                                    <Col md={3}>
                                      <Form.Label htmlFor="name">Launched Date</Form.Label>
                                      <Form.Control
                                        type="date"
                                        className="my-2"
                                        name="launched_date"
                                        required
                                        value={Data.launched_date}
                                        onChange={SaveData}
                                      />
                                      <Form.Control.Feedback type="invalid">
                                        Launched Date Field Is Require
                                      </Form.Control.Feedback>
                                    </Col>
                                    <Col md={3}>
                                      <Form.Label htmlFor="name">Model Popularity</Form.Label>
                                      <Form.Control
                                        type="number"
                                        className="my-2"
                                        name="popularity"
                                        required
                                        value={Data.popularity}
                                        onChange={SaveData}
                                      />
                                      <Form.Control.Feedback type="invalid">
                                        Model Popularity Field Is Require
                                      </Form.Control.Feedback>
                                    </Col>
                                    <Col md={3}>
                                      <Form.Label htmlFor="name">Mileage</Form.Label>
                                      <Form.Control
                                        type="number"
                                        className="my-2"
                                        name="mileage"
                                        required
                                        value={Data.mileage}
                                        onChange={SaveData}
                                      />
                                      <Form.Control.Feedback type="invalid">
                                        Mileage Field Is Require
                                      </Form.Control.Feedback>
                                    </Col>
                                    <Col md={3}>
                                      <Form.Label htmlFor="name">Engine</Form.Label>
                                      <Form.Control
                                        type="number"
                                        className="my-2"
                                        name="engine"
                                        required
                                        value={Data.engine}
                                        onChange={SaveData}
                                      />
                                      <Form.Control.Feedback type="invalid">
                                        Engine Field Is Require
                                      </Form.Control.Feedback>
                                    </Col>
                                    <Col md={3}>
                                      <Form.Label htmlFor="name">Max Power</Form.Label>
                                      <Form.Control
                                        type="number"
                                        className="my-2"
                                        name="max_power"
                                        required
                                        value={Data.max_power}
                                        onChange={SaveData}
                                      />
                                      <Form.Control.Feedback type="invalid">
                                        Max Power Field Is Require
                                      </Form.Control.Feedback>
                                    </Col>

                                    <Col md={3}>
                                      <Form.Label htmlFor="name">Showroom Price</Form.Label>
                                      <Form.Control
                                        type="number"
                                        className="my-2"
                                        name="showroom_price"
                                        required
                                        value={Data.showroom_price}
                                        onChange={SaveData}
                                      />
                                      <Form.Control.Feedback type="invalid">
                                        Other Price Field Is Require
                                      </Form.Control.Feedback>
                                    </Col>

                                    <Col md={3}>
                                      <Form.Label htmlFor="name">On Road Price</Form.Label>
                                      <Form.Control
                                        type="number"
                                        className="my-2"
                                        name="road_price"
                                        required
                                        value={Data.road_price}
                                        onChange={SaveData}
                                      />
                                      <Form.Control.Feedback type="invalid">
                                        On Road Price Field Is Require
                                      </Form.Control.Feedback>
                                    </Col>

                                    <Col md={3}>
                                      <Form.Label htmlFor="name">RTO Price</Form.Label>
                                      <Form.Control
                                        type="number"
                                        className="my-2"
                                        name="rto_price"
                                        required
                                        value={Data.rto_price}
                                        onChange={SaveData}
                                      />
                                      <Form.Control.Feedback type="invalid">
                                        RTO Price Field Is Require
                                      </Form.Control.Feedback>
                                    </Col>

                                    <Col md={3}>
                                      <Form.Label htmlFor="name">Insurance Price</Form.Label>
                                      <Form.Control
                                        type="number"
                                        className="my-2"
                                        name="insurance_price"
                                        required
                                        value={Data.insurance_price}
                                        onChange={SaveData}
                                      />
                                      <Form.Control.Feedback type="invalid">
                                        Insurance Price Field Is Require
                                      </Form.Control.Feedback>
                                    </Col>

                                    <Col md={3}>
                                      <Form.Label htmlFor="name">Other Price</Form.Label>
                                      <Form.Control
                                        type="number"
                                        className="my-2"
                                        name="other_price"
                                        required
                                        value={Data.other_price}
                                        onChange={SaveData}
                                      />
                                      <Form.Control.Feedback type="invalid">
                                        Other Price Field Is Require
                                      </Form.Control.Feedback>
                                    </Col>

                                    <Col md={2}>
                                      <Form.Label htmlFor="status" className="d-block mb-2">
                                        Is Upcoming
                                      </Form.Label>
                                      <Switch
                                        onChange={upcomigHendler}
                                        name="upcoming"
                                        checked={Data.upcoming === 1 ? true : false}
                                        offColor="#C8C8C8"
                                        onColor="#0093ed"
                                        height={30}
                                        width={70}
                                        className="react-switch"
                                        uncheckedIcon={
                                          <div className="react-switch-off">Close</div>
                                        }
                                        checkedIcon={<div className="react-switch-on">Open</div>}
                                      />
                                    </Col>
                                    <Col md={2}>
                                      <Form.Label htmlFor="status" className="d-block mb-2">
                                        Is Latest
                                      </Form.Label>
                                      <Switch
                                        onChange={latestHendler}
                                        name="latest"
                                        checked={Data.latest === 1 ? true : false}
                                        offColor="#C8C8C8"
                                        onColor="#0093ed"
                                        height={30}
                                        width={70}
                                        className="react-switch"
                                        uncheckedIcon={
                                          <div className="react-switch-off">Undone</div>
                                        }
                                        checkedIcon={<div className="react-switch-on">Done</div>}
                                      />
                                    </Col>
                                    <Col md={2}>
                                      <Form.Label htmlFor="status" className="d-block mb-2">
                                        Content Writer Updated
                                      </Form.Label>
                                      <Switch
                                        onChange={(checked) => { checked === true ? setUpdate(1) : setUpdate(0) }}
                                        name="content_updated"
                                        checked={Update === 1 ? true : false}
                                        offColor="#C8C8C8"
                                        onColor="#0093ed"
                                        height={30}
                                        width={70}
                                        className="react-switch"
                                        uncheckedIcon={
                                          <div className="react-switch-off">Undone</div>
                                        }
                                        checkedIcon={<div className="react-switch-on">Done</div>}
                                      />
                                    </Col>
                                    <Col md={2}>
                                      <Form.Label htmlFor="status" className="d-block mb-2">
                                        Designer Updated
                                      </Form.Label>
                                      <Switch
                                        onChange={(checked) => { checked === true ? setDesUpdate(1) : setDesUpdate(0) }}
                                        name="designer_updated"
                                        checked={DesUpdate === 1 ? true : false}
                                        offColor="#C8C8C8"
                                        onColor="#0093ed"
                                        height={30}
                                        width={70}
                                        className="react-switch"
                                        uncheckedIcon={
                                          <div className="react-switch-off">OFF</div>
                                        }
                                        checkedIcon={<div className="react-switch-on">ON</div>}
                                      />
                                    </Col>
                                    <Col md={6}>
                                      <Form.Label htmlFor="name">Manufacturer Description</Form.Label>
                                      <Form.Control
                                        as="textarea" rows={3}
                                        className="my-2"
                                        name="manu_des"
                                        required
                                        value={Data.manu_des}
                                        onChange={SaveData}
                                      />
                                      <Form.Control.Feedback type="invalid">
                                        Manufacturer Description Field Is Require
                                      </Form.Control.Feedback>
                                    </Col>
                                    <Col md={6}>
                                      <Form.Label htmlFor="name">Price Description</Form.Label>
                                      <Form.Control
                                        as="textarea" rows={3}
                                        className="my-2"
                                        name="price_des"
                                        required
                                        value={Data.price_des}
                                        onChange={SaveData}
                                      />
                                      <Form.Control.Feedback type="invalid">
                                        Price Description Field Is Require
                                      </Form.Control.Feedback>
                                    </Col>

                                    <Col md={6}>
                                      <Form.Label htmlFor="name">Highlights Description</Form.Label>
                                      <Form.Control
                                        as="textarea" rows={3}
                                        className="my-2"
                                        name="high_des"
                                        required
                                        value={Data.high_des}
                                        onChange={SaveData}
                                      />
                                      <Form.Control.Feedback type="invalid">
                                        Highlights Description Field Is Require
                                      </Form.Control.Feedback>
                                    </Col>
                                    <Col md={6}>
                                      <Form.Label htmlFor="name">Key Specs</Form.Label>
                                      <Form.Control
                                        as="textarea" rows={3}
                                        className="my-2"
                                        name="key_specs"
                                        required
                                        value={Data.key_specs}
                                        onChange={SaveData}
                                      />
                                      <Form.Control.Feedback type="invalid">
                                        Key Specs Field Is Require
                                      </Form.Control.Feedback>
                                    </Col>
                                    <Col md={12}>
                                      <Form.Label htmlFor="name">Head : Note: Headtag Given By SEO</Form.Label>
                                      <Form.Control
                                        as="textarea" rows={3}
                                        className="my-2"
                                        name="seo_note"
                                        required
                                        value={Data.seo_note}
                                        onChange={SaveData}
                                      />
                                      <Form.Control.Feedback type="invalid">
                                        Head : Note: Headtag Given By SEO Field Is Require
                                      </Form.Control.Feedback>
                                    </Col>

                                    {/**********************************************************  Add Modal Color *****************************************************************************************************/}

                                    <Col md={12}>
                                      <Button
                                        variant="primary"
                                        className="m-2 wv-150"
                                        block
                                        onClick={addReturnModalColor}
                                      >
                                        Add Modal Color
                                      </Button>
                                    </Col>
                                    {
                                      Modal_color_Data.map((detail, i) => (
                                        <Row>
                                          <Col md={3}>
                                            <Form.Label htmlFor="name">Color Name</Form.Label>
                                            <Form.Control
                                              type="text"
                                              className="my-2"
                                              name="color_name"
                                              value={detail.color_name}
                                              required
                                              onChange={(e) => SaveDataModalColor(e, i)}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                              Color Name Is Require
                                            </Form.Control.Feedback>
                                          </Col>

                                          <Col md={3}>
                                            <Form.Label htmlFor="color_code">
                                              Color Code
                                            </Form.Label>
                                            <Form.Control
                                              type="text"
                                              className="my-2"
                                              name="color_code"
                                              value={detail.color_code}
                                              required
                                              onChange={(e) => SaveDataModalColor(e, i)}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                              Color Code Field Is Require
                                            </Form.Control.Feedback>
                                          </Col>

                                          <Col md={3}>
                                            <Form.Label htmlFor="Modal_color_image">Image </Form.Label>
                                            <Form.Control
                                              type="file"
                                              className="my-2"
                                              name="Modal_color_image"
                                              multiple
                                              onChange={(e) => SaveDataModalColorIcon(e, i)}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                              Image Field Is Require
                                            </Form.Control.Feedback>
                                          </Col>
                                        {
                                          <div className='d-flex col-md'>
                                            {
                                            detail?.Modal_color_image?.map((image, i) => {
                                            return image._id ?  
                                                 (
                                                  <>
                                                    <Image
                                                      className="hv-30 rounded-3 me-2"
                                                      src={image.Modal_color_image}
                                                    >
                                                    </Image>
                                                    <p onClick={() => Remove_image(detail._id ,image._id)}><i class='bx bx-comment-x'></i></p>
                                                  </>
                                                )
                                                : ""
                                            })
                                              
                                            }
                                          </div>                                          
                                        }
                                          <Col md={1} className="d-flex align-self-end mb-2 justify-content-end">
                                            <Button
                                              variant="danger"
                                              className="btn-icon-lg"
                                              onClick={() => removeReturnModalColor(detail._id, i)}
                                            >
                                              <i class='bx bx-minus' ></i>
                                            </Button>
                                          </Col>
                                        </Row>
                                      ))}

                                    {/**********************************************************  Add Price Variant *****************************************************************************************************/}
                                    <Col md={12}>
                                      <Button
                                        variant="primary"
                                        className="m-2 wv-200"
                                        block
                                        onClick={addReturnPriceVariant}
                                      >
                                        Add Price Variant
                                      </Button>
                                    </Col>
                                    {
                                      Variant_Price.map((detail, i) => (
                                        <Row>
                                          <Col md={3}>
                                            <Form.Label htmlFor="name">Name</Form.Label>
                                            <Form.Control
                                              type="text"
                                              className="my-2"
                                              name="name"
                                              required
                                              value={detail.name}
                                              onChange={(e) => SaveDataPriceVariant(e, i)}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                              Name Is Require
                                            </Form.Control.Feedback>
                                          </Col>

                                          <Col md={3}>
                                            <Form.Label htmlFor="remote_config">
                                              Engine
                                            </Form.Label>
                                            <Form.Control
                                              type="number"
                                              className="my-2"
                                              name="engine"
                                              required
                                              value={detail.engine}
                                              onChange={(e) => SaveDataPriceVariant(e, i)}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                              Engine Field Is Require
                                            </Form.Control.Feedback>
                                          </Col>

                                          <Col md={3}>
                                            <Form.Label htmlFor="analytics">price</Form.Label>
                                            <Form.Control
                                              type="number"
                                              className="my-2"
                                              name="price"
                                              required
                                              value={detail.price}
                                              onChange={(e) => SaveDataPriceVariant(e, i)}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                              price Field Is Require
                                            </Form.Control.Feedback>
                                          </Col>

                                          <Col md={1} className="d-flex align-self-end mb-2 justify-content-end">
                                            <Button
                                              variant="danger"
                                              className="btn-icon-lg"
                                              onClick={() => removeReturnPriceVariant(detail._id, i)}
                                            >
                                              <i class='bx bx-minus' ></i>
                                            </Button>
                                          </Col>

                                          <Col md={3}>
                                            <Form.Label htmlFor="analytics">price range </Form.Label>
                                            <Form.Control
                                              type="text"
                                              className="my-2"
                                              name="price_range"
                                              required
                                              value={detail.price_range}
                                              onChange={(e) => SaveDataPriceVariant(e, i)}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                              price range Field Is Require
                                            </Form.Control.Feedback>
                                          </Col>

                                          <Col md={3}>
                                            <Form.Label htmlFor="analytics">Review Count </Form.Label>
                                            <Form.Control
                                              type="number"
                                              className="my-2"
                                              name="review_count"
                                              required
                                              value={detail.review_count}
                                              onChange={(e) => SaveDataPriceVariant(e, i)}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                              Review Count Field Is Require
                                            </Form.Control.Feedback>
                                          </Col>

                                          <Col md={3}>
                                            <Form.Label htmlFor="analytics">Rating </Form.Label>
                                            <Form.Control
                                              type="number"
                                              className="my-2"
                                              name="rating"
                                              required
                                              value={detail.rating}
                                              onChange={(e) => SaveDataPriceVariant(e, i)}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                              Rating Field Is Require
                                            </Form.Control.Feedback>
                                          </Col>
                                          <Col md={3}>
                                            <Form.Label htmlFor="analytics">Status </Form.Label>
                                            <Form.Control
                                              type="text"
                                              className="my-2"
                                              name="status"
                                              required
                                              value={detail.status}
                                              onChange={(e) => SaveDataPriceVariant(e, i)}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                              Status Field Is Require
                                            </Form.Control.Feedback>
                                          </Col>
                                          <Col md={3}>
                                            <Form.Label htmlFor="analytics">Fuel Type </Form.Label>
                                            <Form.Control
                                              type="text"
                                              className="my-2"
                                              name="fuel_type"
                                              required
                                              value={detail.fuel_type}
                                              onChange={(e) => SaveDataPriceVariant(e, i)}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                              Fuel Type Field Is Require
                                            </Form.Control.Feedback>
                                          </Col>
                                          <Col md={3}>
                                            <Form.Label htmlFor="analytics">Ex Show Room Price </Form.Label>
                                            <Form.Control
                                              type="number"
                                              className="my-2"
                                              name="ex_show_room_rice"
                                              required
                                              value={detail.ex_show_room_rice}
                                              onChange={(e) => SaveDataPriceVariant(e, i)}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                              Ex Show Room Price Field Is Require
                                            </Form.Control.Feedback>
                                          </Col>
                                          <Col md={3}>
                                            <Form.Label htmlFor="analytics">Mileage </Form.Label>
                                            <Form.Control
                                              type="number"
                                              className="my-2"
                                              name="mileage"
                                              required
                                              value={detail.mileage}
                                              onChange={(e) => SaveDataPriceVariant(e, i)}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                              Mileage Field Is Require
                                            </Form.Control.Feedback>
                                          </Col>
                                          <Col md={3}>
                                            <Form.Label htmlFor="analytics">RTO Price </Form.Label>
                                            <Form.Control
                                              type="text"
                                              className="my-2"
                                              name="rto_price"
                                              required
                                              value={detail.rto_price}
                                              onChange={(e) => SaveDataPriceVariant(e, i)}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                              RTO Price Field Is Require
                                            </Form.Control.Feedback>
                                          </Col>
                                          <Col md={3}>
                                            <Form.Label htmlFor="analytics">Insurance Price </Form.Label>
                                            <Form.Control
                                              type="number"
                                              className="my-2"
                                              name="insurance_price"
                                              required
                                              value={detail.insurance_price}
                                              onChange={(e) => SaveDataPriceVariant(e, i)}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                              Insurance Price Field Is Require
                                            </Form.Control.Feedback>
                                          </Col>
                                          <Col md={3}>
                                            <Form.Label htmlFor="analytics">Other Price </Form.Label>
                                            <Form.Control
                                              type="number"
                                              className="my-2"
                                              name="other_price"
                                              required
                                              value={detail.other_price}
                                              onChange={(e) => SaveDataPriceVariant(e, i)}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                              Mileage Field Is Require
                                            </Form.Control.Feedback>
                                          </Col>
                                          <Col md={3}>
                                            <Form.Label htmlFor="analytics">On-Road Price </Form.Label>
                                            <Form.Control
                                              type="text"
                                              className="my-2"
                                              name="on_road_price"
                                              required
                                              value={detail.on_road_price}
                                              onChange={(e) => SaveDataPriceVariant(e, i)}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                              On-Road Price Field Is Require
                                            </Form.Control.Feedback>
                                          </Col>
                                          <Col md={3}>
                                            <Form.Label htmlFor="analytics">Latest Update </Form.Label>
                                            <Form.Control
                                              type="text"
                                              className="my-2"
                                              name="latest_update"
                                              required
                                              value={detail.latest_update}
                                              onChange={(e) => SaveDataPriceVariant(e, i)}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                              Latest Update Field Is Require
                                            </Form.Control.Feedback>
                                          </Col>
                                          <Col md={3}>
                                            <Form.Label htmlFor="analytics">Launched At </Form.Label>
                                            <Form.Control
                                              type="date"
                                              className="my-2"
                                              name="launched_at"
                                              required
                                              value={detail.launched_at}
                                              onChange={(e) => SaveDataPriceVariant(e, i)}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                              Launched At Field Is Require
                                            </Form.Control.Feedback>
                                          </Col>
                                          <Col md={3}>
                                            <Form.Label htmlFor="analytics">Variant Image</Form.Label>
                                            <InputGroup className="my-2">
                                              <Form.Control
                                                type="file"
                                                name="variant_image"
                                                onChange={(e) => returnChangePriceVariantIcon(e, i)}

                                              />
                                              <InputGroup.Text>
                                                  <Image
                                                    className="hv-30 rounded-3"
                                                    src={detail.variant_image}
                                                  ></Image>
                                              </InputGroup.Text>
                                            </InputGroup>
                                          </Col>

                                        </Row>
                                      ))}
                                  </Row>
                                </Card.Body>
                                <Card.Footer className="text-end">
                                  {/* <Link to="/Vehicale_information">  */}
                                  <Button
                                    variant="primary"
                                    className="me-3"
                                    onClick={Submite}
                                  >
                                    Save
                                  </Button>
                                  {/* </Link> */}
                                  <Link to={`/view/Vehicale_information/${params.id}`}>
                                    <Button variant="secondary">Cancle</Button>
                                  </Link>
                                </Card.Footer>
                              </Card>
                            </Col>
                          </Row>
                        </Form>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Layout>
  )
}

export default Edit_vehicke_information