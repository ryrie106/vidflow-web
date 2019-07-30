import React, { Component } from 'react';
import { InputItem, Toast } from 'antd-mobile';

import { FaPaperPlane } from 'react-icons/fa';
import Comment from './Comment';
import { getCommentsByPostId, createComment, deleteComment } from '../../utils/APIUtils';
import './CommentList.css';

/**
 * Component CommentList (App -> Main -> Home -> CommentList)
 * 1. 게시물의 댓글 불러오기
 * 2. 댓글 작성하기
 * 
 * Prop list
 * showModal : (key) => () => void
 * closeModal : (key) => () => void
 * currentUser :
 * currentPostId : number
 */
class CommentList extends Component{

    constructor(props) {
        super(props);
        this.state = {
            content: '',
            comments: []
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

    deleteComment = commentid => () => {
        deleteComment(commentid).then(() => this.refreshComment());
    }

    onSubmit = () => { 
        if(this.props.currentUser == null) {
            this.props.showLoginModal();
            return;
        }
        const request = {
            "content": this.state.content
        }
        createComment(this.props.currentPostId, request)
        .then(response => {
            if(response.success) {
                this.setState({
                    content: ''
                });
                this.refreshComment(); // TODO: 업데이트 된 댓글만 달도록 개선
            } else {
                Toast.fail("댓글달기 실패 " + response.status, 1);
            }
        }).catch(error => {
            Toast.fail("댓글달기 실패 " + error.status, 1);                                
        });
    };

    onChange = (e) => {
        this.setState({
            content: e
        });
    }

    render() {
        const commentList = this.state.comments.map(comment =>
            <div key={comment.id}>
                <Comment 
                    comment={comment}
                    currentUser={this.props.currentUser}
                    deleteComment={this.deleteComment}
             /></div>
        )

        return (
            <div className="commentlist">
                <div className="commentlist-header">
                    <div className="commentlist-counter">
                        댓글 {this.state.comments.length}개
                    </div>
                    <div className="commentlist-close" onClick={this.props.closeModal('commentModal')}>
                        X
                    </div>
                </div>
                <div className="commentlist-list">
                    {commentList}
                </div>
                <div className="commentlist-writer">
                    <InputItem
                        className="commentlist-writer-content"
                        onChange={this.onChange}
                        placeholder="댓글 추가"
                    />
                    <div className="commentlist-writer-button">
                        {/* <FaAt className="commentlist-writer-pic" />
                        <FaLaugh className="commentlist-writer-pic" /> */}
                        <FaPaperPlane 
                            className="commentlist-writer-pic" 
                            onClick={this.onSubmit}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default CommentList;