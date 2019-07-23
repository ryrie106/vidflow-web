import React, { Component } from 'react';
import Swiper from "react-id-swiper";
import { Button, Modal, Toast } from 'antd-mobile';
import SockJsClient from 'react-stomp';

import { getAllPosts, deletePost } from '../utils/APIUtils';
import Post from '../components/Home/Post';
import CommentList from '../components/Home/CommentList';
import { WEBSOCKET_ENDPOINT } from '../constants';
import 'react-id-swiper/src/styles/css/swiper.css';
import './Home.css';

/**
 * Component Home (App -> Main -> Home)
 * 1. 게시물 불러오기
 * 2. 댓글, 공유 Modal 관리
 * 
 * Prop list
 * currentUser :
 */
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // socket: null,
            // stompClient: null,

            posts: [],
            videorefs: [],
            currentPage: 0,
            currentPostId: 0,
            currentPostWriterId: 0,

            commentModal: false,
            shareModal: false,
            deleteConfirmModal: false,
        };
    }

    componentDidMount() {
        // this.connect();
        if(this.props.currentUser) {
            // 로그인이 되어 있으면
            getAllPosts().then(response => {
                if(response) {
                    this.setState({
                        posts: response,
                        currentPostId: response[0].id,
                        currentPostWriterId: response[0].writerid
                    });
                }
            })
        } else {
            // 로그인이 되어 있지 않으면
            getAllPosts().then(response => {
                if(response) {
                    this.setState({
                        posts: response,
                        currentPostId: response[0].id,
                        currentPostWriterId: response[0].writerid
                    });
                }
            })
        }
    }

    greeting = (message) => {
        console.log(message);
        Toast.info(JSON.parse(message.body).msg, 1);
    }

    sendMessage = (msg) => () => {
        this.stompClient.sendMessage("/app/hello", JSON.stringify({'msg': msg}));
    }

    addVideoRef = (ref) => () => {
        this.state.videorefs.push(ref);
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
                deletePost(this.state.currentPostId).then((response) => {
                    if(response.success)
                        window.location.reload();
                    else
                        Toast.fail(response.message, 1);
                });

            }}
        ])
    }

    render() {
        // const params: react-id-swiper의 Swiper Component에 전달할 parameter이다.
        const params = {
            direction: 'vertical',
            shouldSwiperUpdate: true,
            on: {
                slideNextTransitionEnd: () => {
                    if(this.state.currentPage < this.state.posts.length - 1 ) {
                        this.setState({
                            currentPage: this.state.currentPage + 1,
                            currentPostId: this.state.posts[this.state.currentPage+1].id,
                            currentPostWriterId: this.state.posts[this.state.currentPage+1].writerid
                        });
                    }
                },
                slidePrevTransitionEnd: () => {
                    if(this.state.currentPage > 0) {
                        this.setState({
                            currentPage: this.state.currentPage - 1,
                            currentPostId: this.state.posts[this.state.currentPage-1].id,
                            currentPostWriterId: this.state.posts[this.state.currentPage-1].writerid
                        });
                    }
                }
            }
        };

        const postList = this.state.posts.map(post =>
            <div key={post.id}>
                <Post 
                    post={post}
                    showModal={this.showModal}
                    currentUser={this.props.currentUser}
                    sendMessage={this.sendMessage} />
            </div>
        );

        return(
            <div className="home">
                <SockJsClient url={WEBSOCKET_ENDPOINT} topics={['/topic/greetings']}
                    onMessage={(msg) => { Toast.info(msg, 1); }}
                    ref={ (client) => { this.stompClient = client }} />
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
                        showModal={this.showModal}
                        closeModal={this.closeModal}
                        showLoginModal={this.props.showLoginModal}
                        currentPostId={this.state.currentPostId}
                        currentUser={this.props.currentUser}
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
                        {(this.props.currentUser && this.props.currentUser.id === this.state.currentPostWriterId)?
                            <Button onClick={this.showAlert}>삭제</Button>
                            :
                            <div>
                                공유 모달
                            </div>
                        }
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Home;