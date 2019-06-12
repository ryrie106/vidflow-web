import React, { Component } from 'react';
import { Form, Icon, Input, Button, Switch, notification } from 'antd';

import { createPost } from '../utils/APIUtils';
const { TextArea } = Input;

// class Write extends Component {
//     render() {
//        const AntWrappedWriteForm = Form.create()(WriteForm)
//         return (
//             <div className="new-post-container">
//                 <AntWrappedWriteForm />
//             </div>
//         )
//     }
// }

class WriteForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: "",
            videosrc: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const postPayload = {
            content: this.state.content,
            videosrc: this.state.videosrc
        };

        createPost(postPayload)
            .then(response => {
                this.props.history.push("/");
            }).catch(error => {
                notification.error({
                    message: 'Polling App',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });   
            })

    }

    handleContentChange(e) {
        const value = e.target.value;
        this.setState({
            content: value
        });
    }

    handleVideosrcChange(e) {
        const value = e.target.value;
        this.setState({
            videosrc: value
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div >
                <div className="new-post-title">
                    게시
                </div>
                <div className="new-post-content">
                <Form onSubmit={this.handleSubmit}>
                    <TextArea
                        placeholder="동영상을 설명하세요."
                        name = "content"
                        rows={4}
                        onChange = {this.handleContentChange}
                    />
                    <Form.Item>
                        <Input 
                            size="large"
                            name="videosrc" 
                            placeholder="동영상 경로(임시)"
                            onChange={(e) => this.handleVideosrcChange(e)} />
                    </Form.Item>
                    <Form.Item label="Switch">
                        {getFieldDecorator('switch', {valuePropName: 'checked'})(<Switch />)}
                    </Form.Item>
                    <Form.Item>
                    <Button htmlType="submit" className="new-post-temp-button">임시 저장</Button>
                    <Button type="danger" htmlType="submit" className="new-post-smbmit-button">게시</Button>
                </Form.Item>
                </Form>
                </div>
            </div>
        );
    }
}

const Write = Form.create()(WriteForm)

export default Write;