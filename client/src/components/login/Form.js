import React from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useForm from "../../hooks/useForm";
import { login } from "../../api/auth/login";

export default () => {
    const { t } = useTranslation();
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
                    />
                    <Form.Label className="auth__form__label">{t('auth.placeholders.password')}</Form.Label>
                    <Form.Control.Feedback type="invalid">{t(`errors.${errors.password}`)}</Form.Control.Feedback>
                </Form.Group>
            </div>

            <div className='d-flex flex-column'>
                <Button size="sm" type="submit" className='auth__form__submit'>
                    {t('auth.login.buttonText')}
                </Button>

                <div className='auth__form__link'>
                    <span>{t('auth.login.linkLabel')}&nbsp;</span>
                    <Link to='/sign-up' >{t('auth.signUp.buttonText')}</Link>
                </div>
            </div>
        </Form>
    )
}