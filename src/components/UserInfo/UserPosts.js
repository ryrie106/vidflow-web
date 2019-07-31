import React, { Component } from 'react';
import { NavLink} from "react-router-dom";
import { Grid } from 'antd-mobile';

import { UPLOAD_SRC} from "../../constants";

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
            icon: UPLOAD_SRC + post.thumbnailSrc,
            text: post.postId,
            id: post.postId
        }));

        return (
            <Grid data={data1}
                  columnNum={this.props.columnNum}
                  renderItem={ (item) => (
                      <NavLink key={item.id} className="userposts-item" to={"/posts/" + item.id}>
                          <div>
                              <img src={item.icon} style={{height: "150px"}} alt="" />
                          </div>
                      </NavLink>
                  )}
            />
        );
    }
}

export default UserPosts;