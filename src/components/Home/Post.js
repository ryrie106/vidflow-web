import React, { Component } from 'react';

import Icons from './Icons';
import Description from './Description';
import VideoPlayer from './VideoPlayer';
import './Post.css';

/**
 * Component Post (App -> Main -> Home -> Post)
 * 1. 각 게시물의 정보 표시
 * 
 * Prop list
 * post
 * showModal
 * currentUser
 */
class Post extends Component {
    
    render() {
        return (
            <div className="post">
                <VideoPlayer videoSrc={this.props.post.videosrc}/>
                <Description 
                    writer={this.props.post.writername}
                    content={this.props.post.content}
                />
                <Icons
                    currentUser={this.props.currentUser}
                    postId={this.post.id}
                    showModal={this.props.showModal}
                    numComment={this.props.post.num_comment}
                    numLike={this.props.post.num_like}

                    isLiked={this.props.post.isliked}
                    myPost={this.props.currentUser && 
                        this.props.post.writerid === this.props.currentUser.id}/>
            </div>
        )
    }
}
export default Post;