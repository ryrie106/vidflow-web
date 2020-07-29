import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tabs } from "antd-mobile";

import { fetchUserInfo, fetchUserPosts, fetchUserLikes } from "./userSlice";
import UserPosts from "features/user/UserPosts";
import UserInfoHead from "features/user/UserInfoHead";
import "./UserInfo.css";
import PrevNavBar from "components/PrevNavBar";

function UserInfo(props) {
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.auth);
  const { userInfo, userPosts, userLikes, following } = useSelector(
    (state) => state.user
  );
  let myInfo = true;
  useEffect(() => {
    const id = props.match.params.userId
    myInfo = id === account.id;
    dispatch(fetchUserInfo(id));
    dispatch(fetchUserPosts(id));
    dispatch(fetchUserLikes(id));
  }, []);

  const tabs = [
    { title: "동영상", sub: "1" },
    { title: "좋아요", sub: "2" },
  ];
  return (
    <div className="main-tab" id="userinfo">
      <PrevNavBar />
      <UserInfoHead following={following} userInfo={userInfo} myInfo={myInfo} />
      <div id="userinfo-content">
        <Tabs
          tabs={tabs}
          initialPage={0}
          onChange={(tab, index) => {
            // console.log("onChange", index, tab);
          }}
          onTabClick={(tab, index) => {
            // console.log("onTabClick", index, tab);
          }}
          tabBarBackgroundColor="transparent"
          tabBarActiveTextColor="white"
          tabBarInactiveTextColor="gray"
        >
          <UserPosts columnNum={3} posts={userPosts} />
          <UserPosts columnNum={3} posts={userLikes} />
        </Tabs>
      </div>
    </div>
  );
}

export default UserInfo;
