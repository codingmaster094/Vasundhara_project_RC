import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Button, Table, Form, InputGroup, Image, Breadcrumb } from 'react-bootstrap';
import { API } from '../../App'
import Cookies from 'js-cookie';
import Layout from '../../layout/Layout';
import { Link } from 'react-router-dom';

const Traffic_language = () => {
    const token = Cookies.get("fmljwt");
    const [Data, setData] = useState([])
    const Get_data = async () => {
        const Result = await API.post("/get_language", {}, { headers: { Authorization: `Bearer ${token}` } })
        setData(Result.data.Data)
    }

    useEffect(() => {
        Get_data()
    }, [])

    return (
        <div>
            <Layout sidebar={true}>
                <div className="page-heading">
                    <h3>Traffic Rules Language Add</h3>
                    <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
                        <Breadcrumb.Item >
                            <Link to="/"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item >
                            <Link to="/Traffic_rule">Traffic Rule </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>Traffic Rules Language Add</Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                <div className="page-content">
                    <Form >
                        <Row>
                            <Col xs={12}>
                                {
                                    Data.map((val) => {
                                        return (
                                            <Card className="mb-4">
                                                <Card.Body>
                                                    <Row>
                                                        <Col md={4}>
                                                            <Form.Label htmlFor="icon">Bengali</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="disclaimer_bn"
                                                                value={val.bn}
                                                                required
                                                            />
                                                        </Col>
                                                        <Col md={4}>
                                                            <Form.Label htmlFor="icon">Gujarati</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="disclaimer_gu"
                                                                value={val.gu}
                                                                required
                                                            />
                                                        </Col>
                                                        <Col md={4}>
                                                            <Form.Label htmlFor="icon">Hindi</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="disclaimer_hi"
                                                                value={val.hi}
                                                                required
                                                            />
                                                        </Col>

                                                        <Col md={4}>
                                                            <Form.Label htmlFor="icon">Kannad</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="disclaimer_kn"
                                                                value={val.kn}
                                                                required
                                                            />
                                                        </Col>
                                                        <Col md={4}>
                                                            <Form.Label htmlFor="icon">Malyalam</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="disclaimer_ml"
                                                                value={val.ml}
                                                                required
                                                            />
                                                        </Col>
                                                        <Col md={4}>
                                                            <Form.Label htmlFor="icon">Marathi</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="disclaimer_mr"
                                                                value={val.mr}
                                                                required
                                                            />
                                                        </Col>
                                                        <Col md={4}>
                                                            <Form.Label htmlFor="icon">Odia</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="disclaimer_or"
                                                                value={val.or}
                                                                required
                                                            />
                                                        </Col>
                                                        <Col md={4}>
                                                            <Form.Label htmlFor="icon">Punjabi</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="disclaimer_pa"
                                                                value={val.pa}
                                                                required
                                                            />
                                                        </Col>
                                                        <Col md={4}>
                                                            <Form.Label htmlFor="icon">Tamil</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="disclaimer_ta"
                                                                value={val.ta}
                                                                required
                                                            />
                                                        </Col>
                                                        <Col md={4}>
                                                            <Form.Label htmlFor="icon">Telugu</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="disclaimer_te"
                                                                value={val.te}
                                                                required
                                                            />
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        )
                                    })
                                }
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Layout>
        </div>
    )
}

export default Traffic_language