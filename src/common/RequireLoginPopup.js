import React, { Component } from 'react';
import './RequireLoginPopup.css';

class RequireLoginPopup extends Component {
    render() {
        return (
            <div className="require-login-popup">
                로그인이 필요합니다!
            </div>
        );
    }
}

export default RequireLoginPopup;