import { useEffect, useState } from "react"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import DropdownOption from "../../components/DropdownOption"
import { Header } from "../../components/Header"
import { getAPI, postAPI } from "../../utils/constants"

const CheckOutInsert = () => {
    const navigate = useNavigate()
    const checkOutTo = [
        { placement: "Place" },
        { placement: "General Asset" },
        { placement: "Employee" }
    ]

    const [assets, setAssets] = useState([])
    const [compAssets, setCompAssets] = useState([])
    const [placement, setPlacement] = useState([])
    const [getAssets, setGenAssets] = useState([])
    const [employees, setEmployees] = useState([])
    const [checkOut, setCheckOut] = useState({
        data: {
            placement: null,
            generalAssetId: null,
            employeeId: null,
            checkOutDetails: []
        }
    })

    const [details, setDetails] = useState([
        { assetId: '', returnTime: '' }
    ])

    useEffect(() => {
        getAPI('assets/asset-deployables/?type-code=GA01').then(data => setGenAssets(data))
        getAPI('assets/asset-deployables/?type-code=CO01').then(data => setCompAssets(data))
        getAPI('assets/deployables').then(data => setAssets(data))
        getAPI('employees').then(data => setEmployees(data))
    }, [])

    const dataChange = (e) => {
        console.log(checkOut.data)
        const { name, value } = e.target
        setCheckOut({
            data: {
                ...checkOut.data,
                [name]: value
            }
        })
    }

    const placementChange = (e) => {
        setPlacement(e.target.value)
    }

    const insertCheckOut = () => {
        postAPI('checkouts', checkOut.data, () => navigate('/checkouts'))
    }

    const back = () => navigate(-1)



    const addField = () => {
        let newField = { assetId: '', returnTime: '' }
        setDetails([...details, newField])
    }

    const removeField = (idx) => {
        let data = [...details]
        data.splice(idx, 1)
        setDetails(data)
    }

    const detailChange = (idx, e) => {
        const { name, value } = e.target
        let data = [...details]
        data[idx][name] = value
        setDetails(data)
        setCheckOut({
            data: {
                ...checkOut.data,
                checkOutDetails: details
            }
        })
    }


    return (
        <>
            <Header />
            <Container>
                <h2 className="my-3">Checkout Insert</h2>
                <Button className="mb-3" variant="secondary" onClick={back}>Back</Button>
                <Card >
                    <Card.Body>
                        <Form as={Row}>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <DropdownOption data={checkOutTo} title="Checkout to" name="placement"
                                        onChange={placementChange} optionTitle="Choose placement" option="placement" value="id" />
                                </Form.Group>
                            </Col>
                            {placement === checkOutTo[0].placement &&
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Place <span className="text-danger">*</span></Form.Label>
                                        <Form.Control name="placement" type="text" placeholder="Enter place" onChange={dataChange} />
                                    </Form.Group>
                                </Col>
                            } {placement === checkOutTo[1].placement &&
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <DropdownOption data={getAssets} title="General asset" name="generalAssetId"
                                            onChange={dataChange} optionTitle="Choose asset" option="assetName" value="id" />
                                    </Form.Group>
                                </Col>
                            } {placement === checkOutTo[2].placement &&
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <DropdownOption data={employees} title="Employee name" name="placement"
                                            onChange={dataChange} optionTitle="Choose employee" option="employeeName" value="id" />
                                    </Form.Group>
                                </Col>
                            } {(placement === checkOutTo[0].placement || placement === checkOutTo[2].placement) &&
                                <>
                                    <Col xs={12}>
                                        <Button variant="success" className="my-3" onClick={addField}>Add</Button>
                                    </Col>
                                    {details.map((val, idx) => {
                                        return (
                                            <Col xs={12} as={Row} key={idx}>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <DropdownOption data={assets} title="Asset name" name="assetId" item={val.assetId}
                                                            onChange={e => detailChange(idx, e)} optionTitle="Choose asset" option="assetName" value="id" />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6} key={idx}>
                                                    <Form.Label>Return time </Form.Label>
                                                    <Form.Group className="mb-3 d-flex">
                                                        <Form.Control name="returnTime" type="datetime-local" onChange={e => detailChange(idx, e)} value={val.returnTime} />
                                                        <Button variant="danger" onClick={() => removeField(idx)}>Delete</Button>
                                                    </Form.Group>
                                                </Col>
                                            </Col>
                                        )
                                    })}
                                </>
                            } {placement === checkOutTo[1].placement &&
                                <>
                                    <Col xs={12}>
                                        <Button variant="success" className="my-3" onClick={addField}>Add</Button>
                                    </Col>
                                    {details.map((val, idx) => {
                                        return (
                                            <Col xs={12} as={Row} key={idx}>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <DropdownOption data={compAssets} title="Asset name" name="assetId" item={val.assetId}
                                                            onChange={e => detailChange(idx, e)} optionTitle="Choose asset" option="assetName" value="id" />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6} key={idx}>
                                                    <Form.Label>Return time </Form.Label>
                                                    <Form.Group className="mb-3 d-flex">
                                                        <Form.Control name="returnTime" type="datetime-local" onChange={e => detailChange(idx, e)} value={val.returnTime} />
                                                        <Button variant="danger" onClick={() => removeField(idx)}>Delete</Button>
                                                    </Form.Group>
                                                </Col>
                                            </Col>
                                        )
                                    })}
                                </>
                            }
                            <Col xs={12}>
                                <Button onClick={insertCheckOut} variant="primary" type="button">
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

export default CheckOutInsert