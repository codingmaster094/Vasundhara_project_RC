import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Table, Form, InputGroup, Image, Breadcrumb } from 'react-bootstrap';
import { Link, json, useNavigate, useParams } from "react-router-dom";
import Layout from '../../layout/Layout';
import Switch from 'react-switch'
import { API } from "../../App";
import { toast } from "react-toastify";
import { SelectPicker } from "rsuite";
import Cookies from "js-cookie";

const Add_News_category = () => {
  const token = Cookies.get("fmljwt");
  const navigate = useNavigate()
  const [validated, setvalidated] = useState(false)
  const [AddData, setAddData] = useState([{
    name: "",
    status: 0,
    Image:[]
  }])

  const GetData = async () => {
    const Result = await API.post("/get_News_category", {}, {headers:{Authorization : `Bearer ${token}`}})
    setAddData(Result.data.Data)
  }

  const addReturn = () => {
    setAddData([
      ...AddData,
      {
        name: "",
        status: 0,
        Image: []
      },
    ]);
  }

  const [ModalRecord_del, setModalRecord_del] = useState([])
  const [Record_Delete_show, setRecord_Delete_show] = useState(false)
  const removeReturn = (id , i) => {
    if (id == undefined) {
    const data = [...AddData]
    data.splice(i, 1)
    setAddData(data)
  }else {
    const data = [...AddData]
    data.splice(i, 1)
    setAddData(data)
    setModalRecord_del(pre => [...pre, id])
    setRecord_Delete_show(true)
  }
}

  //   const addReturn = () => {
  //     setShow(true)
  //     setvalue(true)
  //     if(Show === true){
  //       const returnTag = {
  //         name: "",
  //         status:""
  //       }
  //       const returnTagicon = {
  //         Image: ""
  //       }
  //       setAddData([...AddData, returnTag])
  //       setAddicon([...Addicon, returnTagicon])
  //     }
  // }

  // const removeReturn = (index) => {
  //   const data = [...AddData]
  //   data.splice(index, 1)
  //   setAddData(data)

  //   const data1 = [...Addicon]
  //   data1.splice(index, 1)
  //   setAddicon(data1)
  // }



  const returnStatus = (e, index) => {
    console.log('e', e)
    let data = [...AddData];
    data[index]['status'] = e == true ? 1 : 0
    setAddData(data)
  }

  const returnChangeIcon = (e, index) => {
    let data = [...AddData];
    data[index][e.target.name] = e.target.files[0]
    setAddData(data)
  }


  const SaveData = (e , index) => {
    const { name, value } = e.target;
    const updatedRows = [...AddData];
    updatedRows[index][name] = value;
    setAddData(updatedRows);
  }

  const submiteData = async () => {
    let count = 0
    let result
    AddData.map((val, ind) => {
      if (val.name === "" || val.Image === "") {
        count++
      }
    })
    console.log('count', count)
    if (count !== 0) {
      setvalidated(true)
    } else {
    const Form = new FormData()
    const RecordDeleteForm = new FormData()
    AddData.forEach((row, index) => {
      Form.append(`_id-${index}`, row._id);
      Form.append(`Image-${index}`, row.Image);
      Form.append(`name-${index}`, row.name);
      Form.append(`status-${index}`, row.status);
    });
    
    if (Record_Delete_show == true) {
       RecordDeleteForm.append('RecordDelete', JSON.stringify(ModalRecord_del))
       result = await API.post('/Multiple_delete_News_category', RecordDeleteForm , {headers:{Authorization : `Bearer ${token}`}})
    }

     result = await API.post("/create_News_category", Form , {headers:{Authorization : `Bearer ${token}`}});
    if(result){
      toast.success("Data Save Successfuly")
      navigate("/news_category");
    }
  }
  }

  useEffect(() => {
    GetData()
  }, [])

  return (
    <Layout sidebar={true}>
      <div className="page-heading">
        <h3>News Category Add</h3>
        <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
          <Breadcrumb.Item >
            <Link to="/"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item >
            <Link to="/DL_RC_info">News Category</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Create News Category </Breadcrumb.Item>
        </Breadcrumb>

      </div>
      <div className="page-content">
        <Row>
          <Col xs={12}>
            <Card className="mb-4">
            <Card.Header className="d-flex justify-content-end">
            <Button
            variant="primary"
            className="btn-icon-lg"
            onClick={addReturn}
          >
            <i class='bx bx-plus'></i>
          </Button>
            </Card.Header>
              <Card.Body>
                <Form noValidate validated={validated}>
                  <Row>
                    <Col xs={12}>
                      <Card className="mb-4">
                        <Card.Body>
                          {
                            AddData.map((val, i) => (
                              <Row>
                                <Col md={4}>
                                  <Form.Label htmlFor="icon">Name</Form.Label>
                                  <Form.Control
                                    type="text"
                                    name="name"
                                    value={val.name}
                                    onChange={(e) => SaveData(e , i)}
                                    required
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    Name Field Is Require
                                  </Form.Control.Feedback>
                                </Col>
                                <Col md={4}>
                                  <Form.Label htmlFor="icon">Image</Form.Label>
                                  <InputGroup className="my-2">
                                    <Form.Control
                                      type="file"
                                      name="Image"
                                      onChange={(e) => returnChangeIcon(e , i)}
                                      required={val.Image == "" ? true : false}
                                    />
                                    <InputGroup.Text>
                                      <Image
                                        src={val.Image}
                                        className="hv-30 rounded-3"
                                      ></Image>
                                    </InputGroup.Text>
                                    <Form.Control.Feedback type="invalid">
                                      Image Field Is Require
                                    </Form.Control.Feedback>
                                  </InputGroup>
                                </Col>
                                <Col md={2}>
                                  <Form.Label htmlFor="status" className="d-block mb-2">
                                    Status
                                  </Form.Label>
                                  <Switch
                                    name="status"
                                    checked={val.status == 1 ? true : false}
                                    offColor="#C8C8C8"
                                    onColor="#0093ed"
                                    onChange={(e) => returnStatus(e , i)}
                                    height={30}
                                    width={70}
                                    className="react-switch"
                                    uncheckedIcon={
                                      <div className="react-switch-off">OFF</div>
                                    }
                                    checkedIcon={<div className="react-switch-on">ON</div>}
                                  />
                                </Col>
                                {/* </Col>  */}

                                <Col md={2} className="d-flex align-self-end mb-2">
                                  <Button
                                    variant="danger"
                                    className="btn-icon-lg"
                                    onClick={() => removeReturn(val._id , i)}
                                  >
                                    <i class='bx bx-minus' ></i>
                                  </Button>
                                </Col>
                              </Row>
                            ))
                          }

                          {/* {Show == true  &&
                        AddData.map((detail, i) => (
                            <Row>
                              <Col md={4}>
                                <Form.Label htmlFor="icon">Name</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="name"
                                  onChange={(e) => returnChange(e, i)}
                                  required
                                />
                                <Form.Control.Feedback type="invalid">
                                  Name Field Is Require
                                </Form.Control.Feedback>
                              </Col>
                              <Col md={4}>
                                <Form.Label htmlFor="icon">Image</Form.Label>
                                <InputGroup className="my-2">
                                  <Form.Control
                                    type="file"
                                    name="Image"
                                    onChange={(e) => returnChangeIcon(e, i)}
                                    required
                                  />
                                  <InputGroup.Text>
                                    <Image
                                      className="hv-30 rounded-3"
                                    ></Image>
                                  </InputGroup.Text>
                                  <Form.Control.Feedback type="invalid">
                                    Image Field Is Require
                                  </Form.Control.Feedback>
                                </InputGroup>
                              </Col>
                              <Col md={2}>
                                <Form.Label htmlFor="status" className="d-block mb-2">
                                  Status
                                </Form.Label>
                                <Switch
                                  onChange={(e) => returnStatus(e, i)}
                                  name="status"
                                  checked={detail.status}
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

                              <Col md={2} className="d-flex align-self-end mb-2">
                                <Button
                                  variant="danger"
                                  className="btn-icon-lg"
                                  onClick={() => removeReturn(i)}
                                >
                                  <i class='bx bx-minus' ></i>
                                </Button>
                              </Col>
                            </Row>
                          ))} */}
                        </Card.Body>
                        <Card.Footer className="text-end">
                          <Button
                            variant="primary"
                            className="me-3"
                            onClick={submiteData}
                          >
                            Save
                          </Button>
                          <Link to="/news_category">
                            <Button variant="secondary">Cancle</Button>
                          </Link>
                        </Card.Footer>
                      </Card>
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

export default Add_News_category