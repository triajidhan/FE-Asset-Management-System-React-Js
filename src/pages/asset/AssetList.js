import { useEffect, useState } from "react"
import { Button, ButtonGroup, Container, Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Header } from "../../components/Header"
import ModalPopUp from "../../components/ModalPopUp"
import { delAPI, fileUrl, getAPI } from "../../utils/constants"

const AssetList = () => {
    const [assets, setAssets] = useState([])
    const [show, setShow] = useState(false)
    const [assetId, setAssetId] = useState('')

    useEffect(() => {
        init()
    }, [])

    const init = () => {
        getAPI("assets").then(data => setAssets(data))
    }

    const handleClose = () => setShow(false)
    const handleShow = (id) => {
        setAssetId(id)
        setShow(true)
    }

    const deleteAsset = () => {
        delAPI('assets/' + assetId, () => {
            setShow(false)
            init()
        })
    }

    return (
        <>
            <Header />
            <Container>
                <h2 className="my-3">Asset List</h2>
                <Link to="/assets/new">
                    <Button className="mb-3">Insert</Button>
                </Link>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Asset Name</th>
                            <th>Serial No</th>
                            <th>Invoice Code</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Expired At</th>
                            <th>Company</th>
                            <th>Photo</th>
                            <th>Is Active</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assets.map((val, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{val.assetName}</td>
                                    <td>{val.serialNumber}</td>
                                    <td>{val.invoiceCode}</td>
                                    <td>{val.typeName}</td>
                                    <td>{val.status}</td>
                                    <td>{val.expiredAt ? val.expiredAt : '-'}</td>
                                    <td>{val.companyName}</td>
                                    <td>
                                        <img className="img-table" src={fileUrl + val.photoId} />
                                    </td>
                                    <td>{String(val.isActive)}</td>
                                    <td className="text-center">
                                        <ButtonGroup>
                                            <Link to={"/assets/edit/" + val.id}>
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
                    body="Are you sure want to delete this asset?"
                    no="Close" yes="Yes" fcNo={handleClose} fcYes={deleteAsset} />

            </Container>
        </>
    )
}

export default AssetList