import React, { useEffect, useState } from 'react'
import { Link,useParams } from 'react-router-dom';
import { Button, Card, Col, Row } from "react-bootstrap";
import Layout from '../../layout/Layout';
import { API } from '../../App';
import Cookies from "js-cookie";



const View_News = () => {
    const token = Cookies.get("fmljwt")
    const params = useParams()
    const [NewsData, setNewsData] = useState([])
    const [id, setid] = useState({ _id: params.id });
    const [Data, setData] = useState({
        _id:"",
        news_id:"",
    })


    const ShowData = async(id)=>{
        const Form = new FormData()
        Form.append('id',params.id)
        const Result = await API.post(`/get_news_ID/${params.id}`, {} , {headers:{Authorization: `Bearer ${token}`}})
        setNewsData(Result.data.Data[0].news.replaceAll(",", "\n"))
        setData({
            _id:Result.data.Data[0]._id,
            news_id:Result.data.Data[0].news_headline_id._id,
        })
    }

    useEffect(() => {
        ShowData()
    }, [])
    
    return (
        <Layout sidebar={true}>
            <div className="page-heading">
                <h3><Link to="/news" className='btn btn-primary btn-icon-lg me-3'><i className='bx bxs-left-arrow-alt'></i></Link> News Preview</h3>
                <div className="page-heading-right">
                    <Link to={`/Edit/news/${id._id}`}>
                        <Button variant="primary ms-3 my-1" value="edit">Edit</Button>
                    </Link>
                </div>
            </div>
            <div className='page-content'>
                <Card>
                    <Card.Body>
                        <Row>
                            <Col md={12}>
                                <div className="content" dangerouslySetInnerHTML={{ __html: NewsData }}></div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        </Layout>
    )
}

export default View_News