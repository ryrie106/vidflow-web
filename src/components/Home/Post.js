import React, { Component } from 'react';
import Icons from './Icons';
import Description from './Description';
import VideoPlayer from './VideoPlayer';

class Post extends Component {

    render() {
        return (
            <div>
                <VideoPlayer key={this.props.key} videosrc={this.props.post.videosrc}/>
                <Description />
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