import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";

import { signUp } from "../../api/auth/signUp";

import '../../styles/auth.less';

export default () => {
    const fields = ['email', 'password', 'passwordConfirmation'];

    const { values, errors, handleInputChange, handleSubmit } = useForm(signUp, fields);

    return (
        <Form noValidate onSubmit={handleSubmit}>
            <div>
                <Form.Group className="auth__form-group" controlId="authEmail">
                    <Form.Control
                        name='email'
                        type="email"
                        className="auth__form__control"
                        placeholder="Email"
                        onChange={handleInputChange}
                        value={values.email}
                        isInvalid={errors.email}
                    />
                    <Form.Label className="auth__form__label">Email address</Form.Label>
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="auth__form-group" controlId="authPassword">
                    <Form.Control
                        name='password'
                        type="password"
                        className="auth__form__control"
                        placeholder="Password"
                        onChange={handleInputChange}
                        value={values.password}
                        isInvalid={errors.password}
                        required
                    />
                    <Form.Label className="auth__form__label">Password</Form.Label>
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="auth__form-group" controlId="authPasswordConfirm">
                    <Form.Control
                        name='passwordConfirmation'
                        type="password"
                        className="auth__form__control"
                        placeholder="Confirm password"
                        onChange={handleInputChange}
                        value={values.passwordConfirmation}
                        isInvalid={errors.passwordConfirmation}
                        required
                    />
                    <Form.Label className="auth__form__label">Confirm password</Form.Label>
                    <Form.Control.Feedback type="invalid">{errors.passwordConfirmation}</Form.Control.Feedback>
                </Form.Group>
            </div>

            <div className='d-flex flex-column'>
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