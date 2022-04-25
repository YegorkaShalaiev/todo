import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import SignUp from './components/SignUp';
import NotFound from './components/NotFound';
import Layout from "./components/Layout";
import List from "./components/List";

export default () => {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<List/>} />
                <Route exact path='/login' element={<Login/>} />
                <Route exact path='/sign-up' element={<SignUp/>} />
                <Route path='*' element={<NotFound/>} />
            </Route>
        </Routes>
    )
}