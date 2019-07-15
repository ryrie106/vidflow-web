import React, { Component } from 'react';
import './App.css';
import { Route, withRouter } from 'react-router-dom';
import { Button, Modal, Toast, WhiteSpace } from 'antd-mobile';
import { getCurrentUser } from './utils/APIUtils';
import { ACCESS_TOKEN } from './constants';

import Login from './Pages/Login';
import Main from './Pages/Main';
import Signup from './Pages/Signup';
import VideoEdit from './Pages/VideoEdit';
import Write from './Pages/Write';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            currentUser: null,
            isAuthenticated: false,
            isLoading: false,
            isVisibleLoginModal: false,
        }
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

    componentDidMount() {
        this.loadCurrentUser();
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

    slideupLoginModal = () => {
        this.setState({
            isVisibleLoginModal: true
        });
    }

    closeLoginModal = () => {
        this.setState({
            isVisibleLoginModal: false
        });
    }

    render() {
        return (
            <div className="app">
                <Route exact path="/"
                    render={(props) => <Main 
                                        onLogout={this.onLogout} 
                                        isAuthenticated={this.state.isAuthenticated}
                                        slideupLoginModal={this.slideupLoginModal}
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
                    visible={this.state.isVisibleLoginModal}
                    onClose={() => {this.setState({isVisibleLoginModal:false})}}
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