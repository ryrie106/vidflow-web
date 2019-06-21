import React, { Component } from 'react';
import './Comment.css';

class Comment extends Component {
    render() {
        return (
            <div className="comment">
                <div className="comment-thumbnail">
                    <img src="http://ec2-13-125-253-101.ap-northeast-2.compute.amazonaws.com/images/default.png" alt="default" style={{width:"50px", height:"50px"}}></img>
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