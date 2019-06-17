import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, InputItem, NavBar, TextareaItem, WingBlank, WhiteSpace, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { createPost } from '../utils/APIUtils';
import './Write.css';


class WriteForm extends Component {

    onSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err) {
                const postRequest = Object.assign({}, values);
                createPost(postRequest)
                .then(response => {
                    this.props.history.push("/");
                    Toast.success("작성 성공!", 2)
                }).catch(error => {
                    Toast.error("작성 실패!", 1);
                })
            }
        })
    }

    render() {
        const { getFieldProps } = this.props.form;

        return (
            <div className="write-wrapper">
                <WingBlank size="lg">
                <NavBar
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.push("/")}

                >게시</NavBar>
                <div className="new-post-content">
                <TextareaItem
                    {...getFieldProps('content', {
                        rules: [
                            {required: true},
                        ]
                    })}
                    placeholder="동영상을 설명하세요"
                    rows={4}
                />
                <WhiteSpace size="lg" />
                <InputItem
                    {...getFieldProps('videosrc', {
                        rules: [
                            {required: true},
                            {validator: this.validatePassword}
                        ]
                    })}
                    placeholder="영상경로(임시)"
                />
                <WhiteSpace size="lg" />
                <div className="write-buttons" style={{display: "flex", }}>
                    <Button style={{flexGrow:"1"}}>임시 저장</Button>
                    <Button style={{flexGrow:"1"}}type="warning" onClick={this.onSubmit}>게시</Button>
                </div>                
                
                </div>
                </WingBlank>
            </div>
        );
    }
}

const Write = createForm()(WriteForm);

export default Write;