import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default () => {
    const [formValues, setFormValues] = useState({
        email: '', password: ''
    });

    const handleFormChange = e => {
        setFormValues({...formValues, [e.target.name]: e.target.value});
    }

    return (
        <Form>
            <div>
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
            </div>

            <div className='d-flex flex-column'>
                <Button size="sm" type="submit" className='auth__form__submit'>
                    Login
                </Button>

                <div className='auth__form__link'>
                    <span>Do not have an account?&nbsp;</span>
                    <Link to='/sign-up' >Sign up</Link>
                </div>
            </div>
        </Form>
    )
}