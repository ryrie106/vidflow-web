import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swiper from "react-id-swiper";
import 'react-id-swiper/src/styles/css/swiper.css';

import Post from './Post';

const axios = require('axios');

class PostList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        axios.get('/posts/all').then(response => {
                console.log(response);
                this.setState({posts: response.data});
        });
    }

    render() {
        const params = {
            direction: 'vertical',
            shouldSwiperUpdate: true,
        };

        const postList = this.state.posts.map(post =>
            <div key={post.postno}><Post post={post} /></div>
        );

        return(
            <Swiper {...params}>
                {postList}
            </Swiper>
        )
    }
}

export default PostList;