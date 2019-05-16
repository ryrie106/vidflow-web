import React, {Component} from 'react';
import './Icons.css';

class Icons extends Component {
    render() {
        return (
            <div className="icon-wrapper">
                <div className="follow-button">
                    F
                </div>
                <div className="like-button">
                    L
                </div>
                <div className="comment-button">
                    C
                </div>
                <div className="share-button">
                    S
                </div>
            </div>
        );
    }
}

export default Icons;