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
                    writer={this.props.post.writer.nickname}
                    content={this.props.post.content}
                />
                <Icons />
            </div>
        )
    }
}

/*
postno : {this.props.post.postno}<br/>
writer : {this.props.post.writer}<br/>
content : {this.props.post.content}<br/>
numcomment : {this.props.post.numcomment}<br/>
regdate : {this.props.post.regdate}<br/>
updatedate : {this.props.post.updatedate}<br/>
<video className="video-js" width="600" height="400" controls>
    <source src={this.props.post.videosrc} type="application/x-mpegURL" />
</video>
 */

export default Post;