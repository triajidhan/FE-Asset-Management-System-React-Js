import { useEffect, useState } from "react"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import DropdownOption from "../../components/DropdownOption"
import { Header } from "../../components/Header"
import { fileUpload } from "../../service/File.service"
import { getAPI, postAPI } from "../../utils/constants"

const BrandInsert = () => {
    const navigate = useNavigate()

    const [stores, setStores] = useState([])
    const [brand, setBrand] = useState({
        data: {
            brandName: '',
            storeId: '',
            extensions: '',
            files: ''
        }
    })

    useEffect(() => {
        getAPI('stores').then(data => setStores(data))
    }, [])

    const dataChange = (e) => {
        const { name, value } = e.target
        setBrand({
            data: {
                ...brand.data,
                [name]: value
            }
        })
    }

    const dataFile = (e) => {
        fileUpload(e).then(data => {
            setBrand({
                data: {
                    ...brand.data,
                    ...data
                }

            })
        })
    }

    const insertBrand = () => {
        postAPI('brands', brand.data, () => navigate('/brands'))
    }

    const back = () => navigate(-1)

    return (
        <>
            <Header />
            <Container>
                <h2 className="my-3">Brand Insert</h2>
                <Button className="mb-3" variant="secondary" onClick={back}>Back</Button>
                <Card >
                    <Card.Body>
                        <Form as={Row}>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Brand name <span className="text-danger">*</span></Form.Label>
                                    <Form.Control name="brandName" type="text" placeholder="Enter name" onChange={dataChange} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Photo <span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="file" onChange={dataFile} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <DropdownOption data={stores} title="Store name" name="storeId"
                                        onChange={dataChange} optionTitle="Choose store" option="storeName" value="id" />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Button onClick={insertBrand} variant="primary" type="button">
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

export default BrandInsert