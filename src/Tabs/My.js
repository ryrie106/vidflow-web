import React, { Component } from 'react';
import { Button, Tabs } from 'antd-mobile';
import './My.css';

class My extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            introduce: '',
            numlike: 0,
            numfollowing: 0,
            numfollower: 0
        }
    }

    componentDidMount() {
        this.setState({
            name: '이름임',
            introduce: '탭하여 프로필에 자기소개 추가.아아아아아아아아아아아아아아아아아아ㅏ아아아아아아아아아아아아아아아아아아..',
        });
    }

    render() {

        const tabs = [
            { title: '동영상', sub: '1' },
            { title: '좋아요', sub: '2' },
        ];
        
        return (
            <div className="my">
                <div className="my-head-icons">
                    <div className="my-thumbnail">
                        <div className="my-thumbnail-name">
                            {this.state.name.charAt(0)}
                        </div>
                    </div>
                    <div className="my-head-buttons">
                        <Button
                            id="my-edit-profile"
                            size='small'>프로필수정</Button>
                        <Button
                            id="my-logout" 
                            size='small'
                            onClick={this.props.onLogout}>로그아웃</Button>
                    </div>    
                </div>
                <div className="my-head-info">
                    <div className="my-name">
                        {this.state.name}
                    </div>

                    <div className="my-introduce">
                        {this.state.introduce}
                    </div>
                    
                    <div className="my-stat">
                        {this.state.numlike}좋아요 {this.state.numfollowing}팔로잉 {this.state.numfollower}팔로워
                    </div>
                </div>
                <div className="my-content">
                <Tabs tabs={tabs}
                    
                    initialPage={1}
                    onChange={(tab, index) => { console.log('onChange', index, tab); }}
                    onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                >
                <div >
                    Content of first tab
                </div>
                <div >
                    Content of second tab
                </div>
                </Tabs>
                </div>
            </div>
        );
    }
}

export default My;