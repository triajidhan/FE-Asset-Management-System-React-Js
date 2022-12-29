import { useEffect, useState } from "react"
import { Button, Container, Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Header } from "../../components/Header"
import { getAPI } from "../../utils/constants"

const CheckOutList = () => {
    const [checkOuts, setCheckOuts] = useState([])

    useEffect(() => {
        init()
    }, [])

    const init = () => {
        getAPI('checkouts').then(data => setCheckOuts(data))
    }

    return (
        <>
            <Header />
            <Container>
                <h2 className="my-3">Checkout List</h2>
                <Link to="/checkouts/new">
                    <Button className="mb-3">Insert</Button>
                </Link>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Transaction No</th>
                            <th>Checkout Time</th>
                            <th>Placement</th>
                            <th>Employee</th>
                            <th>General Asset</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {checkOuts.map((val, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{val.checkOutTrx}</td>
                                    <td>{val.checkOutTime}</td>
                                    <td>{val.placement ? val.placement : '-'}</td>
                                    <td>{val.assetName ? val.assetName : '-'}</td>
                                    <td>{val.employeeName ? val.employeeName : '-'}</td>
                                    <td className="text-center">
                                        <Link to={"/checkouts/details/" + val.id}>
                                            <Button variant="primary">Show Detail</Button>
                                        </Link>
                                    </td>
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

export default CheckOutList