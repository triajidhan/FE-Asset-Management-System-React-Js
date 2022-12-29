import { useEffect, useState } from "react"
import { Button, ButtonGroup, Container, Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Header } from "../../components/Header"
import ModalPopUp from "../../components/ModalPopUp"
import { delAPI, fileUrl, getAPI } from "../../utils/constants"

const CompanyList = () => {
    const [companies, setCompanies] = useState([])
    const [show, setShow] = useState(false)
    const [companyId, setCompanyId] = useState('')

    useEffect(() => {
        init()
    }, [])

    const init = () => {
        getAPI('companies').then(data => setCompanies(data))
    }

    const handleClose = () => setShow(false)
    const handleShow = (id) => {
        setCompanyId(id)
        setShow(true)
    }

    const deleteCompany = () => {
        delAPI('companies/' + companyId, () => {
            setShow(false)
            init()
        })
    }

    return (
        <>
            <Header />
            <Container>
                <h2 className="my-3">Company List</h2>
                <Link to="/companies/new">
                    <Button className="mb-3">Insert</Button>
                </Link>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Company Name</th>
                            <th>Company Code</th>
                            <th>Address</th>
                            <th>Phone No</th>
                            <th>Photo</th>
                            <th>Is Active</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companies.map((val, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{val.companyName}</td>
                                    <td>{val.companyCode}</td>
                                    <td>{val.address}</td>
                                    <td>{val.phoneNo}</td>
                                    <td>
                                        <img className="img-table" src={fileUrl + val.photoId} />
                                    </td>
                                    <td>{String(val.isActive)}</td>
                                    <td className="text-center">
                                        <ButtonGroup>
                                            <Link to={"/companies/edit/" + val.id}>
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
                    body="Are you sure want to delete this company?"
                    no="Close" yes="Yes" fcNo={handleClose} fcYes={deleteCompany}
                />

            </Container>
        </>
    )
}

export default CompanyList