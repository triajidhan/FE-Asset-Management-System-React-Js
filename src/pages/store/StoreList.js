import { useEffect, useState } from "react"
import { Button, ButtonGroup, Container, Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Header } from "../../components/Header"
import ModalPopUp from "../../components/ModalPopUp"
import { delAPI, fileUrl, getAPI } from "../../utils/constants"

const StoreList = () => {
    const [stores, setStores] = useState([])
    const [show, setShow] = useState(false)
    const [storeId, setStoreId] = useState('')

    useEffect(() => {
        init()
    }, [])

    const init = () => {
        getAPI('stores').then(data => setStores(data))
    }

    const handleClose = () => setShow(false)
    const handleShow = (id) => {
        setStoreId(id)
        setShow(true)
    }

    const deleteStore = () => {
        delAPI('stores/' + storeId, () => {
            setShow(false)
            init()
        })
    }


    return (
        <>
            <Header />
            <Container>
                <h2 className="my-3">Store List</h2>
                <Link to="/stores/new">
                    <Button className="mb-3">Insert</Button>
                </Link>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Store Name</th>
                            <th>Photo</th>
                            <th>Is Active</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stores.map((val, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{val.storeName}</td>
                                    <td>
                                        <img className="img-table" src={fileUrl + val.photoId} />
                                    </td>
                                    <td>{String(val.isActive)}</td>
                                    <td className="text-center">
                                        <ButtonGroup>
                                            <Link to={"/stores/edit/" + val.id}>
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
                    body="Are you sure want to delete this store?"
                    no="Close" yes="Yes" fcNo={handleClose} fcYes={deleteStore}
                />

            </Container>
        </>
    )
}
export default StoreList