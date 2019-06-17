import React, {Component} from 'react';
import './Icons.css';
import { FaPlusCircle, FaHeart, FaShareAlt, FaCommentDots } from 'react-icons/fa';

class Icons extends Component {
    render() {
        /**
         * this.props.toggleCommentPanel은 Home -> PostList -> Post -> Icons 컴포넌트로 내려옴
         */
        return (
            <div className="icon-wrapper">
                <div className="follow-button">
                    <FaPlusCircle style={{width:"35px", height:"35px"}}/>
                </div>
                <div className="like-button">
                    <FaHeart style={{width:"35px", height:"35px"}}/>
                </div>
                <div className="comment-button" onClick={this.props.toggleCommentModal}>
                    <FaCommentDots style={{width:"35px", height:"35px"}}/>
                </div>
                <div className="share-button">
                    <FaShareAlt style={{width:"35px", height:"35px"}}/>
                </div>
            </div>
        );
    }
}

export default Icons;