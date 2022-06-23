import React from 'react';
import { Outlet } from "react-router-dom";
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import { Nav, Container } from 'react-bootstrap';

import 'styles/rootStyles.less';

export default () => {
    return (
        <ThemeProvider>
            <Container fluid={true} className='app m-0 p-0 h-100'>
                <Nav>
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/login">Log in</Nav.Link>
                    <Nav.Link href="/sign-up">Sign up</Nav.Link>
                    <Nav.Link href="/profile">Profile</Nav.Link>
                </Nav>

                <Outlet/>
            </Container>
        </ThemeProvider>
    );
}