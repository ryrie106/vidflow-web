import React, { Component } from 'react';
import { FaHome, FaGlobe, FaFolderPlus, FaComment, FaUser  } from 'react-icons/fa';
import { TabBar } from 'antd-mobile';

import Home from '../Tabs/Home';
import Mypage from '../Tabs/Mypage';

class Main extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedTab: 'homeTab',
      };
      this.onPressHomeTab = this.onPressHomeTab.bind(this);
    }
  
    renderContent(pageText) {
      return (
        <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
          <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
        </div>
      );
    }

    onPressHomeTab() {
        console.log("TabBar: Home Clicked");
    }
  
    render() {
      return (
        <div style={{position: 'fixed', height: '100%', width: '100%', background: 'transparent'}} >
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="transparent"
            hidden={this.state.hidden}
          >
            <TabBar.Item
                key="Home"
                icon={<FaHome style={{width:"35px", height:"35px"}} />
                }
                selectedIcon={<FaHome style={{width:"35px", height:"35px"}} />
                }
                selected={this.state.selectedTab === 'homeTab'}
                badge={1}
                onPress={() => {
                    this.onPressHomeTab();
                    this.setState({
                        selectedTab: 'homeTab',
                    });
                }}
                data-seed="logId"
            >
              <Home />
            </TabBar.Item>
            <TabBar.Item
              icon={<FaGlobe style={{width:"35px", height:"35px"}}/>}
              selectedIcon={<FaGlobe style={{width:"35px", height:"35px"}}/>}
              key="Search"
              badge={'new'}
              selected={this.state.selectedTab === 'searchTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'searchTab',
                });
              }}
              data-seed="logId1"
            >
              {this.renderContent('Search')}
            </TabBar.Item>
            
            <TabBar.Item
              icon={<FaFolderPlus style={{width:"35px", height:"35px"}}/>}
              selectedIcon={<FaFolderPlus style={{width:"35px", height:"35px"}}/>}
              key="write"
              selected={this.state.selectedTab === 'writeTab'}
              onPress={() => {
                this.props.history.push("/write")
              }}
            >
            </TabBar.Item>
            
            <TabBar.Item
              icon={<FaComment style={{width:"35px", height:"35px"}} />}
              selectedIcon={<FaComment style={{width:"35px", height:"35px"}} />}
              key="Notice"
              dot
              selected={this.state.selectedTab === 'noticeTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'noticeTab',
                });
              }}
            >
              {this.renderContent('Notice')}
            </TabBar.Item>
            
            <TabBar.Item
              icon={<FaUser style={{width:"35px", height:"35px"}} />}
              selectedIcon={<FaUser style={{width:"35px", height:"35px"}} />}
              key="my"
              selected={this.state.selectedTab === 'myTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'myTab',
                });
              }}
            >
              {this.renderContent('My')}
            </TabBar.Item>
          </TabBar>
        </div>
      );
    }
  }

  export default Main;