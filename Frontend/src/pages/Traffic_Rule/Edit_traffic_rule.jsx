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

var StateNAmeArray = []
const Edit_traffic_rule = () => {
  const token = Cookies.get("fmljwt");
  const params = useParams()
  const [validated, setvalidated] = useState(false)
  const [Sate_nameData, setSate_nameData] = useState([])
  const navigate = useNavigate()
  const [Data, setData] = useState({
    traffic_state_id:"",
    offence: "",
    panalty: "",
  })

  const SaveData = async (e) => {
    console.log('e', e.target.value)
    setData({ ...Data, [e.target.name]: e.target.value })
  }

  const Getview = async () => {
    const result = await API.post(`/get_Traffic_rule_ID/${params.id}` , {} , {headers: { Authorization: `Bearer ${token}` }});
    setData({
      traffic_state_id:result.data.Data[0].traffic_state_id._id,
      offence:result.data.Data[0].offence,
      panalty:result.data.Data[0].panalty,  
      
    });
  };

  const State_name_dropdown = async () => {
    const Result = await API.post("/get_Traffic_state", {}, { headers: { Authorization: `Bearer ${token}` } })
        StateNAmeArray = []
        StateNAmeArray.push({ label: "Select Categories", value: "", role: "" })
        Result.data.Data.map((val) => {
                StateNAmeArray.push({ label:  `${val.state_code+ "-" +val.state_name}`, value: val._id})
        })
        setSate_nameData(StateNAmeArray)
  }

  const State_nameHendler = async (e, name) => {
    setData({ ...Data, [name]: e });
};


  useEffect(() => {
    State_name_dropdown()
    Getview()
  }, [])

  const Submite = async () => {
    if (Data.offence == "" || Data.panalty == "" ) {
      setvalidated(true)
    } else {
      const Result = await API.post(`/update_Traffic_rule/${params.id}`, Data, { headers: { Authorization: `Bearer ${token}` } })
      if (Result) {
        toast.success("Data Update successfully");
        navigate(`/view/Traffic_rule/${params.id}`)
  }
      
    }
  }
  return (
    <Layout sidebar={true}>
    <div className="page-heading">
      <h3>Traffic Rule Edit</h3>
      <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
        <Breadcrumb.Item >
          <Link to="/"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item >
          <Link to="/Traffic_rule">Traffic Rule</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Edit Traffic Rule</Breadcrumb.Item>
      </Breadcrumb>
    </div>

    <div className="page-content">
      <Form noValidate validated={validated}>
        <Row>
          <Col xs={12}>
            <Card className="mb-4">
              <Card.Body>
                <Row>
                  <Col md={4}>
                    {/* <Form.Label htmlFor="icon">State Name</Form.Label> */}
                    <SelectPicker
                      cleanable={false}
                      data={Sate_nameData}
                      value={Data.traffic_state_id}
                      className="my-2"
                      placeholder="Select State Name"
                      block
                      onChange={(e) => State_nameHendler(e, "traffic_state_id")}
                    />
                  </Col>
                  <Col md={4}>
                    <Form.Label htmlFor="icon">Offence</Form.Label>
                    <Form.Control
                      type="text"
                      name="offence"
                      value={Data.offence}
                      onChange={SaveData}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                    Offence Field Is Require
                    </Form.Control.Feedback>
                  </Col>

                  <Col md={4}>
                    <Form.Label htmlFor="icon">Penalty</Form.Label>
                    <Form.Control
                      type="text"
                      name="panalty"
                      value={Data.panalty}
                      onChange={SaveData}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                    Penalty Field Is Require
                    </Form.Control.Feedback>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer className="text-end">
                <Button variant="primary" onClick={Submite} className="me-3">Save</Button>
                <Link to={`/view/Traffic_rule/${params.id}`}>
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

export default Edit_traffic_rule