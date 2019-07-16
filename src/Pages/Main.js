/**
 * Home, Search, Write, Notice, My 탭을 표시해 주는 Home 페이지
 * 
 */
import React, { Component } from 'react';
import { FaHome, FaGlobe, FaFolderPlus, FaComment, FaUser  } from 'react-icons/fa';
import { TabBar, Toast } from 'antd-mobile';

import Home from '../Tabs/Home';
import Search from '../Tabs/Search';
import Notice from '../Tabs/Notice';
import My from '../Tabs/My';
import './Main.css';


class Main extends Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedTab: 'homeTab',
        requireLoginModal: false,
      };
    }

    componentDidMount() {
      if(!this.props.isAuthenticated) {
        Toast.info("위 아래로 움직여보세요", 2);
      }
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
                icon={<FaHome style={{width:"35px", height:"35px"}} />}
                selectedIcon={<FaHome style={{width:"35px", height:"35px"}} />}
                selected={this.state.selectedTab === 'homeTab'}
                onPress={() => {
                    this.setState({
                        selectedTab: 'homeTab',
                    });
                }}
                data-seed="logId"
            >
              <Home 
                currentUser={this.props.currentUser}/>
            </TabBar.Item>
            <TabBar.Item
              icon={<FaGlobe style={{width:"35px", height:"35px"}}/>}
              selectedIcon={<FaGlobe style={{width:"35px", height:"35px"}}/>}
              key="Search"
              selected={this.state.selectedTab === 'searchTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'searchTab',
                });
              }}
              data-seed="logId1"
            >
              <Search />
            </TabBar.Item>
            
            <TabBar.Item
              icon={<FaFolderPlus style={{width:"35px", height:"35px"}}/>}
              selectedIcon={<FaFolderPlus style={{width:"35px", height:"35px"}}/>}
              key="write"
              selected={this.state.selectedTab === 'writeTab'}
              onPress={() => {
                if(!this.props.isAuthenticated) {
                  this.props.slideupLoginModal();
                } else {
                  this.props.history.push("/videoedit")
                }
              }}
            >
            </TabBar.Item>
            
            <TabBar.Item
              icon={<FaComment style={{width:"35px", height:"35px"}} />}
              selectedIcon={<FaComment style={{width:"35px", height:"35px"}} />}
              key="Notice"
              selected={this.state.selectedTab === 'noticeTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'noticeTab',
                });
              }}
            >
              <Notice />
            </TabBar.Item>
            
            <TabBar.Item
              icon={<FaUser style={{width:"35px", height:"35px"}} />}
              selectedIcon={<FaUser style={{width:"35px", height:"35px"}} />}
              key="my"
              selected={this.state.selectedTab === 'myTab'}
              onPress={() => {
                if(!this.props.isAuthenticated) {
                  this.props.slideupLoginModal();
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