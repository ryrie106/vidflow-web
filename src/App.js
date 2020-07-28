import React, { useEffect } from "react";
import { Route, withRouter } from "react-router-dom";
import SignIn from "features/auth/SignIn";
import Signup from "features/auth/SignUp";
import WritePage from "features/write/WritePage";
import "./App.css";

import { 
  PATH_HOME,
  PATH_SEARCH,
  PATH_NOTIFICATION,
  PATH_WRITE,
  PATH_SIGNIN,
  PATH_SIGNUP,
  PATH_USERINFO,
 } from "utils/constants";
import SignInModal from "features/meta/SignInModal";
import CommentsModal from "features/posts/CommentsModal";
import UserInfo from "features/user/UserInfo";
import Home from "features/posts/Home";
import Notification from "features/notification/Notification";
import Search from "features/search/Search";


import { fetchCurrentUser } from "features/auth/authSlice";
import { useDispatch } from "react-redux";
import MainNavBar from "components/MainNavBar";


function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    try{
    dispatch(fetchCurrentUser());
    } catch(err) {
      console.log("user loading failed");
    }
  }, []);
  
  return (
    <div id="app">
      <Route exact path={PATH_HOME} component={Home} />
      <Route path={PATH_SEARCH} component={Search} />
      <Route path={PATH_NOTIFICATION} component={Notification} />

      <Route path={PATH_WRITE} component={WritePage} />
      <Route path={PATH_SIGNIN} component={SignIn} />
      <Route path={PATH_SIGNUP} component={Signup} />
      <Route path={PATH_USERINFO+"/:userId"} render={(props) => <UserInfo {...props} />} />
      <MainNavBar />
      <SignInModal />
      <CommentsModal />

    </div>
  );
}

export default withRouter(App);
