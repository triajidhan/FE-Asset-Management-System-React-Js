import { useEffect, useState } from "react"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import DropdownOption from "../../components/DropdownOption"
import { Header } from "../../components/Header"
import { fileUpload } from "../../service/File.service"
import { getAPI, putAPI } from "../../utils/constants"

const AssetUpdate = () => {
    const navigate = useNavigate()
    const assetId = useParams().id
    const [assetTypes, setAssetTypes] = useState([])
    const [status, setStatus] = useState([])
    const [brands, setBrands] = useState([])
    const [companies, setCompanies] = useState([])

    const [constant, setConstant] = useState({
        data: {
            serialNumber: '',
            invoiceCode: ''
        }
    })
    const [asset, setAsset] = useState({
        data: {
            id: 0,
            assetName: '',
            expiredAt: '',
            assetTypeId: '',
            companyId: '',
            brandId: '',
            statusId: '',
            extensions: '',
            files: '',
            isActive: ''
        }
    })

    useEffect(() => {
        getAPI('asset-types').then(data => setAssetTypes(data))
        getAPI('companies').then(data => setCompanies(data))
        getAPI('brands').then(data => setBrands(data))
        getAPI('statuses').then(data => setStatus(data))

        getAPI('assets/' + assetId).then(data => {
            setAsset({
                data: {
                    id: assetId,
                    assetName: data.assetName,
                    expiredAt: data.expiredAt,
                    assetTypeId: data.assetTypeId,
                    companyId: data.companyId,
                    brandId: data.brandId,
                    statusId: data.statusId,
                    extensions: '',
                    files: '',
                    isActive: data.isActive
                }
            })
            setConstant({
                data: {
                    serialNumber: data.serialNumber,
                    invoiceCode: data.invoiceCode
                }
            })
        })
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

    const checkChange = (e) => {
        const { name, checked } = e.target
        setAsset({
            data: {
                ...asset.data,
                [name]: checked
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

    const updateAsset = () => {
        putAPI('assets', asset.data, () => navigate('/assets'))
    }

    const back = () => navigate(-1)

    return (
        <>
            <Header />
            <Container>
                <h2 className="my-3">Asset Update</h2>
                <Button className="mb-3" type="button" onClick={back} variant="secondary">Back</Button >
                <Card >
                    <Card.Body>
                        <Form as={Row}>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Asset name <span className="text-danger">*</span></Form.Label>
                                    <Form.Control name="assetName" type="text" placeholder="Enter name" onChange={dataChange}
                                        defaultValue={asset.data.assetName} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Serial Number</Form.Label>
                                    <Form.Control name="serialNumber" type="text" defaultValue={constant.data.serialNumber} disabled />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Invoice code</Form.Label>
                                    <Form.Control name="invoiceCode" type="text" defaultValue={constant.data.invoiceCode} disabled />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Expired at <span className="text-danger">*</span></Form.Label>
                                    <Form.Control name="expiredAt" type="date" placeholder="Enter code" onChange={dataChange}
                                        defaultValue={asset.data.expiredAt}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <DropdownOption data={assetTypes} title="Type name" name="assetTypeId"
                                        onChange={dataChange} optionTitle="Choose type" option="typeName" value="id"
                                        item={asset.data.assetTypeId}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <DropdownOption data={companies} title="Company name" name="companyId"
                                        onChange={dataChange} optionTitle="Choose company" option="companyName" value="id"
                                        item={asset.data.companyId}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <DropdownOption data={brands} title="Brand name" name="brandId"
                                        onChange={dataChange} optionTitle="Choose brand" option="brandName" value="id"
                                        item={asset.data.brandId}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <DropdownOption data={status} title="Status name" name="statusId"
                                        onChange={dataChange} optionTitle="Choose status" option="status" value="id"
                                        item={asset.data.statusId}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Photo <span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="file" onChange={dataFile} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Is Active <span className="text-danger">*</span></Form.Label>
                                    <Form.Check name="isActive" type="switch" id="custom-switch" label={String(asset.data.isActive)}
                                        checked={asset.data.isActive} onChange={checkChange} />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Button onClick={updateAsset} variant="primary" type="button">
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

export default AssetUpdate