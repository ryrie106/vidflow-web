import React, { Component } from 'react';
import Swiper from "react-id-swiper";
import { Modal } from 'antd-mobile';

import { getAllPosts } from '../utils/APIUtils';
import Post from '../components/Home/Post';
import CommentList from '../components/Home/CommentList';
import 'react-id-swiper/src/styles/css/swiper.css';
import './Home.css';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            currentPage: 0,
            isCommentIconClicked: false,

            currentPostId: 0
        };
    }

    componentDidMount() {
        getAllPosts().then(response => {
            this.setState({
                posts: response,
                currentPostId: response[0].id
            });
            // this.props.slideTransitionEnd(0, this.state.posts[0].id);
        })
    }

    toggleCommentModal = () => {
        this.setState({
            isCommentIconClicked: !this.state.isCommentIconClicked
        });
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
                            currentPage: this.state.currentPage + 1,

                            currentPostId: this.state.posts[this.state.currentPage+1].id
                        });
                    }
                },
                slidePrevTransitionEnd: () => {
                    if(this.state.currentPage > 0) {
                        this.setState({
                            currentPage: this.state.currentPage - 1,

                            currentPostId: this.state.posts[this.state.currentPage-1].id
                        });
                    }
                }
            }
        };

        const postList = this.state.posts.map(post =>
            <div key={post.id}><Post post={post} toggleCommentModal={this.toggleCommentModal}/></div>
        );

        return(
            <div className="home-wrapper">
                <Swiper {...params}>
                    {postList}
                </Swiper>
                <Modal
                    popup
                    visible={this.state.isCommentIconClicked}
                    onClose={this.toggleCommentModal}
                    animationType="slide-up"
                    // transparent="true"
                    afterClose={() => {}}
                >
                    <CommentList
                        toggleCommentModal={this.toggleCommentModal}
                        currentPostId={this.state.currentPostId}
                    />
                
                </Modal>
            </div>
        )
    }
}

export default Home;