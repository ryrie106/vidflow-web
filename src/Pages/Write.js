import React, { Component } from 'react';
import { Button, Icon,  NavBar, TextareaItem, Toast } from 'antd-mobile';
import { createPost } from '../utils/APIUtils';
import './Write.css';

class Write extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: '',
            videoSrc: '',
            thumbnailSrc: '',
            currentChunk: 0,
            numChunks: 0,
            progress: 0,
        }
    }

    onChangeContent = (e) => {
        this.setState({
            content: e
        })
    };

    // src는 파일을 
    submitFile = (file, src) => () => {

    };

    afterSubmit = () => {
        const postRequest = Object.assign({}, {
            "videoSrc": this.state.videoSrc,
            "thumbnailSrc": this.state.thumbnailSrc,
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
    };

    render() {
        return (
            <div className="write">
                <NavBar
                    id="write-navbar"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.push("/videoedit")}

                >게시</NavBar>

                <div className="write-content-preview">
                    <TextareaItem
                        className="write-content"
                        onChange={this.onChangeContent}
                        placeholder="동영상을 설명하세요"
                        rows={4}
                        count={50}/>
                    <div className="write-preview" >
                        <img src={this.props.preview} style={{width: "100%", height: "100%"}} alt="preview" />
                    </div>
                </div>

                <div className="write-options">

                </div>

                <div className="write-buttons">
                    <Button className="write-button">임시 저장</Button>
                    <Button className="write-button" type="warning" onClick={this.submitFile}>게시</Button>
                </div>

            </div>
        );
    }
}

export default Write;