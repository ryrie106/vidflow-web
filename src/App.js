import React, { Component } from 'react';
import './App.css';
import { Route, withRouter } from 'react-router-dom';
import { Toast } from 'antd-mobile';
import { getCurrentUser } from './utils/APIUtils';
import { ACCESS_TOKEN } from './constants';

import Login from './Pages/Login';
import Main from './Pages/Main';
import Signup from './Pages/Signup';
import Write from './Pages/Write';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            isAuthenticated: false,
            isLoading: false,
            isLoginRequired: false
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

        this.props.history.push("/");
        Toast.info('로그아웃 성공!', 1);
    }

    onLogin = () => {
        this.loadCurrentUser();
        this.props.history.push("/");
        Toast.info('로그인 성공!', 1);
    }

    render() {

        const { isAuthenticated } = this.state;

        return (
            <div className="app">
                <Route exact path="/"
                    render={(props) => <Main 
                                        onLogout={this.onLogout} 
                                        isAuthenticated={isAuthenticated}
                                        {...props} />}/>
                <Route path="/write"
                    render={(props) => <Write
                                        currentUser={this.state.currentUser}/>}/>
                <Route path="/login" 
                    render={(props) => <Login onLogin={this.onLogin} {...props} />} />
                <Route path="/signup" component={Signup} />
            </div>
        );
    }
}

export default withRouter(App);