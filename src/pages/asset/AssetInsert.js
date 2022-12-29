import { useEffect, useState } from "react"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import DropdownOption from "../../components/DropdownOption"
import { Header } from "../../components/Header"
import { fileUpload } from "../../service/File.service"
import { getAPI, postAPI } from "../../utils/constants"

const AssetInsert = () => {
    const navigate = useNavigate()

    const [assetTypes, setAssetTypes] = useState([])
    const [status, setStatus] = useState([])
    const [brands, setBrands] = useState([])
    const [companies, setCompanies] = useState([])

    const [asset, setAsset] = useState({
        data: {
            assetName: '',
            serialNumber: '',
            invoiceCode: '',
            expiredAt: '',
            assetTypeId: '',
            companyId: '',
            brandId: '',
            statusId: '',
            extensions: '',
            files: ''
        }
    })

    useEffect(() => {
        getAPI('asset-types').then(data => setAssetTypes(data))
        getAPI('companies').then(data => setCompanies(data))
        getAPI('brands').then(data => setBrands(data))
        getAPI('statuses').then(data => setStatus(data))
    }, [])

    const dataChange = (e) => {
        const { name, value } = e.target
        setAsset({
            data: {
                ...asset.data,
                [name]: value
            }
        })
    }

    const dataFile = (e) => {
        fileUpload(e).then(data => {
            setAsset({
                data: {
                    ...asset.data,
                    ...data
                }
            })
        })
    }

    const insertAsset = () => {
        postAPI('assets', asset.data, () => navigate('/assets'))
    }

    const back = () => navigate(-1)

    return (
        <>
            <Header />
            <Container>
                <h2 className="my-3">Asset Insert</h2>
                <Button className="mb-3" variant="secondary" onClick={back}>Back</Button>
                <Card >
                    <Card.Body>
                        <Form as={Row}>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Asset name <span className="text-danger">*</span></Form.Label>
                                    <Form.Control name="assetName" type="text" placeholder="Enter name" onChange={dataChange} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Serial Number <span className="text-danger">*</span></Form.Label>
                                    <Form.Control name="serialNumber" type="text" placeholder="Enter serial no" onChange={dataChange} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Invoice code <span className="text-danger">*</span></Form.Label>
                                    <Form.Control name="invoiceCode" type="text" placeholder="Enter code" onChange={dataChange} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Expired at <span className="text-danger">*</span></Form.Label>
                                    <Form.Control name="expiredAt" type="date" placeholder="Enter code" onChange={dataChange} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <DropdownOption data={assetTypes} title="Type name" name="assetTypeId"
                                        onChange={dataChange} optionTitle="Choose type" option="typeName" value="id" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <DropdownOption data={companies} title="Company name" name="companyId"
                                        onChange={dataChange} optionTitle="Choose company" option="companyName" value="id" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <DropdownOption data={brands} title="Brand name" name="brandId"
                                        onChange={dataChange} optionTitle="Choose brand" option="brandName" value="id" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <DropdownOption data={status} title="Status name" name="statusId"
                                        onChange={dataChange} optionTitle="Choose status" option="status" value="id" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Photo <span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="file" onChange={dataFile} />
                                </Form.Group>
                            </Col>

                            <Col xs={12}>
                                <Button onClick={insertAsset} variant="primary" type="button">
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

export default AssetInsert