import { useEffect, useState } from "react"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { Header } from "../../components/Header"
import { fileUpload } from "../../service/File.service"
import { getAPI, putAPI } from "../../utils/constants"

const StoreUpdate = () => {
    const navigate = useNavigate()
    const storeId = useParams().id

    const [store, setStore] = useState({
        data: {
            id: 0,
            storeName: '',
            extensions: '',
            files: '',
            isActive: true
        }
    })

    useEffect(() => {
        getAPI('stores/' + storeId).then(data => {
            setStore({
                data: {
                    id: storeId,
                    storeName: data.storeName,
                    isActive: data.isActive
                }
            })
        })
    }, [])

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

    const updateStore = () => {
        putAPI('stores', store.data, () => navigate('/stores'))
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
                                    <Form.Label>Store name <span className="text-danger">*</span></Form.Label>
                                    <Form.Control name="storeName" type="text" placeholder="Enter name" onChange={dataChange}
                                        defaultValue={store.data.storeName}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Photo <span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="file" onChange={dataFile} />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Button onClick={updateStore} variant="primary" type="button">
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

export default StoreUpdate