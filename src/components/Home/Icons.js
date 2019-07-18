import React, {Component} from 'react';
import { FaPlusCircle, FaHeart, FaShareAlt, FaCommentDots, FaEllipsisH } from 'react-icons/fa';
import './Icons.css';

class Icons extends Component {
    render() {
        return (
            <div className="icon-wrapper">
                <div className="follow-button">
                    <FaPlusCircle style={{width:"35px", height:"35px"}}/>
                </div>
                <div className="like-button">
                    {this.props.isLiked ?
                    <FaHeart style={{width:"35px", height:"35px", color:"red"}} onClick={this.props.unlikePost}/> :
                    <FaHeart style={{width:"35px", height:"35px"}} onClick={this.props.likePost}/>}
                    {this.props.numLike}
                </div>
                <div className="comment-button" onClick={this.props.showModal('commentModal')}>
                    <FaCommentDots style={{width:"35px", height:"35px"}}/>
                    {this.props.numComment}
                </div>
                {this.props.isMyPost?
                    <div className="my-share-button" onClick={this.props.showModal('shareModal')}>
                        <FaEllipsisH style={{width:"35px", height:"35px"}}/>
                    </div>
                    :
                    <div className="share-button" onClick={this.props.showModal('shareModal')}>
                        <FaShareAlt style={{width:"35px", height:"35px"}}/>
                    </div>
                }
            </div>
        );
    }
}

export default Icons;