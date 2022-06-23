import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import useForm from "hooks/useForm";

import AuthService from "services/AuthService";

import 'styles/auth.less';

export default () => {
    const { t } = useTranslation();
    const fields = ['email', 'password', 'passwordConfirmation'];
    const { values, fieldErrors: errors, handleInputChange, handleSubmit, error } = useForm(AuthService.signUp, fields);

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
                        isInvalid={!!errors.email || error}
                    />
                    <Form.Label className="auth__form__label">{t('auth.placeholders.email')}</Form.Label>
                    <Form.Control.Feedback type="invalid">{!error && t(`errors.${errors.email}`)}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="auth__form-group" controlId="authPassword">
                    <Form.Control
                        name='password'
                        type="password"
                        className="auth__form__control"
                        placeholder="Password"
                        onChange={handleInputChange}
                        value={values.password}
                        isInvalid={!!errors.password || error}
                        required
                    />
                    <Form.Label className="auth__form__label">{t('auth.placeholders.password')}</Form.Label>
                    <Form.Control.Feedback type="invalid">{!error && t(`errors.${errors.password}`)}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="auth__form-group" controlId="authPasswordConfirm">
                    <Form.Control
                        name='passwordConfirmation'
                        type="password"
                        className="auth__form__control"
                        placeholder="Confirm password"
                        onChange={handleInputChange}
                        value={values.passwordConfirmation}
                        isInvalid={!!errors.passwordConfirmation || error}
                        required
                    />
                    <Form.Label className="auth__form__label">{t('auth.placeholders.passwordConfirmation')}</Form.Label>
                    <Form.Control.Feedback type="invalid">{!error && t(`errors.${errors.passwordConfirmation}`)}</Form.Control.Feedback>
                </Form.Group>
            </div>

            {
                error && <Alert variant={'danger'} className="auth__form__alert">{t(`errors.${error}`)}</Alert>
            }

            <div className='d-flex flex-column'>
                <Button size="sm" type="submit" className='auth__form__submit'>
                    {t('auth.signUp.buttonText')}
                </Button>


                <div className='d-flex flex-column'>
                    <div className='auth__form__link'>
                        <span>{t('auth.signUp.linkLabel')}&nbsp;</span>
                        <Link to='/login' >{t('auth.login.buttonText')}</Link>
                    </div>
                </div>
            </div>


        </Form>
    )
}