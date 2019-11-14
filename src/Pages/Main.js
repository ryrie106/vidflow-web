import React, { Component } from 'react';
import { FaHome, FaGlobe, FaFolderPlus, FaComment, FaUser  } from 'react-icons/fa';
import { TabBar } from 'antd-mobile';

import Home from '../Tabs/Home';
import Search from '../Tabs/Search';
import Notification from '../Tabs/Notification';
import UserInfo from '../Tabs/UserInfo';
import './Main.css';

/**
 * Component Main
 * 1. root 페이지 표시
 * 2. Tabbar를 표시해 원하는 탭으로 전환
 */
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabbarColor: 'transparent'
        };
    }

    onPress = (login, tab) => () => {
        if(tab === 'homeTab') {
            this.setState({
                tabbarColor: 'transparent'
            });
        } else {
            this.setState({
                tabbarColor: 'black'
            });
        }

        // 로그인을 요구하는 tab일 경우 로그인이 되어 있지 않으면 loginModal을 띄운다.
        if(login && !this.props.currentUser.id) {
            this.props.showLoginModal();
        } else {
            this.props.selectTab(tab);
        }
    };
  
    render() {
        return (
            <div id="main">
            <TabBar
                class="tabbar-main"
                unselectedTintColor="gray"
                tintColor="white"
                barTintColor={this.state.tabbarColor}
                hidden={this.state.hidden}
            >
            <TabBar.Item
                key="Home"
                icon={<FaHome className="tabbar-main-pic" />}
                selectedIcon={<FaHome className="tabbar-main-pic" />}
                selected={this.props.selectedTab === 'homeTab'}
                onPress={this.onPress(false, 'homeTab')}
                data-seed="logId"
            >
                <Home 
                    currentUser={this.props.currentUser}
                    showLoginModal={this.props.showLoginModal}/>
            </TabBar.Item>
            <TabBar.Item
                key="Search"
                icon={<FaGlobe className="tabbar-main-pic"/>}
                selectedIcon={<FaGlobe className="tabbar-main-pic"/>}
                selected={this.props.selectedTab === 'searchTab'}
                onPress={this.onPress(false, 'searchTab')}
                data-seed="logId1"
            >
                <Search/>
            </TabBar.Item>
            
            <TabBar.Item
                key="write"
                icon={<FaFolderPlus className="tabbar-main-pic"/>}
                selectedIcon={<FaFolderPlus className="tabbar-main-pic"/>}
                selected={this.props.selectedTab === 'writeTab'}
                onPress={() => {
                    if(!this.props.currentUser.id) {
                        this.props.showLoginModal();
                    } else {
                        this.props.history.push("/videoedit")
                    }
                }}
            >
            </TabBar.Item>
            
            <TabBar.Item
                key="notification"
                icon={<FaComment className="tabbar-main-pic" />}
                selectedIcon={<FaComment className="tabbar-main-pic" />}
                selected={this.props.selectedTab === 'notificationTab'}
                onPress={this.onPress(true, 'notificationTab')}
                data-seed="logId2"
            >
                <Notification
                    currentUser={this.props.currentUser}
                />
            </TabBar.Item>
            
            <TabBar.Item
                key="userinfo"
                icon={<FaUser className="tabbar-main-pic" />}
                selectedIcon={<FaUser className="tabbar-main-pic" />}
                selected={this.props.selectedTab === 'userinfoTab'}
                onPress={this.onPress(true, 'userinfoTab')}
                data-seed="logId3"
            >
                <UserInfo 
                    onLogout={this.props.onLogout}
                    currentUser={this.props.currentUser} />
            </TabBar.Item>
          </TabBar>
        </div>
      );
    }
  }


  export default Main;