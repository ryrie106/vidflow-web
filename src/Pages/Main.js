import React, { Component } from 'react';
import { FaHome, FaGlobe, FaFolderPlus, FaComment, FaUser  } from 'react-icons/fa';
import { TabBar, Toast } from 'antd-mobile';

import Home from '../Tabs/Home';
import Search from '../Tabs/Search';
import Notice from '../Tabs/Notice';
import UserInfo from '../Tabs/UserInfo';
import './Main.css';

/**
 * Component Main
 * 1. root 페이지 표시
 * 2. Tabbar를 표시해 원하는 탭으로 전환
 */
class Main extends Component {
    /**
     * Props
     * currentUser : 
     * onLogout : () => void 
     * showLoginModal 
     */
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'homeTab',
            tabbarColor: 'transparent'
        };
    }

    componentDidMount() {
        Toast.info("위 아래로 움직여보세요", 2);
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

        if(login && !this.props.currentUser.id) {
            this.props.showLoginModal();
        } else {
            this.setState({
                selectedTab: tab
            })
        }
    };
  
    render() {
      return (
        <div className="main">
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
                selected={this.state.selectedTab === 'homeTab'}
                onPress={this.onPress(false, 'homeTab')}
                data-seed="logId"
            >
                <Home 
                    currentUser={this.props.currentUser}
                    showLoginModal={this.props.showLoginModal}/>
            </TabBar.Item>
            <TabBar.Item
                icon={<FaGlobe className="tabbar-main-pic"/>}
                selectedIcon={<FaGlobe className="tabbar-main-pic"/>}
                key="Search"
                selected={this.state.selectedTab === 'searchTab'}
                onPress={this.onPress(false, 'searchTab')}
                data-seed="logId1"
            >
                <Search />
            </TabBar.Item>
            
            <TabBar.Item
                icon={<FaFolderPlus className="tabbar-main-pic"/>}
                selectedIcon={<FaFolderPlus className="tabbar-main-pic"/>}
                key="write"
                selected={this.state.selectedTab === 'writeTab'}
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
                icon={<FaComment className="tabbar-main-pic" />}
                selectedIcon={<FaComment className="tabbar-main-pic" />}
                key="Notice"
                selected={this.state.selectedTab === 'noticeTab'}
                onPress={this.onPress(true, 'noticeTab')}
            >
                <Notice />
            </TabBar.Item>
            
            <TabBar.Item
                icon={<FaUser className="tabbar-main-pic" />}
                selectedIcon={<FaUser className="tabbar-main-pic" />}
                key="userinfo"
                selected={this.state.selectedTab === 'userinfoTab'}
                onPress={this.onPress(true, 'userinfoTab')}
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