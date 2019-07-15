import React, { Component } from 'react';
import './Comment.css';

class Comment extends Component {
    render() {
        return (
            <div className="comment">
                <div className="comment-thumbnail">
                    <div className="comment-thumbnail-name">
                        {this.props.comment.writername.charAt(0)}
                    </div>
                </div>
                <div className="comment-info">
                    <div className="comment-writername">
                        {this.props.comment.writername}
                    </div>
                    <div className="comment-content">
                        {this.props.comment.content}
                    </div>
                    <div className="comment-regdate">
                        {this.props.comment.regdate}
                    </div>
                </div>
            </div>
        );
    }
}

export default Comment;