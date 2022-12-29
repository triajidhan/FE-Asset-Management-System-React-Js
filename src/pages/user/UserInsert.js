import { useState } from "react"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { Header } from "../../components/Header"
import { fileUpload } from "../../service/File.service"
import { postAPI } from "../../utils/constants"

const UserInsert = () => {
    const navigate = useNavigate()

    const [user, setUser] = useState({
        data: {
            fullName: '',
            email: '',
            extensions: '',
            files: ''
        }
    })

    const dataChange = (e) => {
        const { name, value } = e.target
        setUser({
            data: {
                ...user.data,
                [name]: value
            }
        })
    }

    const dataFile = (e) => {
        fileUpload(e).then(res => {
            setUser({
                data: {
                    ...user.data,
                    ...res
                }
            })
        })
    }

    const insertUser = () => {
        postAPI('users', user.data, () => navigate('/users'))
    }

    const back = () => {
        navigate(-1)
    }

    return (
        <>
            <Header />
            <Container>
                <h2 className="my-3">User Insert</h2>
                <Button className="mb-3" variant="secondary" onClick={back}>Back</Button>
                <Card >
                    <Card.Body>
                        <Form as={Row}>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Full name <span className="text-danger">*</span></Form.Label>
                                    <Form.Control name="fullName" type="text" placeholder="Enter name" onChange={dataChange} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email address <span className="text-danger">*</span></Form.Label>
                                    <Form.Control name="email" type="email" placeholder="Enter email" onChange={dataChange} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Photo <span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="file" onChange={dataFile} />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Button onClick={insertUser} variant="primary" type="button">
                                    Submit
                                </Button>
                            </Col>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default UserInsert