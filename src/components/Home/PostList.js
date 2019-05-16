import React, { Component } from 'react';
import Swiper from "react-id-swiper";
import 'react-id-swiper/src/styles/css/swiper.css';

import Post from './Post';

class PostList extends Component {

    render() {
        const params = {
            direction: 'vertical',
            shouldSwiperUpdate: true,
        };

        const postList = this.props.postlist.map(post =>
            <div key={post._links.self.href}><Post post={post} /></div>
        );

        return(
            <div className="wrapper">
                <Swiper {...params}>
                    {postList}
                </Swiper>
            </div>
        )
    }
}

export default PostList;