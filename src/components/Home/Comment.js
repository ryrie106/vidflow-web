import React, { Component } from 'react';
import './Comment.css';

class Comment extends Component {
    render() {
        return (
            <div className="comment">
                <div className="comment-writer">
                    {this.props.comment.writername}
                </div>
                <div className="comment-content">
                    {this.props.comment.content}
                </div>
                <div className="comment-regdate">
                    {this.props.comment.regdate}
                </div>
            </div>
        );
    }
}

export default Comment;