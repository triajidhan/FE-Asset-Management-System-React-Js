import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { ROLE_CODE } from "../utils/Role"

export const Header = () => {
    const myRoleCode = JSON.parse(localStorage.getItem('data')).roleCode
    const myName = JSON.parse(localStorage.getItem('data')).fullName
    const navigate = useNavigate()

    const profile = () => {
        if (myRoleCode == ROLE_CODE.NON_ADMIN) {
            navigate('/profiles/non-admin')
        } else {
            navigate('/profiles/super-admin')
        }
    }

    const logOut = () => {
        localStorage.clear()
        navigate('/')
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Asset Management System</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {myRoleCode == ROLE_CODE.SUPER_ADMIN &&
                        <Nav className="me-auto">
                            <NavDropdown title="Data Master" id="collasible-nav-dropdown">
                                <Link to="/users"><li className="dropdown-item">User</li></Link>
                                <Link to="/stores"><li className="dropdown-item">Store</li></Link>
                                <Link to="/brands"><li className="dropdown-item">Brand</li></Link>
                                <Link to="/companies"><li className="dropdown-item">Company</li></Link>
                                <Link to="/employees"><li className="dropdown-item">Employee</li></Link>
                                <Link to="/assets"><li className="dropdown-item">Asset</li></Link>
                            </NavDropdown>
                        </Nav>
                    } {myRoleCode == ROLE_CODE.NON_ADMIN &&
                        <Nav className="me-auto">
                            <NavDropdown title="Asset" id="collasible-nav-dropdown">
                                <Link to="/checkins"><li className="dropdown-item">Checkin</li></Link>
                                <Link to="/checkouts"><li className="dropdown-item">Checkout</li></Link>
                            </NavDropdown>
                        </Nav>
                    }
                    <Nav>
                        <NavDropdown title={myName} id="collasible-nav-dropdown">
                            <NavDropdown.Item onClick={profile}>My Profile</NavDropdown.Item>
                            <NavDropdown.Item onClick={logOut}>Log Out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}