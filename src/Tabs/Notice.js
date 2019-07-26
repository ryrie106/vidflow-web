import React, { Component } from 'react';
import { List, NavBar } from 'antd-mobile';
import './Notice.css';

const Item = List.Item;
const Brief = Item.Brief;

/**
 * Component Notice ( App -> Main -> Notice )
 * 1. 팔로우한 사용자의 글 작성 알림
 * 2. 좋아요 눌러졌을 때 알림
 * 3. 댓글 달렸을 때 알림.
 * 4. 팔로우 되었을 때 알림.
 * Prop list
 *
 */
class Notice extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notice: []
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="notice">
                <NavBar
                    id="notice-navbar"
                >알림</NavBar>
                <List id="notice-list">
                    <Item extra="10:30" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
                        글 작성 <Brief>** 님이 동영상을 업로드 했습니다.</Brief>
                    </Item>
                    <Item extra="10:30" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
                        댓글 작성 <Brief>** 님이 **에 댓글을 달았습니다.</Brief>
                    </Item>
                    <Item extra="10:30" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
                        좋아요 <Brief>** 님이 **에 좋아요를 눌렀습니다.</Brief>
                    </Item>
                    <Item extra="10:30" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
                        팔로우 <Brief>** 님이 당신을 팔로우하였습니다.</Brief>
                    </Item>
                    <Item extra="10:30" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
                        글 작성 <Brief>** 님이 동영상을 업로드 했습니다.</Brief>
                    </Item>
                    <Item extra="10:30" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
                        댓글 작성 <Brief>** 님이 **에 댓글을 달았습니다.</Brief>
                    </Item>
                    <Item extra="10:30" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
                        좋아요 <Brief>** 님이 **에 좋아요를 눌렀습니다.</Brief>
                    </Item>
                    <Item extra="10:30" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
                        팔로우 <Brief>** 님이 당신을 팔로우하였습니다.</Brief>
                    </Item>
                    <Item extra="10:30" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
                        글 작성 <Brief>** 님이 동영상을 업로드 했습니다.</Brief>
                    </Item>
                    <Item extra="10:30" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
                        댓글 작성 <Brief>** 님이 **에 댓글을 달았습니다.</Brief>
                    </Item>
                    <Item extra="10:30" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
                        좋아요 <Brief>** 님이 **에 좋아요를 눌렀습니다.</Brief>
                    </Item>
                    <Item extra="10:30" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
                        팔로우 <Brief>** 님이 당신을 팔로우하였습니다.</Brief>
                    </Item>

                </List>
            </div>
        );
    }
}

export default Notice;