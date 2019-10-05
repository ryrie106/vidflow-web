import React, { Component } from 'react';
import { Button } from "antd-mobile";

import './UserInfoHeadButtons.css';

class UserInfoHeadButtons extends Component {
    render() {
        return (
            <div id="userinfo-head-buttons">
                {this.props.following ?
                    <Button
                        id="userinfo-unfollow"
                        onClick={this.props.unfollow}>
                        팔로잉
                    </Button>
                    :
                    <Button
                        id="userinfo-follow"
                        onClick={this.props.follow}>
                        팔로우
                    </Button>
                }
            </div>
        );
    }
}

export default UserInfoHeadButtons;