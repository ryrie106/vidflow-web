import React, { Component } from 'react';
import { Button, Icon,  NavBar, TextareaItem, Toast } from 'antd-mobile';
import { createPost } from '../utils/APIUtils';
import './Write.css';

class Write extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: ''
        }
    }

    onChangeContent = (e) => {
        this.setState({
            content: e
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const postRequest = Object.assign({}, {
            "video": this.props.selectedFile,
            "content": this.state.content
        });
        createPost(postRequest)
        .then(response => {
            // message에 따른 처리
            this.props.history.push("/");
            Toast.success("작성 성공!", 2)
        }).catch(error => {
            Toast.error("작성 실패!", 1);
        })
    }

    render() {
        return (
            <div className="write">
                <NavBar
                    className="write-navbar"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.push("/videoedit")}

                >게시</NavBar>                
                
                <div className="write-content-preview">
                    <TextareaItem
                        onChange={this.onChangeContent}
                        placeholder="동영상을 설명하세요"
                        rows={4}/>
                    <div className="write-preview" />
                </div>
                
                <div className="write-options">

                </div>

                <div className="write-buttons">
                    <Button style={{flexGrow:"1"}}>임시 저장</Button>
                    <Button style={{flexGrow:"1"}}type="warning" onClick={this.onSubmit}>게시</Button>
                </div>                
                
            </div>
        );
    }
}

export default Write;