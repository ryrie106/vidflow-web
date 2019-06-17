import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class My extends Component {
    render() {
        return (
            <div>
                마이페이지임<br/>
                <div onClick={this.props.onLogout}>로그아웃</div>
            </div>
        );
    }
}

export default My;