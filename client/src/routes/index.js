import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from 'pages/Login';
import SignUp from 'pages/SignUp';
import NotFound from 'pages/NotFound';
import Layout from "components/layout/Layout";
import Dashboard from "pages/Dashboard";
import Profile from "pages/Profile";

export default () => {
    return (
        <Routes>
            <Route>
                <Route exact path='/login' element={<Login/>} />
                <Route exact path='/sign-up' element={<SignUp/>} />
            </Route>

            <Route path='/' element={<Layout/>}>
                <Route index element={<Dashboard/>} />
                <Route path='/profile' element={<Profile/>} />
                <Route path='*' element={<NotFound/>} />
            </Route>
        </Routes>
    )
}