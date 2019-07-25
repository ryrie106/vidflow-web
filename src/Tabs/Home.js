import React, { Component } from 'react';
import Swiper from "react-id-swiper";
import { Button, Modal, Toast } from 'antd-mobile';
import SockJsClient from 'react-stomp';

import { getPosts, getPostId, deletePost } from '../utils/APIUtils';
import Post from '../components/Home/Post';
import CommentList from '../components/Home/CommentList';
import { PAGE_SIZE, WEBSOCKET_ENDPOINT } from '../constants';
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
            posts: [],
            videorefs: [],

            startPostId: 0,

            postIndex: 0,
            loadedPage: 0,
            currentPostId: 0,
            currentPostWriterId: 0,

            commentModal: false,
            shareModal: false,
        };
    }

    async componentDidMount() {
        await getPostId().then(response => {
            this.setState({startPostId: response.message});
        })
        if(this.state.startPostId !== 0) {
            await getPosts(this.state.startPostId, this.state.loadedPage).then(response => {
                this.setState( prevState => ({
                    posts: [...prevState.posts, ...response],
                    currentPostId: response[0].id,
                    currentPostWriterId: response[0].writerid
                }));
            })
            await this.getNextPage(); 
        }
    }

    // TODO: 이렇게 하면 마지막 페이지에 도달했을 때 계속 요청을 하게 된다.
    getNextPage = () => {
        getPosts(this.state.startPostId, this.state.loadedPage+1).then(response => {
            if(response.length > 0) {
                this.setState( prevState => ({
                    posts: [...prevState.posts, ...response],
                    loadedPage: prevState.loadedPage+1
                }));
            }
        })
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
                    if(this.state.postIndex < this.state.posts.length - 1 ) {
                        this.setState({
                            postIndex: this.state.postIndex + 1,
                            currentPostId: this.state.posts[this.state.postIndex+1].id,
                            currentPostWriterId: this.state.posts[this.state.postIndex+1].writerid
                        });
                    }
                    /*
                        게시물은 페이지 단위로 불러온다.
                        0페이지부터 시작하며 최대로 탐색한 페이지의 다음 페이지까지 불러온다.
                        초기에는 0, 1페이지를 불러오며 0-9번째 게시물까지 불러오게된다.
                        게시물을 탐색하다가 1페이지의 첫 번째인 5번 게시물을 탐색하게 되면
                        다음 2페이지인 10-14 게시물을 불러들인다.
                    */
                    if(this.state.postIndex + 1 > this.state.loadedPage * PAGE_SIZE) {
                        this.getNextPage();         
                    }
                },
                slidePrevTransitionEnd: () => {
                    if(this.state.postIndex > 0) {
                        this.setState({
                            postIndex: this.state.postIndex - 1,
                            currentPostId: this.state.posts[this.state.postIndex-1].id,
                            currentPostWriterId: this.state.posts[this.state.postIndex-1].writerid
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