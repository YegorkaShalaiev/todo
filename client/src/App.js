import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import Routes from './Routes';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/rootStyles.less';

export default () => {
    return (
        <Router>
            <Routes/>
        </Router>
    );
}