import React, { Component } from 'react';
import { Grid } from 'antd-mobile';

/**
 * Component UserPosts ( App -> Main -> UserInfo -> UserPosts )
 * 1. UserInfo에서 유저의 동영상 리스트를 보여준다.
 *
 * props
 * 1. posts :
 * 2. columnNum : number
 */
 class UserPosts extends Component {

    render() {
        const data1 = Array.from(this.props.posts).map((post) => ({
            icon: 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png',
            text: post.postId
        }));

        return (
            <Grid data={data1} columnNum={this.props.columnNum} itemStyle={{ height: '150px', background: 'rgba(0,0,0,.05)' }} />
        );
    }
}

export default UserPosts;