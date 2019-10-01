import React, { Component } from 'react';

import {getUserInfo, isFollowing, followUser, unfollowUser} from '../../utils/APIUtils';
import UserInfoHeadButtons from "./UserInfoHeadButtons";
import MyUserInfoHeadButtons from "./MyUserInfoHeadButtons";
import './UserInfoHead.css';

class UserInfoHead extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            myInfo: false,
            following: false,
            name: '',
            introduction: '',
            numLikes: 0,
            numFollowing: 0,
            numFollower: 0,
        }
    }

    componentDidMount() {
        console.log(this.props.infoId, this.props.currentUser.id);
        if(this.props.infoId === this.props.currentUser.id) {
            this.setState({
                myInfo: true
            });
        } else {
            isFollowing(this.props.infoId).then(response => {
                this.setState({
                    following: response
                });
            })
        }

        if(this.props.infoId !== 0) {
            getUserInfo(this.props.infoId).then(response => {
                this.setState({
                    name: response.name,
                    introduction: response.introduction,
                    numLikes: response.numLikes,
                    numFollowing: response.numFollowing,
                    numFollower: response.numFollower
                })
            });
        }
    }

    follow = () => {
        followUser(this.props.infoId).then(this.refreshUserInfo(true));
    };

    unfollow = () => {
        unfollowUser(this.props.infoId).then(this.refreshUserInfo(false));
    };
    
    // follow/unfollow 후 정보 갱신
    refreshUserInfo = following => () => {
        let stateCopy = Object.assign({}, this.state);
        stateCopy.following = following;
        getUserInfo(this.state.id).then(response => {
            stateCopy.numLikes = response.numLikes;
            stateCopy.numFollowing = response.numFollowing;
            stateCopy.numFollower = response.numFollower;
        }).then(() => this.setState(stateCopy))
    };

    render() {
        return (
            <div id="userinfo-head">
                <div id="userinfo-head-icons">
                    <div id="userinfo-thumbnail">
                        {/*첫 번째 글자를 사용한 google식 기본 썸네일임. 유저 썸네일을 추가하면 제거할것*/}
                        <div id="userinfo-thumbnail-name">
                            {(this.state.name) ? this.state.name.charAt(0) : ''}
                        </div>
                    </div>
                    <div id="userinfo-head-buttons">
                        {this.state.myInfo ?
                            <MyUserInfoHeadButtons onLogout={this.props.onLogout}/>
                            :
                            <UserInfoHeadButtons
                                follow={this.follow}
                                unfollow={this.unfollow}
                                following={this.state.following}/>
                        }
                    </div>    
                </div>
                <div id="userinfo-head-info">
                    <div id="userinfo-name">
                        {this.state.name}
                    </div>

                    <div id="userinfo-introduce">
                        {this.state.introduction === "" ? "자기 소개를 입력해보세요" : this.state.introduction}
                    </div>
                    
                    <div id="userinfo-stat">
                        {this.state.numLikes} 좋아요 {this.state.numFollowing} 팔로잉 {this.state.numFollower} 팔로워
                    </div>
                </div>
            </div>
        );
    }
}

export default UserInfoHead;