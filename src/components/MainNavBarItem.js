import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { isGuest } from "features/auth/authSlice";
import { openSignInModal } from "features/meta/metaSlice";

import "./MainNavBarItem.css";

function MainNavBarItem({ image, authenticated, path }) {
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.auth);
  let history = useHistory();

  return (
    <div
      className="navbar-main-item"
      onClick={() => {
        if (authenticated && isGuest(account)) {
          dispatch(openSignInModal());
        } else {
          history.push(path);
        }
      }}
    >
      {image}
    </div>
  );
}

export default MainNavBarItem;
