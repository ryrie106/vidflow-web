import React, {Component} from 'react';
import videojs from 'video.js';

import { VIDEO_SRC } from '../../constants';
import 'video.js/dist/video-js.css';

/**
 * Component VideoPlayer (App -> Main -> Home -> Post -> VideoPlayer)
 * 1. 게시물의 영상을 재생
 * 
 * Prop list
 * videoSrc: string
 */
class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
    }

    componentDidMount() {
        const options = {
            loop: true,
            preload: "auto",
            sources: [{
                // src: "https://d2zihajmogu5jn.cloudfront.net/advanced-fmp4/master.m3u8",
                src: VIDEO_SRC + this.props.videoSrc,
                type: 'video/mp4'
            }]
        };

        this.player = videojs(this.videoRef.current, options, function onPlayerReady() {
        });
    }

    // componentWillMount() {
    //     if(this.vide)
    // }

    handleClick = () => {

        if(this.videoRef.current.paused) {
            this.videoRef.current.play();
        } else {
            this.videoRef.current.pause();
        }
        // this.player.start
    };

    render() {
        return (
            <div data-vjs-player="true" 
                style={{width : "100%", height : "100%"}} 
                onClick={this.handleClick} 
                onTouchStart={this.handleClick}>
                <video ref={this.videoRef} className="video-js"></video>
            </div>
        );
    }
}

export default VideoPlayer;