import React, { Component } from 'react';
import Swiper from "react-id-swiper";
import {Button, Icon, Modal, NavBar, Toast} from 'antd-mobile';

import { getPostById, getPosts, getPostId, deletePost  } from '../utils/APIUtils';
import Post from '../components/Home/Post';
import CommentList from '../components/Home/CommentList';
import { PAGE_SIZE } from '../constants';
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
        try {
            // /posts/:postId 에서 하나의 Post만 불러올 때.
            if (this.props.match) {
                await getPostById(this.props.match.params.postId).then(response => {
                    // 비디오의 재생을 관리하기 위해 ref을 생성하여 Post -> VideoPlayer에 넘겨준다.
                    response.videoRef = React.createRef();
                    this.setState({
                        posts: [response],
                    });
                }).catch(null);
                await this.state.posts[0].videoRef.current.play();
                return;
            }
            else {
                await getPostId().then(response => {
                    this.setState({startPostId: response.message});
                }).catch(null);
                if (this.state.startPostId !== 0) {
                    await getPosts(this.state.startPostId, this.state.loadedPage).then(response => {
                        // 비디오의 재생을 관리하기 위해 ref을 생성하여 Post -> VideoPlayer에 넘겨준다.
                        response.map(r => r.videoRef = React.createRef());
                        this.setState(prevState => ({
                            posts: [...prevState.posts, ...response],
                        }));
                    });
                    await this.state.posts[0].videoRef.current.play();
                    await this.getNextPage();
                }
            }
            if(this.state.posts.length != 0) {
                this.setState({
                    currentPostId: this.state.posts[0].id,
                    currentPostWriterId: this.state.posts[0].writerid 
                })
            }
        } catch(err) {
            console.log(err);
        }
    }

    // TODO: 이렇게 하면 마지막 페이지에 도달했을 때 계속 요청을 하게 된다.
    getNextPage = () => {
        getPosts(this.state.startPostId, this.state.loadedPage+1).then(response => {
            if(response.length > 0) {
                // 비디오의 재생을 관리하기 위해 ref을 생성하여 Post -> VideoPlayer에 넘겨준다.
                response.map(r => r.videoRef = React.createRef());
                this.setState( prevState => ({
                    posts: [...prevState.posts, ...response],
                    loadedPage: prevState.loadedPage+1
                }));
            }
        })
    };

    showModal = key => (e) => {
        e.preventDefault();
        this.setState({
            [key]: true,
        });
    };

    closeModal = key => () => {
        this.setState({
            [key]: false,
        });
    };

    // 보고 있는 페이지 새로고침.
    refreshPost = () => {
        let stateCopy = Object.assign({}, this.state);
        stateCopy.posts = stateCopy.posts.slice();
        stateCopy.posts[this.state.postIndex] = Object.assign({}, stateCopy.posts[this.state.postIndex]);

        getPostById(this.state.currentPostId).then(response => {
            stateCopy.posts[this.state.postIndex].num_like = response.num_like;
            stateCopy.posts[this.state.postIndex].num_comment = response.num_comment;
            stateCopy.posts[this.state.postIndex].isliked = response.isliked;
        }).then(() => {
            this.setState(stateCopy);
        });

    };

    showAlert = () => {
        Modal.alert('삭제', '정말로 삭제하시겠습니까', [
            {text: 'Cancel', onPress: () => {}, style: 'default'},
            {text: 'OK', onPress: () => {
                        deletePost(this.state.currentPostId).then((response) => {
                            if (response.success) window.location.reload();
                            else Toast.fail(response.message, 1);
                        });
                    }
            }
        ])
    };

    render() {
        // react-id-swiper의 Swiper Component에 전달할 parameter이다.
        const params = {
            direction: 'vertical',
            shouldSwiperUpdate: true,
            on: {
                slideNextTransitionEnd: () => {
                    if(this.state.postIndex < this.state.posts.length - 1 ) {
                        this.state.posts[this.state.postIndex].videoRef.current.pause();
                        this.state.posts[this.state.postIndex+1].videoRef.current.play();

                        this.setState({
                            postIndex: this.state.postIndex + 1,
                            currentPostId: this.state.posts[this.state.postIndex+1].id,
                            currentPostWriterId: this.state.posts[this.state.postIndex+1].writerid
                        });

                    }
                    /*
                        게시물은 페이지 단위로 불러온다.
                        0페이지부터 시작하며 최대로 탐색한 페이지의 다음 페이지까지 불러온다.
                        초기에는 0, 1페이지를 불러오며 0-5번째 게시물까지 불러오게된다.
                        게시물을 탐색하다가 1페이지의 첫 번째인 3번 게시물을 탐색하게 되면
                        다음 2페이지인 6-8 게시물을 불러들인다.
                    */
                    if(this.state.postIndex + 1 > this.state.loadedPage * PAGE_SIZE) {
                        this.getNextPage();         
                    }
                },
                slidePrevTransitionEnd: () => {
                    if(this.state.postIndex > 0) {
                        this.state.posts[this.state.postIndex].videoRef.current.pause();
                        this.state.posts[this.state.postIndex-1].videoRef.current.play();
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
                    refreshPost={this.refreshPost}
                />
            </div>
        );

        return(
            <div className="home">
                {this.props.match ?
                    <NavBar
                        id="home-navbar"
                        icon={
                            <NavBar to="/">
                                <Icon type="left"/>
                            </NavBar>
                        }
                        onLeftClick={() => {this.props.history.goBack()}}/>:null}
                <Swiper {...params}>
                    {postList}
                </Swiper>
                <Modal
                    popup
                    visible={this.state.commentModal}
                    onClose={this.closeModal('commentModal')}
                    animationType="slide-up"
                    afterClose={this.refreshPost}
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
                                공
                            </div>
                        }
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Home;