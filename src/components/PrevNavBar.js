import React from "react";
import { NavBar, Icon } from "antd-mobile";
import { useHistory } from "react-router";
import "./PrevNavBar.css";

function PrevNavBar({ onLeftClick }) {
  let history = useHistory();
  return (
    <NavBar
      icon={<Icon type="left" />}
      onLeftClick={onLeftClick ? onLeftClick : () => history.goBack()}
    />
  );
}

export default PrevNavBar;
