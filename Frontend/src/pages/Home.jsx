import React, { useEffect, useState }from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Layout from '../layout/Layout'
import { Row, Col, Card } from 'react-bootstrap';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    ArcElement,
    LineElement,
    Filler,
    Title,
    Tooltip,
    Legend,
    defaults,
    ScriptableContext
} from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import { API, AuthContext } from '../App';
import Cookies from 'js-cookie';
import ClearSearch from '../Component/ClearSearch';
import { useContext } from 'react';

defaults.font.family = 'Maven Pro';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    ArcElement,
    LineElement,
    Filler,
    Title,
    Tooltip,
    Legend
);

// Notification Chart
const notificationoptions = {
    responsive: true,
    plugins: {
        title: {
            display: false,
        },
        legend: {
            display: true,
            position: "bottom",
            labels: {
                boxWidth: 10,
                boxHeight: 10,
                usePointStyle: true,
                pointStyle: 'rectRounded',
                font: {
                    family: "Maven Pro",
                    size: 14
                }
            },
            tooltip: {
                bodyFont: {
                    family: "Maven Pro"
                },
                titleFont: {
                    family: "Maven Pro"
                }
            }
        },
    },
};
const notificationdata = {
    labels: ['Low Battery', 'Safe Driving', 'Place Notification'],
    datasets: [
        {
            label: 'Notification',
            data: [20, 50, 10],
            backgroundColor: ['#1FD9A3', '#FFB15C', '#6A9BF4', '#FF5C84', '#DB73FF']
        },
    ],
};

// Circle Line Chart
const circleOptions = {
    responsive: true,
    plugins: {
        title: {
            display: false,
        },
        legend: {
            display: false,
            tooltip: {
                bodyFont: {
                    family: "Maven Pro"
                },
                titleFont: {
                    family: "Maven Pro"
                }
            }
        },
    },
    scales: {
        y: {
            ticks: {
                stepSize: 2,
                font: {
                    family: "Maven Pro",
                    size: 14
                }
            },
            grid: {
                display: true,
            },
            scaleLabel: {
                display: true,
                font: {
                    family: "Maven Pro",
                    size: 14
                }
            }
        },
        x: {
            ticks: {
                font: {
                    family: "Maven Pro",
                    size: 14
                }
            },
            grid: {
                display: false,
            },
            scaleLabel: {
                display: true,
                font: {
                    family: "Maven Pro",
                    size: 14
                }
            }
        }
    }
};



const Home = () => {
    const navigate = useNavigate()
    const [graphData,setGraphData] = useState({
        label:[],
        data:[]
    })
    const [labelData,setLabelData] = useState({
        circle:0,
        user:0,
        place:0,
        contact:0
    })

    const circleData = {
        labels: graphData.label,
        datasets: [
            {
                fill: true,
                label: 'Circle',
                data: graphData.data,
                tension: 0.4,
                borderColor: 'rgb(0 147 237)',
                backgroundColor: (context: ScriptableContext<"line">) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, "rgb(0,147,237,0.5)");
                    gradient.addColorStop(1, "rgb(0,147,237,0)");
                    return gradient;
                },
            }
        ],
    };

    
    const getData = async()=>{
        // <ClearSearch search={"home"}/>
        const response = await API.post("/web/homepage",{},{ headers: { "Authorization": `Bearer ${Cookies.get('fmljwt')}` } })
        if(response.data.Status===true){
            let data = []
            let label = []
            response.data?.Data?.userTable?.map((val,ind)=>{
                label.push(val.date)
                data.push(val.user)
            })
            setGraphData({
                label:label,
                data:data
            })
            setLabelData({
                circle:response.data?.Data?.circles,
                user:response.data?.Data?.users,
                place:response.data?.Data?.places,
                contact:response.data?.Data?.eContacts
            })
        }else{
            if(response.data.Response_Code===401){
                navigate("/")
            }else{

            }
        }
    }


    useEffect(()=>{
        // getData()
    },[])
    return (
        <Layout sidebar={true}>
           <div className="vv-dashboard">
                <Row>
                    <Col xxl={3} xl={4} md={6}>
                            <Card>
                                <Card.Body>
                                    <div className="counter orange">
                                        <div className="counter-media">
                                            <i className='bx bxs-map-pin'></i>
                                        </div>
                                        <div className="counter-content">
                                            <h3>{labelData.circle}</h3>
                                            <p>Circle Name</p>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                    </Col>
                    <Col xxl={3} xl={4} md={6}>
                            <Card>
                                <Card.Body>
                                    <div className="counter pink">
                                        <div className="counter-media">
                                            <i className="bx bxs-user"></i>
                                        </div>
                                        <div className="counter-content">
                                            <h3>{labelData.user}</h3>
                                            <p>Circle User</p>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                    </Col>
                    <Col xxl={3} xl={4} md={6}>
                            <Card>
                                <Card.Body>
                                    <div className="counter green">
                                        <div className="counter-media">
                                            <i className="bx bxs-map"></i>
                                        </div>
                                        <div className="counter-content">
                                            <h3>{labelData.place}</h3>
                                            <p>Circle Place</p>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                    </Col>
                    <Col xxl={3} xl={4} md={6}>
                            <Card>
                                <Card.Body>
                                    <div className="counter blue">
                                        <div className="counter-media">
                                            <i className="bx bxs-phone-call"></i>
                                        </div>
                                        <div className="counter-content">
                                            <h3>{labelData.contact}</h3>
                                            <p>Emergency Contact</p>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xxl={9} md={6}>
                        <Card>
                            <Card.Body>
                                <div className="chart-title">
                                    <h4>Weekly User</h4>
                                </div>
                                <Line options={circleOptions} data={circleData} height="89" />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xxl={3} md={6}>
                        <Card>
                            <Card.Body>
                                <div className="chart-title">
                                    <h4>Notification</h4>
                                </div>
                                <Doughnut options={notificationoptions} data={notificationdata} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Layout>
    )
}

export default Home