import React from "react";

import DefaultThumbnail from "components/Common/DefaultThumbnail";
import UserInfoHeadButtons from "./UserInfoHeadButtons";
import MyUserInfoHeadButtons from "./MyUserInfoHeadButtons";
import "./UserInfoHead.css";

function UserInfoHead({ myInfo, userInfo, following }) {
  return (
    <div id="userinfo-head">
      <div id="userinfo-head-background" />
      <div id="userinfo-head-icons">
        <DefaultThumbnail
          style={{ "marginTop": "-100px" }}
          name={userInfo.name}
        />
        {myInfo ? (
          <MyUserInfoHeadButtons />
        ) : (
          <UserInfoHeadButtons following={following} />
        )}
      </div>
      <div id="userinfo-head-info">
        <div id="userinfo-name">{userInfo.name}</div>

        <div id="userinfo-introduce">
          {userInfo.introduction === ""
            ? "자기 소개를 입력해보세요"
            : userInfo.introduction}
        </div>

        <div id="userinfo-stat">
          {userInfo.numLikes} 좋아요 {userInfo.numFollowing} 팔로잉{" "}
          {userInfo.numFollower} 팔로워
        </div>
      </div>
    </div>
  );
}

export default UserInfoHead;
