import React, {Component} from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

class VideoPlayer extends Component {

    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
    }

    componentDidMount() {
        this.player = videojs(this.videoRef.current, this.props, function onPlayerReady() {
        });
    }

    handleClick = () => {
        if(this.videoRef.current.paused) {
            this.videoRef.current.play();
        } else {
            this.videoRef.current.pause();
        }
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