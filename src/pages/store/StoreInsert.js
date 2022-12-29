import { useState } from "react"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { Header } from "../../components/Header"
import { fileUpload } from "../../service/File.service"
import { postAPI } from "../../utils/constants"

const StoreInsert = () => {
    const navigate = useNavigate()

    const [store, setStore] = useState({
        data: {
            storeName: '',
            extensions: '',
            files: ''
        }
    })

    const dataChange = (e) => {
        const { name, value } = e.target
        setStore({
            data: {
                ...store.data,
                [name]: value
            }
        })
    }

    const dataFile = (e) => {
        fileUpload(e).then(data => {
            setStore({
                data: {
                    ...store.data,
                    ...data
                }
            })
        })
    }

    const insertStore = () => {
        postAPI('stores', store.data, () => navigate('/stores'))
    }

    const back = () => {
        navigate(-1)
    }

    return (
        <>
            <Header />
            <Container>
                <h2 className="my-3">Store Insert</h2>
                <Button className="mb-3" variant="secondary" onClick={back}>Back</Button>
                <Card >
                    <Card.Body>
                        <Form as={Row}>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Store name <span className="text-danger">*</span></Form.Label>
                                    <Form.Control name="storeName" type="text" placeholder="Enter name" onChange={dataChange} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Photo <span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="file" onChange={dataFile} />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Button onClick={insertStore} variant="primary" type="button">
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

export default StoreInsert