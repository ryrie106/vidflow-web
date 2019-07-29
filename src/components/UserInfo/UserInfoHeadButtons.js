import React, { Component } from 'react';
import { Button } from "antd-mobile";

import { followUser, unfollowUser } from "../../utils/APIUtils";

class UserInfoHeadButtons extends Component {
    render() {
        return (
            <div>
                {this.props.following ?
                    <Button
                        id="userinfo-unfollow"
                        onClick={unfollowUser}>
                        팔로우해제
                    </Button>
                    :
                    <Button
                        id="userinfo-follow"
                        onClick={followUser}>
                        팔로우하기
                    </Button>
                }
            </div>
        );
    }
}

export default UserInfoHeadButtons;