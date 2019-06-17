import React, { Component } from 'react';
import Icons from './Icons';
import Description from './Description';
import VideoPlayer from './VideoPlayer';
import './Post.css';

class Post extends Component {

    render() {
        const videoJsOptions = {
            loop: true,
            preload: "auto",
            sources: [{
                src: this.props.post.videosrc,
                type: 'video/mp4'
            }]
        };

        return (
            <div className="post-wrapper">
                <VideoPlayer {...videoJsOptions}/>
                <Description 
                    writer={this.props.post.writername}
                    content={this.props.post.content}
                />
                <Icons toggleCommentModal={this.props.toggleCommentModal}/>
            </div>
        )
    }
}
export default Post;