import React, { Component } from 'react';
import { FaDotCircle } from 'react-icons/fa';
import './Footer.css';

class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {posts: []};
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="footer-wrapper">
                <div className="footer-button">
                    <FaDotCircle />
                </div>
                <div className="footer-button">
                    <FaDotCircle />
                </div>
                <div className="footer-button">
                    <FaDotCircle />
                </div>
                <div className="footer-button">
                    <FaDotCircle />
                </div>
                <div className="footer-button">
                    <FaDotCircle />
                </div>
            </div>
        )
    }
}

export default Footer;