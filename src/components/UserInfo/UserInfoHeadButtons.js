import React, { Component } from 'react';
import { Button } from "antd-mobile";

import { followUser, unfollowUser } from "../../utils/APIUtils";

class UserInfoHeadButtons extends Component {

    follow = () => {
        followUser(this.props.userId);
    };

    unfollow = () => {
        unfollowUser(this.props.userId);
    };

    render() {
        return (
            <div>
                {this.props.following ?
                    <Button
                        id="userinfo-unfollow"
                        onClick={this.unfollow}>
                        팔로우해제
                    </Button>
                    :
                    <Button
                        id="userinfo-follow"
                        onClick={this.follow}>
                        팔로우하기
                    </Button>
                }
            </div>
        );
    }
}

export default UserInfoHeadButtons;