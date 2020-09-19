import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGlobe } from '@fortawesome/free-solid-svg-icons';
import AuthContext from "../../configs/authContext";

export default class NavbarComponent extends React.Component {
    static contextType = AuthContext;
    render() {
        const { user, logout } = this.context;
        return (
            <Navbar  bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <Navbar.Brand href="/">
                        <h4 className="text-warning"><FontAwesomeIcon icon={faGlobe} /> Scuffed Forum</h4>
                    </Navbar.Brand>
                            
                            {user &&
                             <Nav.Link as={NavLink} to="/post/list">Posts</Nav.Link>
                             
                             }
                             {user &&
                             <Nav.Link as={NavLink} to="/post/myList">MyList</Nav.Link>
                            }
                        </Nav>
                        <Nav>
                        <Nav.Link as={NavLink} to="/about">About</Nav.Link>
                            {user ?
                                <NavDropdown title={user.username} alignRight>
                                    <NavDropdown.Item onClick={() => logout()}>Logout</NavDropdown.Item>
                                </NavDropdown> :
                                <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}