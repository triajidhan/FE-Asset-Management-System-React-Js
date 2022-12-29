import { useState } from "react"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { Header } from "../../components/Header"
import { fileUpload } from "../../service/File.service"
import { postAPI } from "../../utils/constants"

const CompanyInsert = () => {
    const navigate = useNavigate()

    const [company, setCompany] = useState({
        data: {
            companyName: '',
            companyCode: '',
            address: '',
            phoneNo: '',
            extensions: '',
            files: ''
        }
    })

    const dataChange = (e) => {
        const { name, value } = e.target
        setCompany({
            data: {
                ...company.data,
                [name]: value
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

    const insertCompany = () => {
        postAPI('companies', company.data, () => navigate('/companies'))
    }

    const back = () => navigate(-1)

    return (
        <>
            <Header />
            <Container>
                <h2 className="my-3">Company Insert</h2>
                <Button className="mb-3" variant="secondary" onClick={back}>Back</Button>
                <Card >
                    <Card.Body>
                        <Form as={Row}>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Company name <span className="text-danger">*</span></Form.Label>
                                    <Form.Control name="companyName" type="text" placeholder="Enter name" onChange={dataChange} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Company code <span className="text-danger">*</span></Form.Label>
                                    <Form.Control name="companyCode" type="text" placeholder="Enter code" onChange={dataChange} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Phone number <span className="text-danger">*</span></Form.Label>
                                    <Form.Control name="phoneNo" type="text" placeholder="Enter phone number" onChange={dataChange} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Address <span className="text-danger">*</span></Form.Label>
                                    <Form.Control name="address" type="text" placeholder="Enter address" onChange={dataChange} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Photo <span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="file" onChange={dataFile} />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Button onClick={insertCompany} variant="primary" type="button">
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

export default CompanyInsert