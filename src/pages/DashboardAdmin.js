import { Header } from "../components/Header"
import { connect } from 'react-redux'

const DashboardAdmin = (props) => {
    return (
        <>
            <Header />
            <h1>Dashboard Non Admin {props.order}</h1>
        </>
    )
}

const mapStateToProps = state => {
    return {
        order: state.totalOrder
    }
}

export default connect(mapStateToProps)(DashboardAdmin)