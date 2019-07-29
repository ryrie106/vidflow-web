import React, { Component } from 'react';
import { Button } from 'antd-mobile';

import './MyUserInfoHeadButtons.css';


class MyUserInfoHeadButtons extends Component {

    render() {
        return(
            <div>
                <Button
                    id="userinfo-edit-profile"
                    size='small'
                    onClick={()=>{}}>
                    프로필수정
                </Button>
                <Button
                    id = "userinfo-logout"
                    size='small'
                    onClick={this.props.onLogout}>
                    로그아웃
                </Button>
            </div>
        )
    }
}

export default MyUserInfoHeadButtons;