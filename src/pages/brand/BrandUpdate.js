import { useEffect, useState } from "react"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import DropdownOption from "../../components/DropdownOption"
import { Header } from "../../components/Header"
import { fileUpload } from "../../service/File.service"
import { getAPI, putAPI } from "../../utils/constants"

const BrandUpdate = () => {
    const navigate = useNavigate()
    const brandId = useParams().id
    const [stores, setStores] = useState([])

    const [brand, setBrand] = useState({
        data: {
            id: 0,
            brandName: '',
            storeId: '',
            files: '',
            extensions: '',
            isActive: ''
        }
    })

    useEffect(() => {
        getAPI('stores').then(data => setStores(data))
        getAPI('brands/' + brandId).then(data => {
            setBrand({
                data: {
                    id: brandId,
                    brandName: data.brandName,
                    storeId: data.storeId,
                    isActive: data.isActive
                }
            })
        })
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

    const checkChange = (e) => {
        const { name, checked } = e.target
        setBrand({
            data: {
                ...brand.data,
                [name]: checked
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

    const updateBrand = () => {
        putAPI('brands', brand.data, () => navigate('/brands'))
    }

    const back = () => navigate(-1)

    return (
        <>
            <Header />
            <Container>
                <h2 className="my-3">Brand Update</h2>
                <Button className="mb-3" type="button" onClick={back} variant="secondary">Back</Button >
                <Card >
                    <Card.Body>
                        <Form as={Row}>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Brand name <span className="text-danger">*</span></Form.Label>
                                    <Form.Control name="brandName" type="text" placeholder="Enter name" onChange={dataChange} defaultValue={brand.data.brandName} />
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
                                    <DropdownOption data={stores} title="Store name" name="storeId" item={brand.data.storeId}
                                        onChange={dataChange} optionTitle="Choose store" option="storeName" value="id" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Is Active <span className="text-danger">*</span></Form.Label>
                                    <Form.Check
                                        name="isActive"
                                        type="switch"
                                        id="custom-switch"
                                        label={String(brand.data.isActive)}
                                        checked={brand.data.isActive}
                                        onChange={checkChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Button onClick={updateBrand} variant="primary" type="button">
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

export default BrandUpdate