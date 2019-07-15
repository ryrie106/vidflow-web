import React, { Component } from 'react';
import { Button } from 'antd-mobile';
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
            introduce: '탭하여 프로필에 자기소개 추가...',
        });
    }

    render() {        
        
        return (
            <div className="my">
                <div className="my-thumbnail">
                    <div className="my-thumbnail-name">
                        {this.state.name.charAt(0)}
                    </div>
                </div>
                <div className="my-name">
                    {this.state.name}
                </div>
                <Button
                    size='small'>프로필수정</Button>
                <Button 
                    size='small'
                    onClick={this.props.onLogout}>로그아웃</Button>
                <div className="my-introduce">
                    {this.state.introduce}
                </div>
                
                <div className="my-stat">
                    {this.state.numlike}좋아요 {this.state.numfollowing}팔로잉 {this.state.numfollower}팔로워
                </div>
            </div>
        );
    }
}

export default My;