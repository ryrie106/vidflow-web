import React, {Component} from 'react';
import './Icons.css';
import { FaPlusCircle, FaHeart, FaShareAlt, FaCommentDots } from 'react-icons/fa';

class Icons extends Component {
    render() {
        return (
            <div className="icon-wrapper">
                <div className="follow-button">
                    <FaPlusCircle style={{width:"35px", height:"35px"}}/>
                </div>
                <div className="like-button">
                    <FaHeart style={{width:"35px", height:"35px"}}/>
                </div>
                <div className="comment-button">
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