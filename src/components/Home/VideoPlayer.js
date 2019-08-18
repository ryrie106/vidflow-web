import React, {Component} from 'react';
import videojs from 'video.js';

import { UPLOAD_SRC } from '../../constants';
import 'video.js/dist/video-js.css';

/**
 * Component VideoPlayer (App -> Main -> Home -> Post -> VideoPlayer)
 * 1. 게시물의 영상을 재생
 * 
 * Prop list
 * videoSrc: string
 */
class VideoPlayer extends Component {

    componentDidMount() {
        const options = {
            loop: true,
            preload: "auto",
            sources: [{
                src: UPLOAD_SRC + this.props.videoSrc,
                type: 'video/mp4'
            }]
        };

        this.player = videojs(this.props.videoRef.current, options, function onPlayerReady() {
        });
    }

    handleClick = () => {

        if(this.props.videoRef.current.paused) {
            this.props.videoRef.current.play();
        } else {
            this.props.videoRef.current.pause();
        }
        // this.player.start
    };

    render() {
        return (
            <div data-vjs-player="true" 
                style={{width : "100%", height : "100%"}} 
                onClick={this.handleClick} 
                onTouchStart={this.handleClick}>
                <video ref={this.props.videoRef} className="video-js" />
            </div>
        );
    }
}

export default VideoPlayer;