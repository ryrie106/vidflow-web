import React, { Component } from 'react';
import './CommentList.css';
import { Avatar, Form, Button, List, Input } from 'antd';

import { Comment } from './Comment';
import { getCommentsByPostId } from '../../utils/APIUtils';
class CommentList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            content: ""// TODO: 이름 고치기.

        }
        this.onChange = this.onChange.bind();
        this.onSubmit = this.onSubmit.bind();
    }

    componentDidMount() {
        getCommentsByPostId(this.props.currentPostId).then(response => {
            this.setState({
                comments: response
            });
        });
    };

    onChange(e) {
        this.setState({
            content: e.target.value
        });
    };

    onSubmit() {

    };

    render() {
        const commentList = this.state.comments.map(comment =>
            <div key={comment.id}><Comment comment={comment} /></div>
            )


        return (
            <div className="comment-container">
                <div className="comment-header">
                    <div className="comment-couter">
                        댓글 {this.state.comments.length}개
                    </div>
                    <div className="close-comment-container-button" onClick={this.props.toggleCommentPanel}>
                        X
                    </div>
                </div>
                <div clasaName="comment-list">
                    {commentList}
                </div>
                <div className="comment-writer">
                    <Form.Item>
                        <Input.TextArea onChange={this.onChange}/>
                    </Form.Item>
                    <Form.Item>
                    <Button htmlType="submit" onClick={this.onSubmit} type="primary">
                        Add Comment
                    </Button>
                    </Form.Item>
                </div>

            </div>
        );
    }
}

export default CommentList;