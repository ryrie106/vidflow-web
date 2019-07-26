import React, { Component } from 'react';
import { Button, Tabs } from 'antd-mobile';

import { getUserInfo, getUserPosts, getUserLikes } from '../utils/APIUtils';
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
            userLikes: []
        }
    }

    componentDidMount() {
        if(this.props.currentUser) {
            getUserInfo(this.props.currentUser.id).then(response => {
                this.setState({
                    name: response.name,
                    introduction: response.introduction,
                    numLikes: response.numLikes,
                    numFollowing: response.numFollowing,
                    numFollower: response.numFollower
                })
            });
            getUserPosts(this.props.currentUser.id).then(response => {
                this.setState({
                    userPosts: response
                })
            });
            getUserLikes(this.props.currentUser.id).then(response => {
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
                <div className="userinfo-head-icons">
                    <div className="userinfo-thumbnail">
                        <div className="userinfo-thumbnail-name">
                            {(this.state.name) ? this.state.name.charAt(0) : ''}
                        </div>
                    </div>
                    <div className="userinfo-head-buttons">
                        <Button
                            id="userinfo-edit-profile"
                            size='small'>프로필수정</Button>
                        <Button
                            id="userinfo-logout" 
                            size='small'
                            onClick={this.props.onLogout}>로그아웃</Button>
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
                    <UserPosts posts={this.state.userPosts}/>
                </div>
                <div >
                    <UserPosts posts={this.state.userLikes}/>
                </div>
                </Tabs>
                </div>
            </div>
        );
    }
}

export default UserInfo;