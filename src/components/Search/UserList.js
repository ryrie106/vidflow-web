import React from "react";
import { NavLink } from "react-router-dom";
import { List } from "antd-mobile";

import "./UserList.css";

const Item = List.Item;
const Brief = Item.Brief;

function UserList(props) {
  const userList = props.users.map(user => (
    <NavLink key={user.id} className="userlist-item" to={`/user/${user.id}`}>
      <Item
        align="top"
        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
        multipleLine
      >
        {user.name} <Brief>{user.introduction}</Brief>
      </Item>
    </NavLink>
  ));

  return <div className="userlist">{userList}</div>;
}

export default UserList;
