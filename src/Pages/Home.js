import React, { Component } from 'react';
import PostList from '../components/Home/PostList';
import CommentList from '../components/Home/CommentList';
import './Home.css';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isCommentIconClicked: false,
            currentPage: 0,  
            /**
             * 댓글을 불러오려면 현재 보고 있는 Post의 Id가 필요한데 post정보는 
             * PostList에서 들고 있어서 Home에서 넘겨주기가 힘들다.
             * 그래서 어쩔수 없이 PostId만 올려보냄
             */
            currentPostId: 0
        };
        this.slideTransitionEnd = this.slideTransitionEnd.bind(this);
        this.toggleCommentPanel = this.toggleCommentPanel.bind(this);
    }

    slideTransitionEnd(currentPage, currentPostId) {
        this.setState({
            currentPage: currentPage,
            currentPostId: currentPostId
        });
    }

    toggleCommentPanel() {
        this.setState({
            isCommentIconClicked: !this.state.isCommentIconClicked
        });
    }


    render() {
        return (
            <div className="home-wrapper">
                <PostList
                    slideTransitionEnd={this.slideTransitionEnd}
                    toggleCommentPanel={this.toggleCommentPanel}
                />
                {this.state.isCommentIconClicked ? 
                <CommentList 
                    toggleCommentPanel={this.toggleCommentPanel}
                    currentPostId={this.state.currentPostId}
                />
                : null}   
            </div>
        )
    }
}

export default Home;