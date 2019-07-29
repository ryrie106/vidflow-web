import React, { Component } from 'react';
import { Icon, NavBar, Tabs } from 'antd-mobile';

import UserInfoHeadButtons from "../components/UserInfo/UserInfoHeadButtons";
import MyUserInfoHeadButtons from "../components/UserInfo/MyUserInfoHeadButtons";
import { getUserInfo, getUserPosts, getUserLikes, isFollowing } from '../utils/APIUtils';
import UserPosts from '../components/UserInfo/UserPosts';
import './UserInfo.css';

/**
 * Component UserInfo ( App -> Main -> UserInfo )
 * 1.
 *
 * props
 * 1. currentUser: {id: number, email: string, name: string}
 * 2. onLogout: () => void
 */
class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            introduction: '',
            numLikes: 0,
            numFollowing: 0,
            numFollower: 0,
            userPosts: [],
            userLikes: [],
            myInfo: false,
            following: false
        }
    }

    componentDidMount() {
        let id;
        // url에 parameter를 가지고 routing되면 this.props.match를 가진다.
        // 자기 자신의 포스트인지, 아니라면 팔로우 되어 있는 유저인지 확인
        if(this.props.match) {
            id = this.props.match.params.userId; 
            if(id === this.props.currentUser.id) {
                this.setState({
                    myInfo: true
                })
            } else {
                isFollowing(this.props.currentUser.id, id).then(response => {
                    this.setState({
                        following: response
                    })
                })
            }
        } else {
            id = this.props.currentUser.id;
            this.setState({
                myInfo: true
            });
        }

        if(id !== 0) {
            getUserInfo(id).then(response => {
                this.setState({
                    name: response.name,
                    introduction: response.introduction,
                    numLikes: response.numLikes,
                    numFollowing: response.numFollowing,
                    numFollower: response.numFollower
                })
            });
            getUserPosts(id).then(response => {
                this.setState({
                    userPosts: response
                })
            });
            getUserLikes(id).then(response => {
                this.setState({
                    userLikes: response
                })
            });
        }
    }

    render() {
        const tabs = [
            { title: '동영상', sub: '1' },
            { title: '좋아요', sub: '2' },
        ];
        return (
            <div className="userinfo">
                {this.props.match ?
                <NavBar
                    id="userinfo-navbar"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => {this.props.history.goBack()}}/>:null}
                <div className="userinfo-head-icons">
                    <div className="userinfo-thumbnail">
                        <div className="userinfo-thumbnail-name">
                            {(this.state.name) ? this.state.name.charAt(0) : ''}
                        </div>
                    </div>
                    <div className="userinfo-head-buttons">
                        {this.state.myInfo ?
                            <MyUserInfoHeadButtons onLogout={this.props.onLogout}/>
                            :
                            <UserInfoHeadButtons following={this.state.following}/>
                        }
                    </div>    
                </div>
                <div className="userinfo-head-info">
                    <div className="userinfo-name">
                        {this.state.name}
                    </div>

                    <div className="userinfo-introduce">
                        {this.state.introduction === "" ? "자기 소개를 입력해보세요" : this.state.introduction}
                    </div>
                    
                    <div className="userinfo-stat">
                        {this.state.numLikes} 좋아요 {this.state.numFollowing} 팔로잉 {this.state.numFollower} 팔로워
                    </div>
                </div>
                <div className="userinfo-content">
                <Tabs
                    tabs={tabs}
                    initialPage={0}
                    onChange={(tab, index) => { console.log('onChange', index, tab); }}
                    onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                    tabBarBackgroundColor="transparent"
                    tabBarActiveTextColor="white"
                    tabBarInactiveTextColor="gray"
                >
                <div >
                    <UserPosts columnNum={3} posts={this.state.userPosts}/>
                </div>
                <div >
                    <UserPosts columnNum={3} posts={this.state.userLikes}/>
                </div>
                </Tabs>
                </div>
            </div>
        );
    }
}

export default UserInfo;