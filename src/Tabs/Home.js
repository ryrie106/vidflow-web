import React, { Component } from 'react';
import Swiper from "react-id-swiper";
import { Button, Modal } from 'antd-mobile';
import { getAllPosts, deletePost } from '../utils/APIUtils';
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
            commentModal: false,
            shareModal: false,
            deleteConfirmModal: false,
            currentPostId: 0
        };
    }

    componentDidMount() {
        getAllPosts().then(response => {
            this.setState({
                posts: response,
                currentPostId: response[0].id
            });
        })
    }

    showModal = key => (e) => {
        e.preventDefault();
        this.setState({
            [key]: true,
        });
      }
    closeModal = key => () => {
        this.setState({
            [key]: false,
        });
    }

    showAlert = () => {
        Modal.alert('삭제', '정말로 삭제하시겠습니까', [
            {text: 'Cancel', onPress: () => {}, style: 'default'},
            {text: 'OK', onPress: () => {
                deletePost(this.state.currentPostId).then(() => {
                    // TODO: 메시지에 따른 처리
                    window.location.reload();
                });

            }}
        ])
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
            <div key={post.id}>
                <Post post={post} 
                    showModal={this.showModal}
                    currentUser={this.props.currentUser} />
            </div>
        );

        return(
            <div className="home">
                <Swiper {...params}>
                    {postList}
                </Swiper>
                <Modal
                    popup
                    visible={this.state.commentModal}
                    onClose={this.closeModal('commentModal')}
                    animationType="slide-up"
                    afterClose={() => {}}
                >
                    <CommentList
                        closeModal={this.closeModal}
                        currentPostId={this.state.currentPostId}
                    />
                </Modal>
                <Modal
                    popup
                    visible={this.state.shareModal}
                    onClose={this.closeModal('shareModal')}
                    animationType="slide-up"
                    afterClose={() => {}}
                >
                    <div>
                        <Button onClick={this.showAlert}>삭제</Button>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Home;