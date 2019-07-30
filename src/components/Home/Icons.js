import React, {Component} from 'react';
import { FaPlusCircle, FaHeart, FaShareAlt, FaCommentDots, FaEllipsisH } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

import { likePost, unlikePost } from '../../utils/APIUtils';
import './Icons.css';

/**
 * Component Icons (App -> Main -> Main -> Home -> Post -> Icons)
 * 1. Post의 오른쪽 아이콘들 표시.
 * 2. 아이콘들을 누르면 각 아이콘에 대한 요청 발생
 * 3. 각 Modal은 Home에서 생성하고 관리. Icons Component가 여러개 생성되기 때문.
 * 
 * Prop list
 * currentUser : 
 * postId: number
 * postWriterId: number
 * showModal : (key) => () => void
 * numComment : number
 * numLike : number
 * isLiked : boolean
 * myPost : boolean
 */
class Icons extends Component {

    likePost = () => {
        likePost(this.props.postId);
        // Home에 있는 refreshPost() 를 호출하여 Post의 state를 갱신한다.
        this.props.refreshPost();

    };

    unlikePost = () => {
        unlikePost(this.props.postId);
        // Home에 있는 refreshPost() 를 호출하여 Post의 state를 갱신한다.
        this.props.refreshPost();
    };

    render() {
        return (
            <div className="icons">
                <div className="follow-button">
                    <NavLink className="icons-pic" to={`/user/${this.props.postWriterId}`}>
                        <FaPlusCircle className="icons-pic" />
                    </NavLink>
                </div>
                <div className="like-button">
                    {this.props.isLiked ?
                    <FaHeart className="icons-pic" style={{color:"red"}} onClick={this.unlikePost}/> :
                    <FaHeart className="icons-pic" onClick={this.likePost}/>}
                    {this.props.numLike}
                </div>
                <div className="comment-button" onClick={this.props.showModal('commentModal')}>
                    <FaCommentDots className="icons-pic" />
                    {this.props.numComment}
                </div>
                {this.props.myPost?
                    <div className="my-share-button" onClick={this.props.showModal('shareModal')}>
                        <FaEllipsisH className="icons-pic" />
                    </div>
                    :
                    <div className="share-button" onClick={this.props.showModal('shareModal')}>
                        <FaShareAlt className="icons-pic" />
                    </div>
                }
            </div>
        );
    }
}

export default Icons;