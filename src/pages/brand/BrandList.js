import { useEffect, useState } from "react"
import { Button, ButtonGroup, Container, Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Header } from "../../components/Header"
import ModalPopUp from "../../components/ModalPopUp"
import { delAPI, fileUrl, getAPI } from "../../utils/constants"

const BrandList = () => {
    const [brands, setBrands] = useState([])
    const [show, setShow] = useState(false)
    const [brandId, setBrandId] = useState('')

    useEffect(() => {
        init()
    }, [])

    const init = () => {
        getAPI('brands').then(data => setBrands(data))
    }

    const handleClose = () => setShow(false)
    const handleShow = (id) => {
        setBrandId(id)
        setShow(true)
    }

    const deleteBrand = () => {
        delAPI('brands/' + brandId, () => {
            setShow(false)
            init()
        })
    }


    return (
        <>
            <Header />
            <Container>
                <h2 className="my-3">Brand List</h2>
                <Link to="/brands/new">
                    <Button className="mb-3">Insert</Button>
                </Link>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Brand Name</th>
                            <th>Store Name</th>
                            <th>Photo</th>
                            <th>Is Active</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brands.map((val, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{val.brandName}</td>
                                    <td>{val.storeName}</td>
                                    <td>
                                        <img className="img-table" src={fileUrl + val.photoId} />
                                    </td>
                                    <td>{String(val.isActive)}</td>
                                    <td className="text-center">
                                        <ButtonGroup>
                                            <Link to={"/brands/edit/" + val.id}>
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
                    body="Are you sure want to delete this brand?"
                    no="Close" yes="Yes" fcNo={handleClose} fcYes={deleteBrand}
                />

            </Container>
        </>
    )
}

export default BrandList