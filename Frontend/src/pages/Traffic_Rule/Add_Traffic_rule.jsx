import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Table, Form, Breadcrumb } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import Layout from '../../layout/Layout';
import { API } from "../../App";
import { toast } from "react-toastify";
import { SelectPicker } from "rsuite";
import Cookies from "js-cookie";

var StateNAmeArray = []
const Add_Traffic_rule = () => {
  const token = Cookies.get("fmljwt");
  const [validated, setvalidated] = useState(false)
  const [Sate_nameData, setSate_nameData] = useState([])
  const navigate = useNavigate()
  const [Data, setData] = useState([{
    traffic_state_id:"",
    offence: "",
    panalty: "",
  }])

  const SaveData = async (e) => {
    setData({ ...Data, [e.target.name]: e.target.value })
  }

  const State_name_dropdown = async () => {
    const Result = await API.post("/get_Traffic_state", {}, { headers: { Authorization: `Bearer ${token}` } })
        console.log('Result', Result)
        StateNAmeArray = []
        StateNAmeArray.push({ label: "Select Categories", value: "", role: "" })
        Result.data.Data.map((val) => {
                StateNAmeArray.push({ label: `${val.state_code+ "-" +val.state_name}`, value: val._id})
        })
        setSate_nameData(StateNAmeArray)
  }

  const CategoryHendler = async (e, name) => {
    setData({ ...Data, [name]: e });
};


  useEffect(() => {
    State_name_dropdown()
  }, [])

  const Submite = async () => {
    if (Data.offence == undefined || Data.panalty == undefined ) {
      setvalidated(true)
    } else {
      const Result = await API.post("/create_Traffic_rule", Data, { headers: { Authorization: `Bearer ${token}` } })
      toast.success("Data Saved successfully");
      navigate("/Traffic_rule")
    }
  }
  return (
    <Layout sidebar={true}>
      <div className="page-heading">
        <h3>Traffic Rule Add</h3>
        <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
          <Breadcrumb.Item >
            <Link to="/"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item >
            <Link to="/Traffic_rule">Traffic Rule</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Create Traffic Rule</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="page-content">

        {
          console.log('Sate_nameData', Sate_nameData)
        }
        <Form noValidate validated={validated}>
          <Row>
            <Col xs={12}>
              <Card className="mb-4">
                <Card.Body>
                  <Row>
                    <Col md={4}>
                      <SelectPicker
                        cleanable={false}
                        data={Sate_nameData}
                        defaultValue={""}
                        className="my-2"
                        placeholder="Select Categories"
                        placement="bottomEnd"
                        block
                        onChange={(e) => CategoryHendler(e, "traffic_state_id")}
                      />
                    </Col>
                    <Col md={4}>
                      <Form.Label htmlFor="icon">Offence</Form.Label>
                      <Form.Control
                        type="text"
                        name="offence"
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
                  <Link to='/Traffic_rule'>
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

export default Add_Traffic_rule