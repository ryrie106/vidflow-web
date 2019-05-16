import React, {Component} from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

class VideoPlayer extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        const videoJsOptions = {
            loop: true,
            preload: "auto",
            sources: [{
                src: this.props.viedosrc,
                type: 'video/mp4'
            }]
        };
        
        this.handleClick = this.handleClick.bind(this);
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
            <div>
                <h2>videos</h2>
                <div>
                    <video className="video-js" 
                        width="100%" height="100%" 
                        onClick={this.handleClick} 
                        onTouchStart={this.handleClick}
                        >
                        <source src="http://localhost/source.mp4" type="video/mp4" />
                    </video>
                </div>
            </div>
        );
    }
}

export default VideoPlayer;