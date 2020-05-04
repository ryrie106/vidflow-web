import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavBar } from "antd-mobile";

import NotificationList from "features/notification/NotificationList";
import { getNotifications } from "utils/APIUtils";
import "./Notification.css";

function Notification() {
	const { account } = useSelector((state) => state.auth);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getNotifications(account.id).then((response) => {
      if (response) {
        setNotifications(response);
      }
    });
  }, []);
  return (
    <div className="main-tab" id="notification">
      <NavBar id="notification-navbar">알림</NavBar>
      {notifications.length !== 0 ? (
        <NotificationList notifications={notifications} />
      ) : (
        <div> 도착한 알람이 없습니다. </div>
      )}
    </div>
  );
}

export default Notification;
