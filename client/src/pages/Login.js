import React from 'react';

import LoginForm from 'components/login/Form';
import LanguageSwitcher from "components/shared/LanguageSwitcher";
import LoginImage from 'assets/login.svg';

import 'styles/auth.less';

export default () => {
    return (
        <div className="app wrapper">
            <div className="container h-100">
                <div className='language-switcher'>
                    <LanguageSwitcher/>
                </div>
                <div className="row h-100 align-items-center">
                    <div className="col d-flex justify-content-center h-50">
                        <div className="auth loginPage">
                            <div className='auth__img'>
                                <div className="header auth__header">
                                    L<span>!</span>stify
                                </div>
                                <LoginImage className='d-block m-auto'/>
                            </div>
                            <div className='auth__form'>
                                <LoginForm/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}