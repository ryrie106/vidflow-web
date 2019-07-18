import React, { Component } from 'react';
import Icons from './Icons';
import Description from './Description';
import VideoPlayer from './VideoPlayer';

import { likePost, unlikePost } from '../../utils/APIUtils';
import { VIDEO_SRC } from '../../constants';
import './Post.css';

class Post extends Component {

    likePost = () => {
        likePost(this.props.post.id);
    }

    unlikePost = () => {
        unlikePost(this.props.post.id);
    }

    render() {
        const videoJsOptions = {
            loop: true,
            preload: "auto",
            sources: [{
                src: VIDEO_SRC + this.props.post.videosrc,
                type: 'video/mp4'
            }]
        };

        return (
            <div className="post">
                <VideoPlayer {...videoJsOptions}/>
                <Description 
                    writer={this.props.post.writername}
                    content={this.props.post.content}
                />
                <Icons 
                    showModal={this.props.showModal}
                    numComment={this.props.post.num_comment}
                    numLike={this.props.post.num_like}
                    isLiked={this.props.post.isliked}
                    likePost={this.likePost}
                    unlikePost={this.unlikePost}
                    /* 
                    로그인이 되어 있지 않으면 currentUser가 null이기 때문에 예외가 발생한다.
                    따라서 currentUser가 먼저 있는지 검사부터 해야 함.
                    */
                    isMyPost={this.props.currentUser && 
                    this.props.post.writerid === this.props.currentUser.id}/>
            </div>
        )
    }
}
export default Post;