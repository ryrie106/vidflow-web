import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { InputItem,  Button  } from 'antd-mobile';
import { createForm } from 'rc-form';

import { login } from '../utils/APIUtils';
import { ACCESS_TOKEN } from '../constants';
import './Login.css';
import {
    EMAIL_MAX_LENGTH,
    PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH
} from '../constants';


class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.validateEmail = this.validateEmail(this);
    }

    onSubmit(e) {
        e.preventDefault();   
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // const loginRequest = Object.assign({}, values);
                login(this.props.form.getFieldValue())
                .then(response => {
                    localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                    this.props.onLogin();
                }).catch(error => {
                    if(error.status === 401) {
                        console.log("error 401. username or password error");                  
                    } else {
                        console.log("login error");                                        
                    }
                });
            }
        });
        // console.log(this.props.form.getFieldsValue());
    }

    validateEmail(email) {
        if(!email) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email may not be empty'                
            }
        }

        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if(!EMAIL_REGEX.test(email)) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email not valid'
            }
        }

        if(email.length > EMAIL_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`
            }
        }

        return {
            validateStatus: null,
            errorMsg: null
        }
    }

    render() {
        const { getFieldProps } = this.props.form;
        return (
            <div className="login-page">
            <div className="login-container">
                <InputItem
                    {...getFieldProps('email', {
                        rules: [
                            {required: true},
                            {validator: this.validateEmail}
                        ]
                    })}
                    placeholder="이메일 주소를 입력하세요"
                >
                이메일
                </InputItem>
                <InputItem
                    {...getFieldProps('password', {
                        rules: [
                            {required: true}
                        ]
                    })}
                    placeholder="비밀번호를 입력하세요"
                >
                비밀번호
                </InputItem>
                
                <Button type="primary" onClick={this.onSubmit}>로그인</Button>
                <Link to="/signin">회원가입</Link>
                <Link to="/">돌아가기</Link>

            </div>    
            </div>
        );
    }
}

const Login = createForm()(LoginForm);
export default Login;