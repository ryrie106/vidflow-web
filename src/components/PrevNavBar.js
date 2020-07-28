import React from "react";
import { useHistory } from "react-router";
import { BsChevronLeft } from "react-icons/bs";
import "./PrevNavBar.css";

function PrevNavBar({ onLeftClick }) {
  return (
    <div className="navbar-prev">
      <Left onLeftClick={onLeftClick}/>
    </div>
  );
}

function Left({onLeftClick}) {
  let history = useHistory();
  return (
    <BsChevronLeft className="navbar-prev-left" onClick={onLeftClick ? onLeftClick : () => history.goBack()} />
  )
}

export default PrevNavBar;
