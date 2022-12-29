import { useEffect, useState } from "react"
import { Button, ButtonGroup, Container, Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Header } from "../../components/Header"
import ModalPopUp from "../../components/ModalPopUp"
import { delAPI, getAPI } from "../../utils/constants"

const EmployeeList = () => {
    const [employees, setEmployees] = useState([])
    const [show, setShow] = useState(false)
    const [employeeId, setEmployeeId] = useState('')

    useEffect(() => {
        init()
    }, [])

    const init = () => {
        getAPI("employees")
            .then(res => setEmployees(res))
    }

    const handleClose = () => setShow(false)
    const handleShow = (id) => {
        setEmployeeId(id)
        setShow(true)
    }

    const deleteEmployee = () => {
        delAPI('employees/' + employeeId, () => {
            setShow(false)
            init()
        })
    }


    return (
        <>
            <Header />
            <Container>
                <h2 className="my-3">Employee List</h2>
                <Link to="/employees/new">
                    <Button className="mb-3">Insert</Button>
                </Link>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Full Name</th>
                            <th>Code</th>
                            <th>Company</th>
                            <th>Is Active</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((val, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{val.employeeName}</td>
                                    <td>{val.employeeCode}</td>
                                    <td>{val.companyName}</td>
                                    <td>{String(val.isActive)}</td>
                                    <td className="text-center">
                                        <ButtonGroup>
                                            <Link to={"/employees/edit/" + val.id}>
                                                <Button variant="primary">Update</Button>
                                            </Link>
                                            <Button variant="danger" onClick={() => handleShow(val.id)}>Delete</Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            )
                        }
                        )}
                    </tbody>
                </Table>

                <ModalPopUp show={show} onHide={handleClose} title="Delete Confimation"
                    body="Are you sure want to delete this employee?"
                    no="Close" yes="Yes" fcNo={handleClose} fcYes={deleteEmployee}
                />

            </Container>
        </>
    )
}

export default EmployeeList