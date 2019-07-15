/**
 * Home, Search, Write, Notice, My 탭을 표시해 주는 Home 페이지
 * 
 */
import React, { Component } from 'react';
import { FaHome, FaGlobe, FaFolderPlus, FaComment, FaUser  } from 'react-icons/fa';
import { Button, Modal, TabBar, Toast, WhiteSpace } from 'antd-mobile';

import Home from '../Tabs/Home';
import My from '../Tabs/My';
import './Main.css';

function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}

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
  
    renderContent(pageText) {
      return (
        <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
          <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
        </div>
      );
    }

    showModal = key => () => {
      this.setState({
        [key]: true,
      });
    }

    onClose = key => () => {
      this.setState({
        [key]: false,
      })
    }

    onPressHomeTab = () => {
        // console.log("TabBar: Home Clicked");
    }
  
    render() {
      return (
        <div className="main">
          <TabBar
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
                if(!this.props.isAuthenticated) {
                  this.setState({
                    requireLoginModal: true
                  });
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
              <My onLogout={this.props.onLogout} />
            </TabBar.Item>
          </TabBar>


          {/* 로그인이 필요한 기능(글쓰기)에 접근할 때 로그인이 되어 있지 않으면 로그인을 요구 */}
          <Modal
            popup
            visible={this.state.requireLoginModal}
            onClose={this.onClose('requireLoginModal')}
            animationType="slide-up"
            // transparent="true"
            afterClose={()=>{}}
          >
            <div className="require-login-modal"> 
              계속하려면 Vidflow 계정이 필요합니다.<WhiteSpace />
              <Button type="warning" onClick={() => {this.props.history.push("/signup")}}>회원가입</Button>
              <Foo/>
              <Button className="redirect-to-login" onClick={() => {this.props.history.push("/login")}}>이미 계정이 있으신가요? 로그인</Button>
            </div>
          </Modal>
        </div>
      );
    }
  }

  class Foo extends Component {
    componentDidMount() {
      // console.log("Foo Mounted!");
    }
    render() {
      return (
        <div/>
      )
    }
  }

  export default Main;