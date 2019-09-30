import React, { Component } from 'react';
import { Button, SearchBar, Tabs } from 'antd-mobile';

import UserPosts from '../components/UserInfo/UserPosts';
import UserList from '../components/Search/UserList';
import { queryPostContent, queryUserName } from '../utils/APIUtils';
import './Search.css';

class Search extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            userResults: [],
            videoResults: [],
        }
    }
    
    onChange = (value) => {
        this.setState({ value: value });
    };

    onClick = () => {
        queryPostContent(this.state.value).then(response => {
            this.setState({
                videoResults: response
            });
        });
        queryUserName(this.state.value).then(response => {
            this.setState({
                userResults: response
            });
        });
    };

    render() {
        const tabs = [
            {title: '사용자', sub: '1'},
            {title: '동영상', sub: '2'},
            {title: '해시테그', sub: '3'}
        ];
        
        return (
            <div className="main-tab" id="search">
                <div id="search-top">
                <SearchBar
                    className="search-bar"
                    onChange={this.onChange}
                    cancelText="x"/>
                <Button
                    id="search-submit"
                    onClick={this.onClick}>
                    검색
                </Button>
                </div>
                <Tabs tabs={tabs}
                      initialPage={0}
                      onChange={(tab, index) => { console.log('onChange', index, tab); }}
                      onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                      tabBarBackgroundColor="transparent"
                      tabBarActiveTextColor="white"
                      tabBarInactiveTextColor="gray"
                >
                    <div>
                        <UserList users={this.state.userResults}/>
                    </div>
                    <div>
                        <UserPosts columnNum={2} posts={this.state.videoResults} />
                    </div>
                    <div >
                        해시테그 검색
                    </div>
                </Tabs>
            </div>
        );
    }
}

export default Search;