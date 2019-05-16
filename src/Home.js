import React, { Component } from 'react';
import  PostList from './components/Home/PostList';
import './Home.css';

const axios = require('axios');

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {posts: []};
    }

    componentDidMount() {
        axios.get('/api/posts').then(response => {
                this.setState({posts: response.data._embedded.posts});
        });
    }

    render() {
        return (
            <div className="home-wrapper">
                <PostList postlist={this.state.posts}/>
            </div>
        )
    }
}

export default Home;