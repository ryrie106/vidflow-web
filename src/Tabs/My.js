import React, { Component } from 'react';
import { Button, Tabs } from 'antd-mobile';

import { getUserInfo } from '../utils/APIUtils';
import './My.css';

/**
 * Component My (App -> Main -> My)
 * 1.
 *
 * Prop list
 * currentUser: {id: number, email: string, name: string}
 * onLogout: () => void
 */
class My extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            introduction: '',
            numLikes: 0,
            numFollowing: 0,
            numFollower: 0
        }
    }

    componentDidMount() {
        getUserInfo(this.props.currentUser.id).then(response => {
            this.setState({
                name: response.name,
                introduction: response.introduction,
                numLikes: response.numLikes,
                numFollowing: response.numFollowing,
                numFollower: response.numFollower
            })
        })
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
                        {this.state.introduction === "" ? "자기 소개를 입력해보세요" : this.state.introduction}
                    </div>
                    
                    <div className="my-stat">
                        {this.state.numLikes}좋아요 {this.state.numFollowing}팔로잉 {this.state.numFollower}팔로워
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