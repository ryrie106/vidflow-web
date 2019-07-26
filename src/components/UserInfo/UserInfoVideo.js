import React, { Component } from 'react';
import { Grid } from 'antd-mobile';

class UserInfoVideo extends Component {
    
    render() {
        const data1 = Array.from(new Array(9)).map(() => ({
            icon: 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png',
          }));

        return (
            <Grid data={data1} columnNum={3} itemStyle={{ height: '150px', background: 'rgba(0,0,0,.05)' }} />
        );
    }
}

export default UserInfoVideo;