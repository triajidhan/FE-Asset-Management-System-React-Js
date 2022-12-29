import { useEffect, useState } from "react"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import DropdownOption from "../../components/DropdownOption"
import { Header } from "../../components/Header"
import { getAPI, postAPI } from "../../utils/constants"

const EmployeeInsert = () => {
    const navigate = useNavigate()

    const [companies, setCompanies] = useState([])
    const [employee, setEmployee] = useState({
        data: {
            employeeName: '',
            employeeCode: '',
            companyId: ''
        }
    })

    useEffect(() => {
        getAPI('companies').then(res => {
            setCompanies(res)
        })
    }, [])

    const dataChange = (e) => {
        const { name, value } = e.target
        setEmployee({
            data: {
                ...employee.data,
                [name]: value
            }
        })
    }

    const insertEmployee = () => {
        postAPI('employees', employee.data, () => {
            navigate('/employees')
        })
    }

    const back = () => {
        navigate(-1)
    }

    return (
        <>
            <Header />
            <Container>
                <h2 className="my-3">Employee Insert</h2>
                <Button className="mb-3" variant="secondary" onClick={back}>Back</Button>
                <Card >
                    <Card.Body>
                        <Form as={Row}>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Employee name <span className="text-danger">*</span></Form.Label>
                                    <Form.Control name="employeeName" type="text" placeholder="Enter name" onChange={dataChange} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Employee code <span className="text-danger">*</span></Form.Label>
                                    <Form.Control name="employeeCode" type="text" placeholder="Enter code" onChange={dataChange} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <DropdownOption data={companies} title="Company name" name="companyId"
                                        onChange={dataChange} optionTitle="Choose company" option="companyName" value="id" />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Button onClick={insertEmployee} variant="primary" type="button">
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

export default EmployeeInsert