import React, {Component} from 'react';
import { NavLink } from "react-router-dom";
import { List } from 'antd-mobile';

import './NotificationList.css';

const Item = List.Item;
const Brief = Item.Brief;

class NotificationList extends Component {
    render() {
        const notificationlist = this.props.notifications.map(notification => 
            <NavLink key={notification.id} className="notification-item" to={notification.link}>
                <Item align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
                    {notification.category === "LIKE" &&
                        <div>좋아요 <Brief> {notification.fromname} 님이 좋아요를 눌렀습니다.</Brief></div>}
                    {notification.category === "FOLLOW" &&
                        <div>팔로우 <Brief> {notification.fromname} 님이 당신을 팔로우하였습니다.</Brief></div>}
                    {notification.category === "NEWPOST" &&
                        <div>새 글 작성 <Brief> {notification.fromname} 님이 새 글을 작성하였습니다.</Brief></div>}
                    {notification.category === "COMMENT" &&
                        <div>댓글 작성 <Brief> {notification.fromname} 님이 댓글을 작성하였습니다.</Brief></div>}
                </Item>
            </NavLink>
        );

        return (
            <List id="notification-list">
                {notificationlist}
            </List>
        );
    }
}

export default NotificationList;