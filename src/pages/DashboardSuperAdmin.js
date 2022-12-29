import { useEffect, useState } from "react"
import { Header } from "../components/Header"
import { getAPI } from "../utils/constants"

const DashboardSuperAdmin = () => {
    const [user, setUser] = useState(0)
    const [employee, setEmployee] = useState(0)
    const [company, setCompany] = useState(0)
    const [store, setStore] = useState(0)
    const [brand, setBrand] = useState(0)
    const [asset, setAsset] = useState(0)

    useEffect(() => {
        getAPI('users').then(data => setUser(data.length))
        getAPI('companies').then(data => setCompany(data.length))
        getAPI('employees').then(data => setEmployee(data.length))
        getAPI('stores').then(data => setStore(data.length))
        getAPI('brands').then(data => setBrand(data.length))
        getAPI('assets').then(data => setAsset(data.length))
    }, [])

    return (
        <>
            <Header />
            <h1>ini dashboard</h1>
            <h2>User : {user}</h2>
            <h2>Employee : {employee}</h2>
            <h2>Company : {company}</h2>
            <h2>Store : {store}</h2>
            <h2>Brand : {brand}</h2>
            <h2>Asset : {asset}</h2>
        </>
    )
}

export default DashboardSuperAdmin
