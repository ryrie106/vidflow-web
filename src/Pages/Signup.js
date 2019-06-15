import React, { Component } from 'react';
import { signup, checkNameAvailability, checkEmailAvailability } from '../utils/APIUtils';
import './Signup.css';
import { Link } from 'react-router-dom';
import { 
    NAME_MIN_LENGTH, NAME_MAX_LENGTH, 
    EMAIL_MAX_LENGTH,
    PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH
} from '../constants';

import { List, InputItem, Button, WhiteSpace, Flex } from 'antd-mobile';
import { createForm } from 'rc-form';

const Item = List.Item;

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.validateEmail = this.validateEmail(this);
        this.validatePassword = this.validatePassword(this);
        this.validateName = this.validateName(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validateNameAvailability = this.validateNameAvailability.bind(this);
        this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
    
        signup(this.props.form.getFieldValue())
        .then(response => {
            console.log("register success");
            this.props.history.push("/login");
        }).catch(error => {
            console.log("register error");
        });
    }

    isFormInvalid() {
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
                
                <InputItem
                    {...getFieldProps('password', {
                        rules: [
                            {required: true},
                            {validator: this.validatePassword}
                        ]
                    })}
                    placeholder="비밀번호를 입력하세요(6~20자)"
                >
                비밀번호
                </InputItem>

                <InputItem
                    {...getFieldProps('name', {
                        rules: [
                            {required: true},
                            {validator: this.validateName}
                        ]
                    })}
                    placeholder="표시될 닉네입을 입력하세요(3~10자)"
                >
                비밀번호
                </InputItem>

                <Button type="primary" onClick={this.onSubmit}>회원가입</Button>
                로그인

            </div>    
            </div>
        );
    }

    // Validation Functions

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

    validatePassword(password) {
        if(password.length < PASSWORD_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`
            }
        } else if (password.length > PASSWORD_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };            
        }
    }

    validateName(name) {
        if(name.length < NAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Name is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)`
            }
        } else if (name.length > NAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Name is too long (Maximum ${NAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: null,
                errorMsg: null
            }
        }
    }

    validateNameAvailability() {
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

    validateEmailAvailability() {
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