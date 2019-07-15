import React, { Component } from 'react';
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
        return (
            <div className="search">
                검색
            </div>
        );
    }
}

export default Search;