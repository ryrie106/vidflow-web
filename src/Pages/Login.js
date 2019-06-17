import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, InputItem, NavBar, Toast, WingBlank, WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';

import { login } from '../utils/APIUtils';
import { ACCESS_TOKEN } from '../constants';
import './Login.css';
import { EMAIL_MAX_LENGTH } from '../constants';


class LoginForm extends Component {

    onSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const loginRequest = Object.assign({}, values);
                login(loginRequest)
                .then(response => {
                    localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                    this.props.onLogin();
                }).catch(error => {
                    if(error.status === 401) {
                        Toast.fail("이메일이나 비밀번호가 틀립니다.", 1);                  
                    } else {
                        Toast.fail("로그인 에러!", 1);                                
                    }
                });
            }
        });
    }

    validateEmail = (rule, email, callback) => {
        if(!email) {
            callback(new Error());
        }

        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if(!EMAIL_REGEX.test(email)) {
            callback(new Error());
        }

        if(email.length > EMAIL_MAX_LENGTH) {
            callback(new Error());
        }

        callback();
    }

    render() {
        const { getFieldProps, getFieldError } = this.props.form;
        return (
            <div className="login-page">
            <div className="login-container">
                <WingBlank size="lg">
                <NavBar
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.push("/")}
                />
                <InputItem
                    {...getFieldProps('email', {
                        rules: [
                            {required: true},
                            {validator: this.validateEmail}
                        ]
                    })}
                    placeholder="이메일 주소를 입력하세요"
                >이메일</InputItem>
                
                <WhiteSpace size="lg" />
                
                <InputItem
                    {...getFieldProps('password', {
                        rules: [
                            {required: true}
                        ]
                    })}
                    placeholder="비밀번호를 입력하세요"
                    type="password"
                >비밀번호</InputItem>
                
                <WhiteSpace size="lg" />

                <Button type="primary" onClick={this.onSubmit}>로그인</Button>

                <WhiteSpace size="lg" />

                <Link to="/signup">회원가입</Link>
                </WingBlank>
            </div>    
            </div>
        );
    }
}

const Login = createForm()(LoginForm);
export default Login;