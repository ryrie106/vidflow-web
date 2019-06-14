import React, { Component } from 'react';
import Swiper from "react-id-swiper";
import 'react-id-swiper/src/styles/css/swiper.css';

import { getAllPosts } from '../../utils/APIUtils';
import Post from './Post';


class PostList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            currentPage: 0
        };
    }

    componentDidMount() {
        getAllPosts().then(response => {
            this.setState({
                posts: response
            });
            this.props.slideTransitionEnd(0, this.state.posts[0].id);
        })
    }

    render() {

        /*
            react-id-swiper의 Swiper Component에 전달할 parameter이다.
        */
        const params = {
            direction: 'vertical',
            shouldSwiperUpdate: true,
            on: {
                slideNextTransitionEnd: () => {
                    if(this.state.currentPage < this.state.posts.length - 1 ) {
                        this.setState({
                            currentPage: this.state.currentPage + 1
                        });
                        this.props.slideTransitionEnd(this.state.currentPage, this.state.posts[this.state.currentPage].id);
                    }
                },
                slidePrevTransitionEnd: () => {
                    if(this.state.currentPage > 0) {
                        this.setState({
                            currentPage: this.state.currentPage - 1
                        });
                        this.props.slideTransitionEnd(this.state.currentPage, this.state.posts[this.state.currentPage].id);
                    }
                }
            }
        };

        const postList = this.state.posts.map(post =>
            <div key={post.id}><Post post={post} toggleCommentPanel={this.props.toggleCommentPanel}/></div>
        );

        return(
            <Swiper {...params}>
                {postList}
            </Swiper>
        )
    }
}

export default PostList;