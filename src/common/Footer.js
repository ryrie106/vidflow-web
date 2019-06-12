import React, { Component } from 'react';
import { FaHome, FaGlobe, FaFolderPlus, FaComment, FaUser  } from 'react-icons/fa';
import { Link } from 'react-router-dom';
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
                <Link className="footer-button" to="/">
                    <FaHome style={{width:"35px", height:"35px"}} />
                </Link>
                <div className="footer-button">
                    <FaGlobe style={{width:"35px", height:"35px"}}/>
                </div>
                <Link className="footer-button" to="/write">
                    <FaFolderPlus style={{width:"35px", height:"35px"}} />
                </Link>
                <div className="footer-button">
                    <FaComment style={{width:"35px", height:"35px"}} />
                </div>
                {this.props.isAuthenticated ? 
                    <Link className="footer-button" to="/mypage">
                        <FaUser style={{width:"35px", height:"35px"}} />
                    </Link>
                    :
                    <Link className="footer-button" to="/login">
                        <FaUser style={{width:"35px", height:"35px"}} />
                    </Link>
                }
            </div>
        )
    }
}

export default Footer;