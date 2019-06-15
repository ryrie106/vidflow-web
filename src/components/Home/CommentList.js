import React, { Component } from 'react';
import { List, InputItem } from 'antd-mobile';
import { createForm } from 'rc-form';

import { FaAt, FaLaugh, FaPaperPlane } from 'react-icons/fa';
import Comment from './Comment';
import './CommentList.css';
import { getCommentsByPostId, createComment } from '../../utils/APIUtils';

class CommentListForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            content: ""// TODO: 이름 고치기.

        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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
        const commentRequest = {
            content: this.props.form.getFieldsValue()
        };
        createComment(this.props.currentPostId, commentRequest)
            .then(response => {
                console.log("successfully created comment");
            }).catch(error => {
                console.log("createComment failed");
            })
    };

    render() {
        const commentList = this.state.comments.map(comment =>
            <div key={comment.id}><Comment comment={comment} /></div>
        )

        const { getFieldProps, getFieldError } = this.props.form;

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
                <div className="comment-list">
                    {commentList}
                </div>
                <div className="comment-writer">
                    <InputItem
                        {...getFieldProps('content', {})}
                        placeholder="댓글 추가"
                        // value={this.state.content}
                        // onChange={this.onChange}
                        extra={
                        <div>
                            <FaAt style={{width:"30px", height:"30px", marginLeft:"5px"}}/>
                            <FaLaugh style={{width:"30px", height:"30px", marginLeft:"5px"}}/>
                            <FaPaperPlane 
                                style={{width:"30px", height:"30px", marginLeft:"5px"}}
                                onClick={this.onSubmit}
                            />
                        </div>
                        } 
                    />
                </div>
            </div>
        );
    }
}

const CommentList = createForm()(CommentListForm);

export default CommentList;