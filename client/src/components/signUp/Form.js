import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

import '../../styles/auth.less';

export default () => {
    const [formValues, setFormValues] = useState({
        email: '', password: '', confirmPassword: ''
    });

    const handleFormChange = e => {
        setFormValues({...formValues, [e.target.name]: e.target.value});
    }

    return (
        <Form>
            <Form.Group className="auth__form-group" controlId="authEmail">
                <Form.Control
                    name='email'
                    type="email"
                    className="auth__form__control"
                    placeholder="Email"
                    onChange={handleFormChange}
                />
                <Form.Label className="auth__form__label">Email address</Form.Label>
            </Form.Group>

            <Form.Group className="auth__form-group" controlId="authPassword">
                <Form.Control
                    name='password'
                    type="password"
                    className="auth__form__control"
                    placeholder="Password"
                    onChange={handleFormChange}
                />
                <Form.Label className="auth__form__label">Password</Form.Label>
            </Form.Group>

            <Form.Group className="auth__form-group" controlId="authPasswordConfirm">
                <Form.Control
                    name='passwordConfirm'
                    type="password"
                    className="auth__form__control"
                    placeholder="Confirm password"
                    onChange={handleFormChange}
                />
                <Form.Label className="auth__form__label">Confirm password</Form.Label>
            </Form.Group>

            <div className='mt-2 d-flex flex-column'>
                <Button size="sm" type="submit" className='auth__form__submit'>
                    Sign Up
                </Button>

                <div className='auth__form__link'>
                    <span>Already have an account?&nbsp;</span>
                    <Link to='/login' >Login</Link>
                </div>

            </div>




        </Form>
    )
}