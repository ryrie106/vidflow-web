import React, { Component } from 'react';
//import {  } from 'antd-mobile';
import { createForm } from 'rc-form';
import { createPost } from '../utils/APIUtils';
import './Write.css';


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
                console.log("write failed"); 
            });

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
            <div className="write-wrapper">
                <div className="new-post-title">
                    게시
                </div>
                <div className="new-post-content">
                </div>
            </div>
        );
    }
}

const Write = createForm(WriteForm);

export default Write;