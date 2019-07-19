import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Button, Modal, Toast, WhiteSpace } from 'antd-mobile';
import { getCurrentUser } from './utils/APIUtils';
import { ACCESS_TOKEN } from './constants';

import Login from './Pages/Login';
import Main from './Pages/Main';
import Signup from './Pages/Signup';
import VideoEdit from './Pages/VideoEdit';
import Write from './Pages/Write';
import './App.css';

/**
 * Component App
 * 1. 페이지의 라우팅
 * 2. 인증 정보 관리.
 */
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            currentUser: null,
            isAuthenticated: false,
            isLoading: false,
            loginModal: false,
        }
    }

    componentDidMount() {
        this.loadCurrentUser();
    }

    loadCurrentUser = () => {
        this.setState({
            isLoading: true
        });
        getCurrentUser()
        .then(response => {
            this.setState({
                currentUser: response,
                isAuthenticated: true,
                isLoading: false
            });
        }).catch(error => {
            this.setState({
                isLoading: false
            });  
        });
    }

    onLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN);

        this.setState({
            currentUser: null,
            isAuthenticated: false
        });
        window.location.reload();
    }

    onLogin = () => {
        this.loadCurrentUser();
        this.props.history.push("/");
        Toast.info('로그인 성공!', 1);
    }

    onChangeVideoSelector = (file) => {
        this.setState({
            selectedFile: file
        })
    }

    showLoginModal = () => {
        this.setState({
            loginModal: true
        });
    }

    closeLoginModal = () => {
        this.setState({
            loginModal: false
        });
    }

    render() {
        return (
            <div className="app">
                <Route exact path="/"
                    render={(props) => <Main
                                        currentUser={this.state.currentUser}
                                        onLogout={this.onLogout} 
                                        isAuthenticated={this.state.isAuthenticated}
                                        showLoginModal={this.showLoginModal}
                                        {...props} />}/>
                <Route path="/videoedit"
                    render={(props) => <VideoEdit 
                                        onChangeVideoSelector={this.onChangeVideoSelector}
                                        {...props} />}/>
                <Route path="/write"
                    render={(props) => <Write
                                        currentUser={this.state.currentUser}
                                        selectedFile={this.state.selectedFile}                                   
                                        {...props} />}/>
                <Route path="/login" 
                    render={(props) => <Login onLogin={this.onLogin} {...props} />} />
                <Route path="/signup" component={Signup} />
            
                <Modal
                    popup
                    visible={this.state.loginModal}
                    onClose={this.closeLoginModal}
                    animationType="slide-up"
                    afterClose={()=>{}}
                >
                    <div className="login-modal"> 
                    계속하려면 Vidflow 계정이 필요합니다.<WhiteSpace />
                    <Button type="warning" onClick={() => {
                        this.setState({isVisibleLoginModal:false});
                        this.props.history.push("/signup");
                        }}>회원가입</Button>
                    <Foo/>
                    <Button className="redirect-to-login" onClick={() => {
                        this.setState({isVisibleLoginModal:false});                        
                        this.props.history.push("/login")
                        }}>이미 계정이 있으신가요? 로그인</Button>
                    </div>
                </Modal>
            </div>
        );
    }
}


class Foo extends Component {
    // Modal 안에서 컴포넌트 불러오기 테스트
    componentDidMount() {
      // console.log("Foo Mounted!");
    }
    render() {
      return (
        <div/>
      )
    }
  }

export default withRouter(App);