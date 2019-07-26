import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, InputItem, NavBar, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';

import { login } from '../utils/APIUtils';
import { ACCESS_TOKEN } from '../constants';
import { EMAIL_MAX_LENGTH } from '../constants';
import './Login.css';

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            height: 0
        };
        this.loginRef = React.createRef();
    }

    // 로그인 정보 작성시 키보드로 인해 입력창이 가려지는 것을 방지
    onFocus = (height) => () => {
        setTimeout(() => {
            this.setState({
                height: document.getElementById("login-button").offsetTop
            });
            this.scrollDown(height);
        }, 400);
    };

    onBlur = () => {
        this.scrollUp();
    };

    scrollDown = (height) => {
        if(this.state.height < height) {
            let offset = height - this.state.height;
            this.loginRef.current.style.height = "calc(100vh + " + offset + "px)";
            window.scrollTo(0, offset);
        }
    };

    scrollUp = () => {
        window.scrollTo(0, 0);
        this.loginRef.current.style.height = "100vh";
    };

    onSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const loginRequest = Object.assign({}, values);
                login(loginRequest).then(response => {
                    if(response.success) {
                        localStorage.setItem(ACCESS_TOKEN, response.message);
                        this.props.onLogin();
                    } else {
                        Toast.fail(response.message, 1);
                    }
                }).catch(error => {
                    Toast.fail(error.status, 2);
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
            <div className="login" ref={this.loginRef}>
                <NavBar
                    id="login-navbar"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.push("/")}
                />
                <div id="login-logo" >
                    <div id="login-logo-name">V</div>
                </div>
                <div id="login-title">Login to Vidflow </div>
                <div id="login-input">
                <InputItem
                    className="login-input-item"
                    {...getFieldProps('email', {
                        rules: [
                            {required: true},
                            {validator: this.validateEmail}
                        ]
                    })}
                    placeholder="이메일 주소를 입력하세요"
                    onFocus={this.onFocus(220+90)}
                    onBlur={this.onBlur}
                >이메일</InputItem>
                                
                <InputItem
                    className="login-input-item"
                    {...getFieldProps('password', {
                        rules: [
                            {required: true}
                        ]
                    })}
                    placeholder="비밀번호를 입력하세요"
                    type="password"
                    onFocus={this.onFocus(220+135)}
                    onBlur={this.onBlur}
                >비밀번호</InputItem>
                <div id="login-signup-instead">
                    <Link to="/signup">회원가입하기</Link>
                </div>
                </div>
                <Button id="login-button" type="primary" onClick={this.onSubmit}>로그인</Button>
            </div>    
        );
    }
}

const Login = createForm()(LoginForm);
export default Login;