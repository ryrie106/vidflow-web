import React from "react";
import { Button } from "antd-mobile";
import { follow, unfollow } from "features/user/userSlice";

import "./UserInfoHeadButtons.css";

function UserInfoHeadButtons({ following }) {
  return (
    <div id="userinfo-head-buttons">
      {following ? (
        <Button id="userinfo-unfollow" onClick={unfollow}>
          팔로잉
        </Button>
      ) : (
        <Button id="userinfo-follow" onClick={follow}>
          팔로우
        </Button>
      )}
    </div>
  );
}

export default UserInfoHeadButtons;
