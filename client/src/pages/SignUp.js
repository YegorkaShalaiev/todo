import React from 'react';

import SignUpForm from '../components/signUp/Form';
import SignUpImage from '../assets/signup.svg';

import '../styles/auth.less';

export default () => {
    return (
        <div className="app wrapper">
            <div className="container h-100">
                <div className="row h-100 align-items-center">
                    <div className="col d-flex justify-content-center h-50">
                        <div className="auth">
                            <div className='auth__img'>
                                <div className="header auth__header">
                                    Todo App
                                </div>
                                <SignUpImage className='d-block m-auto'/>
                            </div>
                            <div className='auth__form'>


                                <SignUpForm/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}