import axios from 'axios'
import { useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../utils/constants'
import { ROLE_CODE } from '../utils/Role'

const Login = () => {
    const navigate = useNavigate()

    const [login, setLogin] = useState({
        data: {
            email: '',
            pass: ''
        }
    })

    const dataChange = (e) => {
        const { name, value } = e.target
        setLogin({
            data: {
                ...login.data,
                [name]: value
            }
        })
    }

    const loginSubmit = () => {
        axios.post(API_URL + 'login', login.data)
            .then(res => {
                console.log(res)
                localStorage.setItem('data', JSON.stringify(res.data))

                if (res.data.roleCode === ROLE_CODE.NON_ADMIN) {
                    navigate('dashboard/non-admin')
                } else {
                    navigate('dashboard/super-admin')
                }
            }).catch(err => console.log(err))
    }

    return (
        <Container fluid>
            <Row className='bg-primary vh-100 justify-content-center align-items-center login'>
                <Col sm="10" md="7" lg="5">
                    <Card className='py-4 px-sm-3'>
                        <Card.Body>
                            <Card.Title className='text-center mb-5 fs-3 fw-semibold'>Login</Card.Title>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" name='email' onChange={dataChange} />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" name='pass' onChange={dataChange} />
                                </Form.Group>
                                <Button onClick={loginSubmit} variant="primary" type="button" className='mt-3'>
                                    Submit
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Login