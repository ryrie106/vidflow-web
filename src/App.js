import React, { useEffect } from "react";
import { Route, withRouter } from "react-router-dom";
import SignIn from "features/auth/SignIn";
import Signup from "features/auth/SignUp";
import Main from "Main";
import VideoEdit from "features/write/VideoEdit";
import Write from "features/write/Write";
import "./App.css";

import UserInfo from "features/user/UserInfo";
import { PATH_VIDEOEDIT } from "utils/constants";
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
    dispatch(fetchCurrentUser());
  }, []);
  
  return (
    <div id="app">
      <Route exact path="/" component={Main} />
      <Route path={PATH_VIDEOEDIT} component={VideoEdit} />
      <Route path={PATH_WRITE} component={Write} />
      <Route path={PATH_SIGNIN} component={SignIn} />
      <Route path={PATH_SIGNUP} component={Signup} />
      <Route path={PATH_USERINFO+"/:userId"} render={(props) => <UserInfo {...props} />} />
      <SignInModal />
    </div>
  );
}

export default withRouter(App);
