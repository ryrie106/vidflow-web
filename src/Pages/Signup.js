import React, { Component } from 'react';
import { signup, checkNameAvailability, checkEmailAvailability } from '../utils/APIUtils';
import './Signup.css';
import { Link } from 'react-router-dom';
import { 
    NAME_MIN_LENGTH, NAME_MAX_LENGTH, 
    EMAIL_MAX_LENGTH,
    PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH
} from '../constants';

import { Button, Icon, InputItem, List, NavBar, Toast, WhiteSpace, WingBlank } from 'antd-mobile';
import { createForm } from 'rc-form';

class SignupForm extends Component {

    onSubmit = (e) => {    
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const signupRequest = Object.assign({}, values);
                signup(signupRequest)
                .then(response => {
                    this.props.history.push("/login");
                    Toast.success("회원가입 성공!, 로그인 해주세요", 2);
                }).catch(error => {
                    if(error.status === 401) {
                        Toast.error("회원가입에 실패하였습니다. 401", 1);                 
                    } else {
                        Toast.error("회원가입에 실패하였습니다.", 1);
                    }
                });
            }
        });
    }

    isFormInvalid = () => {
        return !(this.state.name.validateStatus === 'success' &&
            this.state.email.validateStatus === 'success' &&
            this.state.password.validateStatus === 'success'
        );
    }

    render() {
        const { getFieldProps } = this.props.form;
        return (
            <div className="signup-page">
            <div className="signup-container">
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
                    placeholder="이메일 주소가 로그인 아이디 입니다"
                >
                이메일
                </InputItem>
                
                <WhiteSpace size="lg" />

                <InputItem
                    {...getFieldProps('password', {
                        rules: [
                            {required: true},
                            {validator: this.validatePassword}
                        ]
                    })}
                    type="password"
                    placeholder="비밀번호를 입력하세요(6~20자)"
                >
                비밀번호
                </InputItem>

                <WhiteSpace size="lg" />

                <InputItem
                    {...getFieldProps('name', {
                        rules: [
                            {required: true},
                            {validator: this.validateName}
                        ]
                    })}
                    placeholder="표시될 이름을 입력하세요(3~10자)"
                >
                이름
                </InputItem>

                <WhiteSpace size="lg" />

                <Button type="primary" onClick={this.onSubmit}>회원가입</Button>
                <Link to="/login">로그인</Link>
                </WingBlank>
            </div>    
            </div>
        );
    }

    // Validation Functions

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

    validatePassword = (rule, password, callback) => {
        if(password.length < PASSWORD_MIN_LENGTH) {
            callback(new Error());
        } else if (password.length > PASSWORD_MAX_LENGTH) {
            callback(new Error());
        } else 
            callback();
    }

    validateName = (rule, name, callback) => {
        if(name.length < NAME_MIN_LENGTH) {
            callback(new Error());
        } else if (name.length > NAME_MAX_LENGTH) {
            callback(new Error());
        } else {
            callback();
        }
    }

    validateNameAvailability = () => {
        // First check for client side errors in name
        const nameValue = this.state.name.value;
        const nameValidation = this.validateName(nameValue);

        if(nameValidation.validateStatus === 'error') {
            this.setState({
                name: {
                    value: nameValue,
                    ...nameValidation
                }
            });
            return;
        }

        this.setState({
            name: {
                value: nameValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        });

        checkNameAvailability(nameValue)
        .then(response => {
            if(response.available) {
                this.setState({
                    name: {
                        value: nameValue,
                        validateStatus: 'success',
                        errorMsg: null
                    }
                });
            } else {
                this.setState({
                    name: {
                        value: nameValue,
                        validateStatus: 'error',
                        errorMsg: 'This name is already taken'
                    }
                });
            }
        }).catch(error => {
            // Marking validateStatus as success, Form will be recchecked at server
            this.setState({
                name: {
                    value: nameValue,
                    validateStatus: 'success',
                    errorMsg: null
                }
            });
        });
    }

    validateEmailAvailability = () => {
        // First check for client side errors in email
        const emailValue = this.state.email.value;
        const emailValidation = this.validateEmail(emailValue);

        if(emailValidation.validateStatus === 'error') {
            this.setState({
                email: {
                    value: emailValue,
                    ...emailValidation
                }
            });    
            return;
        }

        this.setState({
            email: {
                value: emailValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        });

        checkEmailAvailability(emailValue)
        .then(response => {
            if(response.available) {
                this.setState({
                    email: {
                        value: emailValue,
                        validateStatus: 'success',
                        errorMsg: null
                    }
                });
            } else {
                this.setState({
                    email: {
                        value: emailValue,
                        validateStatus: 'error',
                        errorMsg: 'This Email is already registered'
                    }
                });
            }
        }).catch(error => {
            // Marking validateStatus as success, Form will be recchecked at server
            this.setState({
                email: {
                    value: emailValue,
                    validateStatus: 'success',
                    errorMsg: null
                }
            });
        });
    }

    

}

const Signup = createForm()(SignupForm);
export default Signup;