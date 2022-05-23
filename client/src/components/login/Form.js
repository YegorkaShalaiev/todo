import React from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { login } from "../../api/auth/login";

export default () => {
    const { values, errors, handleInputChange, handleSubmit } = useForm(login, ['email', 'password']);

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
                    />
                    <Form.Label className="auth__form__label">Password</Form.Label>
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
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