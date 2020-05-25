import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

import {
  FaHome,
  FaGlobe,
  FaFolderPlus,
  FaComment,
  FaUser,
} from "react-icons/fa";
import { TabBar } from "antd-mobile";
import Home from "features/posts/Home";
import Search from "features/search/Search";
import Notification from "features/notification/Notification";
import UserInfo from "features/user/UserInfo";
import { openSignInModal, setSelectedTab } from "features/meta/metaSlice";
import { isGuest } from "features/auth/authSlice";
import CommentsModal from "features/posts/CommentsModal";
import { setUserInfoId } from "features/user/userSlice";
import "./Main.css";

function Main() {
  const [tabbarColor, setTabbarColor] = useState("transparent");
  const dispatch = useDispatch();
  let history = useHistory();
  const { selectedTab } = useSelector((state) => state.meta);
  const { account } = useSelector((state) => state.auth);

  function onPress(login, tab) {
    if (tab === "homeTab") {
      setTabbarColor("transparent");
    } else {
      setTabbarColor("black");
    }
    // 로그인을 요구하는 tab일 경우 로그인이 되어 있지 않으면 loginModal을 띄운다.
    if (login && isGuest(account)) {
      dispatch(openSignInModal());
    } else {
      dispatch(setSelectedTab(tab));      
    }
  }
  return (
    <div id="main">
      <TabBar
        class="tabbar-main"
        unselectedTintColor="gray"
        tintColor="white"
        barTintColor={tabbarColor}
      >
        <TabBar.Item
          key="Home"
          icon={<FaHome className="tabbar-main-pic" />}
          selectedIcon={<FaHome className="tabbar-main-pic" />}
          selected={selectedTab === "homeTab"}
          onPress={() => onPress(false, "homeTab")}
          data-seed="logId"
        >
          <Home />
        </TabBar.Item>
        <TabBar.Item
          key="Search"
          icon={<FaGlobe className="tabbar-main-pic" />}
          selectedIcon={<FaGlobe className="tabbar-main-pic" />}
          selected={selectedTab === "searchTab"}
          onPress={() => onPress(false, "searchTab")}
          data-seed="logId1"
        >
          <Search />
        </TabBar.Item>

        <TabBar.Item
          key="write"
          icon={<FaFolderPlus className="tabbar-main-pic" />}
          selectedIcon={<FaFolderPlus className="tabbar-main-pic" />}
          selected={selectedTab === "writeTab"}
          onPress={() => {
            if (isGuest(account)) {
              dispatch(openSignInModal());
            } else {
              history.push("/videoedit");
            }
          }}
        ></TabBar.Item>

        <TabBar.Item
          key="notification"
          icon={<FaComment className="tabbar-main-pic" />}
          selectedIcon={<FaComment className="tabbar-main-pic" />}
          selected={selectedTab === "notificationTab"}
          onPress={() => onPress(true, "notificationTab")}
          data-seed="logId2"
        >
          <Notification />
        </TabBar.Item>

        <TabBar.Item
          key="userinfo"
          icon={<FaUser className="tabbar-main-pic" />}
          selectedIcon={<FaUser className="tabbar-main-pic" />}
          selected={selectedTab === "userinfoTab"}
          onPress={() => {
              dispatch(setUserInfoId(account.id));
              onPress(true, "userinfoTab");
            }
          }
          data-seed="logId3"
        >
          <UserInfo />
        </TabBar.Item>
      </TabBar>
      <CommentsModal />
    </div>
  );
}

export default Main;