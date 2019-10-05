import React, { Component } from 'react';
import { Icon, NavBar, Tabs } from 'antd-mobile';

import { getUserPosts, getUserLikes } from '../utils/APIUtils';
import UserPosts from '../components/UserInfo/UserPosts';
import UserInfoHead from '../components/UserInfo/UserInfoHead';
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
            infoId: 0,
            myInfo: false,
            following: false,
            userPosts: [],
            userLikes: []
        }
    }

    componentDidMount() {
        let infoId;
        // url에 parameter를 가지고 routing되면 this.props.match를 가진다.
        // 정보를 확인할 id를 확인
        if(this.props.match) {
            infoId = parseInt(this.props.match.params.userId);
        } else {
            infoId = this.props.currentUser.id;
        }

        this.setState({
            infoId: infoId
        });

        if(infoId !== 0) {
            getUserPosts(infoId).then(response => {
                this.setState({
                    userPosts: response
                })
            });
            getUserLikes(infoId).then(response => {
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
            <div className="main-tab" id="userinfo">
                {this.props.match ?
                <NavBar
                    id="userinfo-navbar"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => {this.props.history.goBack()}}/>:
                <div className="navbar-null" style={{width: "100%", height: "50px"}}/>}
                {this.state.infoId ?
                <UserInfoHead 
                    currentUser={this.props.currentUser}
                    infoId={this.state.infoId}
                    onLogout={this.props.onLogout}
                />:null}
                <div id="userinfo-content">
                    <Tabs
                        tabs={tabs}
                        initialPage={0}
                        onChange={(tab, index) => { console.log('onChange', index, tab); }}
                        onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                        tabBarBackgroundColor="transparent"
                        tabBarActiveTextColor="white"
                        tabBarInactiveTextColor="gray"
                    >
                        <div>
                            <UserPosts columnNum={3} posts={this.state.userPosts}/>
                        </div>
                        <div>
                            <UserPosts columnNum={3} posts={this.state.userLikes}/>
                        </div>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default UserInfo;