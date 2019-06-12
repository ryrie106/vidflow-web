import React, { Component } from 'react';
import './App.css';
import { Route, withRouter, Switch } from 'react-router-dom';
import { getCurrentUser } from './utils/APIUtils';
import { ACCESS_TOKEN } from './constants';

import Login from './Pages/Login';
import Home from './Pages/Home';
import Mypage from './Pages/Mypage';
import Signup from './Pages/Signup';
import Write from './Pages/Write';
import Footer from './common/Footer';
import RequireLoginPopup from './common/RequireLoginPopup';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            isAuthenticated: false,
            isLoading: false,
            isLoginRequired: false
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.loadCurrentUser = this.loadCurrentUser.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    loadCurrentUser() {
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

    handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN);

        this.setState({
            currentUser: null,
            isAuthenticated: false
        });

        this.props.history.push("/");
    }

    handleLogin() {
        this.loadCurrentUser();
        this.props.history.push("/");
    }

    render() {

        const { isLoginRequired, isAuthenticated } = this.state;

        return (
            <div className="app">
                <Route exact path="/" component={Home} />
                <Route path="/write" component={Write} />
                <Route path="/login" 
                    render={(props) => <Login onLogin={this.handleLogin} {...props} />} />
                <Route path="/signup" component={Signup} />
                <Route path="/mypage" 
                    render={(props) => <Mypage onLogout={this.handleLogout} {...props} />} />
                <Footer isAuthenticated={isAuthenticated}/>
                {isLoginRequired ? <RequireLoginPopup /> : null}
            </div>
        );
    }
}

export default withRouter(App);