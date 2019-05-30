import React, {Component} from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

class VideoPlayer extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
        });
    }

    handleClick() {
        try {
            if(this.player.paused()) {
                this.player.play();
            }
            else {
                this.player.pause();
            }
        } catch(e) {}

    };

    render() {
        return (
            <div data-vjs-player="true" 
                style={{width : "100%", height : "100%"}} 
                onClick={this.handleClick} 
                onTouchStart={this.handleClick}>
                <video ref={ node => this.videoNode = node} className="video-js"></video>
            </div>
        );
    }
}

export default VideoPlayer;