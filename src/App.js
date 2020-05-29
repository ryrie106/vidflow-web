import React, { useEffect } from "react";
import { Route, withRouter } from "react-router-dom";
import SignIn from "features/auth/SignIn";
import Signup from "features/auth/SignUp";
import Main from "Main";
import WritePage from "features/write/WritePage";
import "./App.css";

import UserInfo from "features/user/UserInfo";
import { PATH_WRITE } from "utils/constants";
import { PATH_SIGNIN } from "utils/constants";
import { PATH_SIGNUP } from "utils/constants";
import { PATH_USERINFO } from "utils/constants";
import SignInModal from "features/meta/SignInModal";
import { fetchCurrentUser } from "features/auth/authSlice";
import { useDispatch } from "react-redux";

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
      <Route exact path="/" component={Main} />
      <Route path={PATH_WRITE} component={WritePage} />
      <Route path={PATH_SIGNIN} component={SignIn} />
      <Route path={PATH_SIGNUP} component={Signup} />
      <Route path={PATH_USERINFO+"/:userId"} render={(props) => <UserInfo {...props} />} />
      <SignInModal />
    </div>
  );
}

export default withRouter(App);
