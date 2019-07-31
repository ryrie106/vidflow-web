import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Button, Modal, Toast } from 'antd-mobile';

import { getCurrentUser } from './utils/APIUtils';
import { ACCESS_TOKEN } from './constants';

import Login from './Pages/Login';
import Main from './Pages/Main';
import Signup from './Pages/Signup';
import VideoEdit from './Pages/VideoEdit';
import Write from './Pages/Write';
import './App.css';

import UserInfo from './Tabs/UserInfo';
import Home from './Tabs/Home';

/**
 * Component App
 * 1. 페이지의 라우팅
 * 2. 인증 정보 관리.
 */
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: {
                id: 0,
                email: 'guest',
                name: 'guest'
            },
            loading: false,
            
            // Main Page
            selectedTab: 'homeTab',
            loginModal: false,

            // VideoEdit, Write
            selectedFile: null,
            preview: null, // write에서 보여지는 그림
            thumbnail: null // 실제로 보낼 파일
        }
    }

    componentDidMount() {
        this.loadCurrentUser();    
    }

    componentWillUnmount() {
        if(this.state.socket) this.state.socket.disconnect();
    }

    loadCurrentUser = () => {
        this.setState({
            loading: true
        });
        getCurrentUser()
        .then(response => {
            this.setState({
                currentUser: response,
                loading: false
            });
        }).catch(error => {
            this.setState({
                loading: false
            });  
        });
    };

    onLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        this.setState({
            currentUser: null,
        });
        window.location.reload();
    };

    onLogin = () => {
        this.loadCurrentUser();
        this.props.history.push("/");
        Toast.info('로그인 성공!', 1);
    };

    onChangeVideoSelector = (file) => {
        this.setState({
            selectedFile: file
        })
    };

    setThumbnail = (file) => {
        this.setState({
            thumbnail: file
        })
    };


    setPreview = (base64) => {
        this.setState({
            preview: base64
        })
    };

    showLoginModal = () => {
        this.setState({
            loginModal: true
        });
    };

    closeLoginModal = () => {
        this.setState({
            loginModal: false
        });
    };

    render() {
        return (
            <div className="app">

                <Route path="/videoedit"
                    render={(props) => <VideoEdit 
                                        onChangeVideoSelector={this.onChangeVideoSelector}
                                        setThumbnail={this.setThumbnail}
                                        setPreview={this.setPreview}
                                        {...props} />}/>
                <Route path="/write"
                    render={(props) => <Write
                                        currentUser={this.state.currentUser}
                                        selectedFile={this.state.selectedFile}
                                        thumbnail={this.state.thumbnail}
                                        preview={this.state.preview}
                                        {...props} />}/>
                <Route path="/login" 
                    render={(props) => <Login onLogin={this.onLogin} {...props} />} />
                <Route path="/signup" component={Signup} />

                <Route path="/user/:userId"
                    render={(props) => <UserInfo
                                            currentUser={this.state.currentUser}
                                            onLogout={this.onLogout}
                                            {...props} />}/>

                <Route path="/posts/:postId"
                    render={(props) => <Home
                                            currentUser={this.state.currentUser}
                                            {...props} />}/>
                <Route exact path="/"
                       render={(props) => <Main
                           currentUser={this.state.currentUser}
                           selectedTab={this.state.selectedTab}
                           onLogout={this.onLogout}
                           showLoginModal={this.showLoginModal}
                           {...props} />}/>
               <Modal
                    popup
                    visible={this.state.loginModal}
                    onClose={this.closeLoginModal}
                    animationType="slide-up"
                    afterClose={()=>{}}
                >
                    <div className="login-modal"> 
                    계속하려면 Vidflow 계정이 필요합니다.
                    <Button type="warning" onClick={() => {
                        this.setState({loginModal:false});
                        this.props.history.push("/signup");
                        }}>회원가입</Button>
                    <Button className="redirect-to-login" onClick={() => {
                        this.setState({loginModal:false});                        
                        this.props.history.push("/login")
                        }}>이미 계정이 있으신가요? 로그인</Button>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default withRouter(App);