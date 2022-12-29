import { useEffect, useState } from "react"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { Header } from "../../components/Header"
import { getAPI, putAPI } from "../../utils/constants"

const UserUpdate = () => {
    const navigate = useNavigate()
    const userId = useParams().id

    const [constant, setConstant] = useState({
        data: {
            email: ''
        }
    })

    const [user, setUser] = useState({
        data: {
            id: 0,
            fullName: '',
            isActive: true
        }
    })

    useEffect(() => {
        getAPI('users/' + userId).then(data => {
            setUser({
                data: {
                    id: userId,
                    fullName: data.fullName,
                    isActive: data.isActive
                }
            })
            setConstant({ data: { email: data.email } })
        })
    }, [])

    const dataChange = (e) => {
        const { name, value } = e.target
        setUser({
            data: {
                ...user.data,
                [name]: value
            }
        })
    }

    const checkChange = (e) => {
        const { name, checked } = e.target
        setUser({
            data: {
                ...user.data,
                [name]: checked
            }
        })
    }

    const updateUser = () => {
        putAPI('users', user.data, () => navigate('/users'))
    }

    const back = () => {
        navigate(-1)
    }

    return (
        <>
            <Header />
            <Container>
                <h2 className="my-3">User Update</h2>
                <Button className="mb-3" type="button" onClick={back} variant="secondary">Back</Button >
                <Card >
                    <Card.Body>
                        <Form as={Row}>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Full name <span className="text-danger">*</span></Form.Label>
                                    <Form.Control name="fullName" type="text" placeholder="Enter name" onChange={dataChange}
                                        defaultValue={user.data.fullName} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control name="email" type="email" defaultValue={constant.data.email} disabled />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Is Active <span className="text-danger">*</span></Form.Label>
                                    <Form.Check
                                        name="isActive"
                                        type="switch"
                                        id="custom-switch"
                                        label={String(user.data.isActive)}
                                        checked={user.data.isActive}
                                        onChange={checkChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Button onClick={updateUser} variant="primary" type="button">
                                    Save
                                </Button>
                            </Col>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default UserUpdate