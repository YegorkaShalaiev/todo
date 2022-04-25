import React from 'react';
import { Outlet } from "react-router-dom";
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import Navbar from 'react-bootstrap/Navbar';
import { Container } from "react-bootstrap";


import '../styles.less';

export default () => {
    return (
        <ThemeProvider>
            <Container fluid={true} className='app m-0 p-0'>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/">ToDo List</Navbar.Brand>
                    </Container>
                </Navbar>

                <Outlet/>
            </Container>
        </ThemeProvider>
    );
}