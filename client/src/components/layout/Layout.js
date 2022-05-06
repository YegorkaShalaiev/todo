import React from 'react';
import { Outlet } from "react-router-dom";
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import { Navbar, Offcanvas, Nav, Container } from 'react-bootstrap';

import '../../styles/rootStyles.less';

export default () => {
    return (
        <ThemeProvider>
            <Container fluid={true} className='app m-0 p-0 h-100'>
                <Navbar bg="light" expand={false}>
                    <Container>
                        <Navbar.Toggle aria-controls="offcanvasNavbar" />
                        <Navbar.Offcanvas
                            id="offcanvasNavbar"
                            aria-labelledby="offcanvasNavbarLabel"
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id="offcanvasNavbarLabel">
                                    Todo list
                                </Offcanvas.Title>
                                <Offcanvas.Body>
                                    <Nav.Link href="/">Home</Nav.Link>
                                    <Nav.Link href="/login">Log in</Nav.Link>
                                </Offcanvas.Body>
                            </Offcanvas.Header>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>

                <Outlet/>
            </Container>
        </ThemeProvider>
    );
}