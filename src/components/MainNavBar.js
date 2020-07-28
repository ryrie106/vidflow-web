import React from "react";
import {
  FaHome,
  FaGlobe,
  FaFolderPlus,
  FaComment,
  FaUser,
} from "react-icons/fa";
import { 
  PATH_HOME,
  PATH_SEARCH,
  PATH_WRITE,
  PATH_NOTIFICATION,
  PATH_USERINFO
 } from "utils/constants";

import MainNavBarItem from "./MainNavBarItem";
import "./MainNavBar.css";

function MainNavBar() {
  return (
    <div className="navbar-main">
      <MainNavBarItem id="home" image={<FaHome className="navbar-main-item-pic" />} authenticated={false} path={PATH_HOME} />
      <MainNavBarItem id="search" image={<FaGlobe className="navbar-main-item-pic" />} authenticated={false} path={PATH_SEARCH} />
      <MainNavBarItem id="write" image={<FaFolderPlus className="navbar-main-item-pic" />} authenticated={true} path={PATH_WRITE} />
      <MainNavBarItem id="notification" image={<FaComment className="navbar-main-item-pic" />} authenticated={true} path={PATH_NOTIFICATION} />
      <MainNavBarItem id="userinfo" image={<FaUser className="navbar-main-item-pic" />} authenticated={true} path={PATH_USERINFO} />
    </div>
  );
}



export default MainNavBar;