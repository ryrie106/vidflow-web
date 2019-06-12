import React, { Component } from 'react';
import Swiper from "react-id-swiper";
import 'react-id-swiper/src/styles/css/swiper.css';

import { getAllPosts } from '../../utils/APIUtils';
import Post from './Post';


class PostList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        getAllPosts().then(response => {
            this.setState({
                posts: response
            })
        })
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