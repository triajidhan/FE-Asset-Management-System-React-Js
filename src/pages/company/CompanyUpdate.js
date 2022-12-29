import { useEffect, useState } from "react"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { Header } from "../../components/Header"
import { fileUpload } from "../../service/File.service"
import { getAPI, putAPI } from "../../utils/constants"

const CompanyUpdate = () => {
    const navigate = useNavigate()
    const companyId = useParams().id

    const [constant, setConstant] = useState({
        data: {
            companyCode: '',
            phoneNo: ''
        }
    })

    const [company, setCompany] = useState({
        data: {
            id: 0,
            companyName: '',
            address: '',
            files: '',
            extensions: '',
            isActive: ''
        }
    })

    useEffect(() => {
        getAPI('companies/' + companyId)
            .then(data => {
                setCompany({
                    data: {
                        id: companyId,
                        companyName: data.companyName,
                        address: data.address,
                        isActive: data.isActive
                    }
                })
                setConstant({
                    data: {
                        companyCode: data.companyCode,
                        phoneNo: data.phoneNo
                    }
                })
            })
    }, [])

    const dataChange = (e) => {
        const { name, value } = e.target
        setCompany({
            data: {
                ...company.data,
                [name]: value
            }
        })
    }

    const checkChange = (e) => {
        const { name, checked } = e.target
        setCompany({
            data: {
                ...company.data,
                [name]: checked
            }
        })
    }

    const dataFile = (e) => {
        fileUpload(e).then(data => {
            setCompany({
                data: {
                    ...company.data,
                    ...data
                }

            })
        })
    }

    const updateCompany = () => {
        putAPI('companies', company.data, () => navigate('/companies'))
    }

    const back = () => navigate(-1)

    return (
        <>
            <Header />
            <Container>
                <h2 className="my-3">Company Update</h2>
                <Button className="mb-3" type="button" onClick={back} variant="secondary">Back</Button >
                <Card >
                    <Card.Body>
                        <Form as={Row}>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Company name <span className="text-danger">*</span></Form.Label>
                                    <Form.Control name="companyName" type="text" placeholder="Enter name" onChange={dataChange}
                                        defaultValue={company.data.companyName}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Company code </Form.Label>
                                    <Form.Control name="companyCode" type="text"
                                        defaultValue={constant.data.companyCode} disabled />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Phone number</Form.Label>
                                    <Form.Control name="phoneNo" type="text" defaultValue={constant.data.phoneNo} disabled />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Address <span className="text-danger">*</span></Form.Label>
                                    <Form.Control name="address" type="text" placeholder="Enter address" onChange={dataChange}
                                        defaultValue={company.data.address} />
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
                                    <Form.Label>Is Active <span className="text-danger">*</span></Form.Label>
                                    <Form.Check
                                        name="isActive"
                                        type="switch"
                                        id="custom-switch"
                                        label={String(company.data.isActive)}
                                        checked={company.data.isActive}
                                        onChange={checkChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Button onClick={updateCompany} variant="primary" type="button">
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

export default CompanyUpdate