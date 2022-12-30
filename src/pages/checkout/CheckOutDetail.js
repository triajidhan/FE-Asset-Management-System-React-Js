import { useEffect, useState } from "react"
import { Button, Container, Table } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { Header } from "../../components/Header"
import { getAPI } from "../../utils/constants"

const CheckOutDetail = () => {
    const navigate = useNavigate()
    const checkOutId = useParams().id
    const [checkOutDetails, setCheckOutDetails] = useState([])
    const [checkOut, setCheckOut] = useState({})

    useEffect(() => {
        init()
    }, [])

    const init = () => {
        console.log(checkOutId)
        getAPI('checkout-details/?checkout-id=' + checkOutId).then(data => setCheckOutDetails(data))
        getAPI('checkouts/' + checkOutId).then(data => setCheckOut(data))
    }

    const back = () => navigate(-1)

    return (
        <>
            <Header />
            <Container>
                <h2 className="my-3">
                    {
                        checkOut.assetName ? checkOut.assetName :
                            checkOut.placement ? checkOut.placement :
                                checkOut.employeeName
                    } ({checkOut.checkOutTrx})
                </h2>
                <Button variant="secondary" className="mb-3" onClick={back}>Back</Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Asset Name</th>
                            <th>Return Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {checkOutDetails.map((val, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{val.assetName}</td>
                                    <td>{val.returnTime ? val.returnTime : '-'}</td>
                                </tr>
                            )
                        }
                        )}
                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default CheckOutDetail