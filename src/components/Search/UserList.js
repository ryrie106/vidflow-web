import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import { List } from 'antd-mobile';

import './UserList.css';

const Item = List.Item;
const Brief = Item.Brief;

class UserList extends Component {
    render() {
        const userList = this.props.users.map(user =>
            <NavLink className="userlist-item" to={`/user/${user.id}`}>
                <Item key={user.id} align="top"
                      thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
                    {user.name} <Brief>{user.introduction}</Brief>
                </Item>
            </NavLink>
        );

        return (
            <div className="userlist">
                {userList}
            </div>
        );
    }
}

export default UserList;