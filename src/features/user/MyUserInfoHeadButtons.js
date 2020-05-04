import React from "react";
import { Button } from "antd-mobile";
import { signOut } from "features/auth/authSlice";

import "./MyUserInfoHeadButtons.css";

function MyUserInfoHeadButtons() {
  return (
    <div id="userinfo-my-head-buttons">
      <Button id="userinfo-edit-profile" size="small" onClick={() => {}}>
        프로필수정
      </Button>
      <Button id="userinfo-logout" size="small" onClick={signOut}>
        로그아웃
      </Button>
    </div>
  );
}

export default MyUserInfoHeadButtons;
