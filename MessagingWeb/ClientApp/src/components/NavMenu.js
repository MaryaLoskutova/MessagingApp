import React, { useContext, useState } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'
import { UserContext } from '../UserContext';
import './NavMenu.css';

export function NavMenu() {
    const { user, setUser } = useContext(UserContext);
    const [collapsed, setCollapsed] = useState(true);

    function logout() {
        setUser(null);
        Cookies.remove('token')
    }

    function toggleNavbar() {
        setCollapsed(!collapsed);
    }

    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                <Container>
                    <NavbarBrand tag={Link} to="/">MessagingWeb</NavbarBrand>
                    <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
                        <ul className="navbar-nav flex-grow">
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                {!user && <NavLink tag={Link} className="text-dark" to="/login">Log In</NavLink>}
                                {user && <NavLink className="text-dark" href="#" onClick={logout}>Log Out</NavLink>}
                            </NavItem>
                        </ul>
                    </Collapse>
                </Container>
            </Navbar>
        </header>
    );
}
