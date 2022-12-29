import { useEffect, useState } from "react"
import { Button, ButtonGroup, Container, Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Header } from "../../components/Header"
import ModalPopUp from "../../components/ModalPopUp"
import { delAPI, fileUrl, getAPI } from "../../utils/constants"

const UserList = () => {
    const [users, setUsers] = useState([])
    const [show, setShow] = useState(false)
    const [userId, setUserId] = useState('')

    useEffect(() => {
        init()
    }, [])

    const init = () => {
        getAPI('users').then(data => setUsers(data))
    }

    const handleClose = () => setShow(false)
    const handleShow = (id) => {
        setUserId(id)
        setShow(true)
    }

    const deleteUser = () => {
        delAPI('users/' + userId, () => {
            setShow(false)
            init()
        })
    }


    return (
        <>
            <Header />
            <Container>
                <h2 className="my-3">User List</h2>
                <Link to="/users/new">
                    <Button className="mb-3">Insert</Button>
                </Link>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Photo</th>
                            <th>Is Active</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((val, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{val.fullName}</td>
                                    <td>{val.email}</td>
                                    <td>
                                        <img className="img-table" src={fileUrl + val.photoId} />
                                    </td>
                                    <td>{String(val.isActive)}</td>
                                    <td className="text-center">
                                        <ButtonGroup>
                                            <Link to={"/users/edit/" + val.id}>
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
                    body="Are you sure want to delete this user?"
                    no="Close" yes="Yes" fcNo={handleClose} fcYes={deleteUser}
                />

            </Container>
        </>
    )
}

export default UserList