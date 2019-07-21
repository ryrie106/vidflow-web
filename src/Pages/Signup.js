import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { createForm } from 'rc-form';
import { Button, Icon, InputItem, NavBar, Toast } from 'antd-mobile';

import { signup, checkNameAvailability, checkEmailAvailability } from '../utils/APIUtils';
import { 
    NAME_MIN_LENGTH, NAME_MAX_LENGTH, 
    EMAIL_MAX_LENGTH,
    PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH
} from '../constants';
import './Signup.css';

class SignupForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            password: '',
            height: 0
        }
        this.signupRef = React.createRef();
        this.signupButtonRef = React.createRef();
    }

    scrollDown = (height) => {
        if(this.state.height < height) {
            let offset = height - this.state.height;
            this.signupRef.current.style.height = "calc(100vh + " + offset + "px)";
            window.scrollTo(0, offset);
        }
    }

    scrollUp = () => {
        window.scrollTo(0, 0);
        this.signupRef.current.style.height = "100vh";
    }

    // 가입 정보 작성시 키보드로 인해 입력창이 가려지는 것을 방지
    onFocus = (height) => () => {
        setTimeout(() => {
            this.setState({
            height: document.getElementById("signup-button").offsetTop
            })
            this.scrollDown(height);
        }, 400);
    }

    onBlur = () => {
        this.scrollUp();
    }

    onSubmit = (e) => {    
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const signupRequest = Object.assign({}, values);
                signup(signupRequest).then(response => {
                    if(response.success) {
                        this.props.history.push("/login");
                        window.location.reload();
                        Toast.info("회원가입 성공!, 로그인 해주세요", 1);
                    } else {
                        Toast.fail(response.message, 1);           
                    }
                }).catch(error => {
                    Toast.fail(error, 1);
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
        const { getFieldProps, getFieldError } = this.props.form;

        return (
            <div className="signup" ref={this.signupRef}>
                <NavBar
                    className="signup-navbar"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.push("/")}
                />
                <div className="signup-logo" >
                    <div className="signup-logo-name">V</div>
                </div>
                <div className="signup-title">Create an account</div>
                <div className="signup-input">
                <InputItem
                    className="signup-input-item"
                    {...getFieldProps('email', {
                        rules: [
                            {required: true},
                            {validator: this.validateEmail}
                        ]
                    })}
                    placeholder="로그인 아이디로 사용됩니다"
                    onFocus={this.onFocus(220+90)}
                    onBlur={this.onBlur}
                >
                이메일
                </InputItem>
                
                <InputItem
                    className="signup-input-item"
                    {...getFieldProps('password', {
                        rules: [
                            {required: true},
                            {validator: this.validatePassword}
                        ]
                    })}
                    type="password"
                    placeholder="6-20자"
                    onFocus={this.onFocus(220+135)}
                    onBlur={this.onBlur}
                >
                비밀번호
                </InputItem>

                <InputItem
                    className="signup-input-item"
                    {...getFieldProps('name', {
                        rules: [
                            {required: true},
                            {validator: this.validateName}
                        ]
                    })}
                    placeholder="3-10자"
                    onFocus={this.onFocus(220+180)}
                    onBlur={this.onBlur}
                >
                이름
                </InputItem>
                <div id="signup-login-instead">
                    <Link to="/login">로그인하기</Link>
                </div>
                </div>
                
                <Button id="signup-button" type="primary" onClick={this.onSubmit}>회원가입</Button>
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