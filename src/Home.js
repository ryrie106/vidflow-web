import React, { Component } from 'react';
import  PostList from './components/Home/PostList';
import './Home.css';

class Home extends Component {

    render() {
        return (
            <div className="home-wrapper">
                <PostList />
            </div>
        )
    }
}

export default Home;