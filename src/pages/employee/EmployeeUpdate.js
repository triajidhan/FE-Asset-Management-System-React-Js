import { useEffect, useState } from "react"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import DropdownOption from "../../components/DropdownOption"
import { Header } from "../../components/Header"
import { getAPI, putAPI } from "../../utils/constants"

const EmployeeUpdate = () => {
    const navigate = useNavigate()
    const employeeId = useParams().id
    const [companies, setCompanies] = useState([])

    const [constant, setConstant] = useState({
        data: {
            employeeCode: ''
        }
    })
    const [employee, setEmployee] = useState({
        data: {
            id: 0,
            employeeName: '',
            companyId: '',
            isActive: ''
        }
    })

    useEffect(() => {
        getAPI('companies').then(data => setCompanies(data))
        getAPI('employees/' + employeeId).then(data => {
            setEmployee({
                data: {
                    id: employeeId,
                    employeeName: data.employeeName,
                    companyId: data.companyId,
                    isActive: data.isActive
                }
            })
            setConstant({
                data: {
                    employeeCode: data.employeeCode
                }
            })
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

    const checkChange = (e) => {
        const { name, checked } = e.target
        setEmployee({
            data: {
                ...employee.data,
                [name]: checked
            }
        })
    }

    const updateEmployee = () => {
        putAPI('employees', employee.data, () => {
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
                <h2 className="my-3">Employee Update</h2>
                <Button className="mb-3" type="button" onClick={back} variant="secondary">Back</Button >
                <Card >
                    <Card.Body>
                        <Form as={Row}>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Employee name <span className="text-danger">*</span></Form.Label>
                                    <Form.Control name="employeeName" type="text" placeholder="Enter name" onChange={dataChange}
                                        defaultValue={employee.data.employeeName} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Employee code</Form.Label>
                                    <Form.Control type="text" defaultValue={constant.data.employeeCode} disabled />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <DropdownOption data={companies} title="Company name" name="companyId" item={employee.data.companyId}
                                        onChange={dataChange} optionTitle="Choose company" option="companyName" value="id" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Is Active <span className="text-danger">*</span></Form.Label>
                                    <Form.Check name="isActive" type="switch" id="custom-switch" label={String(employee.data.isActive)}
                                        checked={employee.data.isActive} onChange={checkChange} />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Button onClick={updateEmployee} variant="primary" type="button">
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

export default EmployeeUpdate