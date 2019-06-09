import React, { Component } from 'react';
import PostList from '../components/Home/PostList';
import Reply from '../Reply';
import './Home.css';

class Home extends Component {

    render() {
        return (
            <div className="home-wrapper">
                <PostList />
                <Reply />                
            </div>
        )
    }
}

export default Home;