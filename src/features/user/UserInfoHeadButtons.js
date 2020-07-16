import React from "react";
import { Button } from "antd-mobile";
import { follow, unfollow } from "features/user/userSlice";

import "./UserInfoHeadButtons.css";

function UserInfoHeadButtons({ following }) {
  let button;
  if (following) {
    button = (
      <Button id="userinfo-unfollow" onClick={unfollow}>
        팔로잉
      </Button>
    );
  } else {
    button = (
      <Button id="userinfo-follow" onClick={follow}>
        팔로우
      </Button>
    );
  }
  return <div id="userinfo-head-buttons">{button}</div>;
}

export default UserInfoHeadButtons;
