import React, { useEffect, useState } from 'react'
import { Button, Container, Card, Form } from 'react-bootstrap';
import Cookies from 'js-cookie'
import base64 from 'base-64'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API } from '../App';

const Login = () => {

    const [eye, seteye] = useState(true);
    const [password, setpassword] = useState("password");
    const [type, settype] = useState(false);

    const Eye = () => {
        if (password == "password") {
            setpassword("text");
            seteye(false);
            settype(true);
        }
        else {
            setpassword("password");
            seteye(true);
            settype(false);
        }
    }

    //React Code

    const navigate = useNavigate()
    const [validate, setValidate] = useState(false)
    const loginData = async (event) => {
        event.preventDefault()
        if (inpData.email === "" || inpData.password === "") {
            setValidate(true)
        } else {
            setValidate(false)
            const Form = new FormData
            Form.append('email', inpData.email)
            Form.append('password', inpData.password)
            const response = await API.post("/user_login", Form)
            if (response.data.status === false) {
                toast.error(`${response.data.response_message}`);
            } else {
                const emailEnc = base64.encode(inpData.email)
                const passEnc = base64.encode(inpData.password)
                if (inpData.remember === true) {
                    localStorage.setItem('fmlejwt', emailEnc)
                    localStorage.setItem('fmlpjwt', passEnc)
                } else {
                    localStorage.removeItem('fmlejwt')
                    localStorage.removeItem('fmlpjwt')
                }
                console.log('response.data.data.tokens[0]', response.data.data.tokens[0])
                toast.success('Login Succesfull')
                Cookies.set('fmljwt', response.data.data.tokens[0].token, { expires: 1 })
                navigate("/Home")
            }
        }
    }

    const [inpData, setInpData] = useState({
        email: (localStorage.getItem('fmlejwt')) ? base64.decode(localStorage.getItem('fmlejwt')) : "",
        password: (localStorage.getItem('fmlpjwt')) ? base64.decode(localStorage.getItem('fmlpjwt')) : "",
        remember: (localStorage.getItem('fmlejwt') && localStorage.getItem('fmlpjwt')) ? true : false
    })

    const getValue = (e) => {
        setValidate(false)
        setInpData({ ...inpData, [e.target.name]: e.target.value })
        console.log('inpData', inpData)
    }

    const Remember = (e) => {
        setInpData({ email: inpData.email, password: inpData.password, remember: e.target.checked })
    }

    return (
        <>
            <div className='position-relative'>
                <Container>
                    <div className="auth">
                        <div className="auth-box">
                            <Card>
                                <Card.Header className="pb-0">
                                    <div className='auth-logo'>
                                        <img src="../logo/unnamed.webp" className='logo-mini' alt="Remote Control for All TV" />
                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    <Form method='post' noValidate validated={validate}>
                                        <h1 className='auth-title'>Sign in</h1>
                                        <h2 className='auth-subtitle'>RTO Vehicle Information</h2>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" className="my-2" name='email' value={inpData.email} onChange={(e) => { getValue(e) }} placeholder="Enter Your Email" required />
                                        </Form.Group>
                                        <Form.Group className="mb-4 input-prefix">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type={password} className="my-2" name='password' value={inpData.password} onChange={(e) => { getValue(e) }} placeholder="Enter Password" required />
                                            <i onClick={Eye} className={`bx ${eye ? "bx-hide" : "bx-show"}`}></i>
                                        </Form.Group>
                                        <Form.Group className="mb-4" controlId="formBasicCheckbox">
                                            <Form.Check type="checkbox" label="Remember Me" checked={inpData.remember} onClick={(e) => { Remember(e) }} />
                                        </Form.Group>
                                        <Button variant="primary" type="submit" className="w-100 " onClick={loginData}>Sign In</Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Login