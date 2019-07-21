import React, { Component } from 'react';
import { FaHome, FaGlobe, FaFolderPlus, FaComment, FaUser  } from 'react-icons/fa';
import { TabBar, Toast } from 'antd-mobile';

import Home from '../Tabs/Home';
import Search from '../Tabs/Search';
import Notice from '../Tabs/Notice';
import My from '../Tabs/My';
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
      };
    }

    componentDidMount() {
        Toast.info("위 아래로 움직여보세요", 2);
    }

    onPress = (tab) => () => {
        this.setState({
            selectedTab: tab
        })
    }
  
    render() {
      return (
        <div className="main">
            <TabBar
                id="tabbar-main"
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="transparent"
                hidden={this.state.hidden}
            >
            <TabBar.Item
                key="Home"
                icon={<FaHome className="tabbar-main-pic" />}
                selectedIcon={<FaHome className="tabbar-main-pic" />}
                selected={this.state.selectedTab === 'homeTab'}
                onPress={this.onPress('homeTab')}
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
                onPress={this.onPress('searchTab')}
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
                    if(!this.props.currentUser) {
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
                onPress={this.onPress('noticeTab')}
            >
                <Notice />
            </TabBar.Item>
            
            <TabBar.Item
                icon={<FaUser className="tabbar-main-pic" />}
                selectedIcon={<FaUser className="tabbar-main-pic" />}
                key="my"
                selected={this.state.selectedTab === 'myTab'}
                onPress={() => {
                    if(!this.props.currentUser) {
                        this.props.showLoginModal();
                    } else {
                        this.setState({
                            selectedTab: 'myTab',
                        });
                    }                 
                }}
            >
                <My onLogout={this.props.onLogout} />
            </TabBar.Item>
          </TabBar>
        </div>
      );
    }
  }


  export default Main;