import React, { Component } from 'react';
import { NavBar } from 'antd-mobile';

import NotificationList from "../components/Notice/NotificationList";
import { getNotifications } from "../utils/APIUtils";
import './Notification.css';

/**
 * Component Notification ( App -> Main -> Notification )
 * 1. 팔로우한 사용자의 글 작성 알림
 * 2. 좋아요 눌러졌을 때 알림
 * 3. 댓글 달렸을 때 알림.
 * 4. 팔로우 되었을 때 알림.
 * Prop list
 *
 */
class Notification extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notifications: []
        }
    }

    componentDidMount() {
        getNotifications(this.props.currentUser.id).then(response =>
            this.setState({
                notifications: response
            })
        );
    }
    render() {
        return (
            <div className="main-tab" id="notification">
                <NavBar
                    id="notification-navbar"
                >알림</NavBar>
                <NotificationList
                    notifications={this.state.notifications}/>
            </div>
        );
    }
}

export default Notification;