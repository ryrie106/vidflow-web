import React, { Component } from 'react';
import { Button } from "antd-mobile";

class UserInfoHeadButtons extends Component {
    render() {
        return (
            <div>
                {this.props.following ?
                    <Button
                        id="userinfo-unfollow"
                        onClick={this.props.unfollow}>
                        팔로우해제
                    </Button>
                    :
                    <Button
                        id="userinfo-follow"
                        onClick={this.props.follow}>
                        팔로우하기
                    </Button>
                }
            </div>
        );
    }
}

export default UserInfoHeadButtons;