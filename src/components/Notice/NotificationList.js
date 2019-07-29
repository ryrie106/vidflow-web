import React, {Component} from 'react';
import { NavLink } from "react-router-dom";
import { List } from 'antd-mobile';

import './NotificationList.css';

const Item = List.Item;
const Brief = Item.Brief;

class NotificationList extends Component {
    render() {
        const notificationlist = this.props.notifications.map(notification =>
            <NavLink className="notification-item" to={notification.link}>
                <Item key={notification.id} align="top"
                      thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
                    {notification.category === "LIKE" &&
                        <div>좋아요 <Brief> {notification.fromname} 님이 좋아요를 눌렀습니다.</Brief></div>}
                    {notification.category === "FOLLOW" &&
                    <div>좋아요 <Brief> {notification.fromname} 님이 당신을 팔로우하였습니다.</Brief></div>}
                    {notification.category === "NEWPOST" &&
                    <div>좋아요 <Brief> {notification.fromname} 님이 새 글을 작성하였습니다.</Brief></div>}
                    {notification.category === "COMMENT" &&
                    <div>좋아요 <Brief> {notification.fromname} 님이 댓글을 작성하였습니다.</Brief></div>}
                </Item>
            </NavLink>
        );

        return (
            <List className="notification-list">
                {notificationlist}
            </List>
        );
    }
}

export default NotificationList;