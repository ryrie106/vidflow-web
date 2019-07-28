import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import { List } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

class NotificationList extends Component {
    render() {

        const notificationlist = this.props.notifications.map(notification =>
            <NavLink className="notification-item" to={notification.link}>
                <Item key={notification.id} align="top"
                      thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
                    {
                        () => {
                        switch (notification.category) {
                            case "LIKE":
                                return <div>좋아요 <Brief> {notification.username} 님이 좋아요를 눌렀습니다.</Brief></div>;
                            case "FOLLOW":
                                return null;
                            default:
                                return null;
                        }
                    }}
                </Item>
            </NavLink>
        );

        return (
            <List id="notice-list">
                {notificationlist}
            </List>
        );
    }
}

export default NotificationList;