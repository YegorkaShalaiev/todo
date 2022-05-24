import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import useForm from "../../hooks/useForm";

import { signUp } from "../../api/auth/signUp";

import '../../styles/auth.less';

export default () => {
    const { t } = useTranslation();
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
                        isInvalid={!!errors.email}
                    />
                    <Form.Label className="auth__form__label">{t('auth.placeholders.email')}</Form.Label>
                    <Form.Control.Feedback type="invalid">{t(`errors.${errors.email}`)}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="auth__form-group" controlId="authPassword">
                    <Form.Control
                        name='password'
                        type="password"
                        className="auth__form__control"
                        placeholder="Password"
                        onChange={handleInputChange}
                        value={values.password}
                        isInvalid={!!errors.password}
                        required
                    />
                    <Form.Label className="auth__form__label">{t('auth.placeholders.password')}</Form.Label>
                    <Form.Control.Feedback type="invalid">{t(`errors.${errors.password}`)}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="auth__form-group" controlId="authPasswordConfirm">
                    <Form.Control
                        name='passwordConfirmation'
                        type="password"
                        className="auth__form__control"
                        placeholder="Confirm password"
                        onChange={handleInputChange}
                        value={values.passwordConfirmation}
                        isInvalid={!!errors.passwordConfirmation}
                        required
                    />
                    <Form.Label className="auth__form__label">{t('auth.placeholders.passwordConfirmation')}</Form.Label>
                    <Form.Control.Feedback type="invalid">{t(`errors.${errors.passwordConfirmation}`)}</Form.Control.Feedback>
                </Form.Group>
            </div>

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