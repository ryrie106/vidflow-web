import React, { Component } from 'react';
import { SearchBar, Tabs } from 'antd-mobile';

import './Search.css';

class Search extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }
    
    onChange= (value) => {
        this.setState({ value });
    };

    render() {
        
        const tabs = [
            {title: '사용자', sub: '1'},
            {title: '동영상', sub: '2'},
            {title: '해시테그', sub: '3'}
        ];
        
        return (
            <div className="search">
                <SearchBar />
                <Tabs tabs={tabs}
                      initialPage={1}
                      onChange={(tab, index) => { console.log('onChange', index, tab); }}
                      onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                      tabBarBackgroundColor="transparent"
                      tabBarActiveTextColor="white"
                      tabBarInactiveTextColor="gray"
                >
                    <div>
                        사용자 검색
                    </div>
                    <div>
                        동영상 검색
                    </div>
                    <div>
                        해시테그 검색
                    </div>
                </Tabs>
            </div>
        );
    }
}

export default Search;