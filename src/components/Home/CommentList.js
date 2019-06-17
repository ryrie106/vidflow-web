import React, { Component } from 'react';
import { List, InputItem, Toast } from 'antd-mobile';
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
        }
    }

    componentDidMount() {
        this.refreshComment();
    };

    refreshComment = () => {
        getCommentsByPostId(this.props.currentPostId).then(response => {
            this.setState({
                comments: response
            });
        });
    }

    onSubmit = () => { 
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const commentRequest = Object.assign({}, values);
                createComment(this.props.currentPostId, commentRequest)
                .then(response => {
                    this.refreshComment(); // TODO: 업데이트 된 댓글만 달도록 개선
                }).catch(error => {
                    if(error.status === 401) {
                        Toast.fail("댓글달기 실패. 401", 1);                  
                    } else {
                        Toast.fail("댓글달기 실패!", 1);                                
                    }
                });
            }
        })
    };

    render() {
        const commentList = this.state.comments.map(comment =>
            <div key={comment.id}><Comment comment={comment} /></div>
        )

        const { getFieldProps } = this.props.form;

        return (
            <div className="comment-container">
                <div className="comment-header">
                    <div className="comment-counter">
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
                        className="comment-writer-input"
                        {...getFieldProps('content', {})}
                        placeholder="댓글 추가"
                    />
                    <div className="comment-writer-button">
                        <FaAt style={{width:"30px", height:"30px", margin:"auto"}}/>
                        <FaLaugh style={{width:"30px", height:"30px", margin:"auto"}}/>
                        <FaPaperPlane 
                            style={{width:"30px", height:"30px", margin:"auto"}}
                            onClick={this.onSubmit}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const CommentList = createForm()(CommentListForm);

export default CommentList;