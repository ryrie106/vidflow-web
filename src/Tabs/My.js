import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './My.css';

class My extends Component {
    render() {
        return (
            <div className="my-wrapper">
                마이페이지임<br/>
                <div onClick={this.props.onLogout}>로그아웃</div>
            </div>
        );
    }
}

export default My;