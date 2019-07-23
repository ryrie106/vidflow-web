import React, { Component } from 'react';
import { Button, Icon,  NavBar, TextareaItem, Toast } from 'antd-mobile';
import { WEBSOCKET_VIDEOUPLOAD_URL, WEBSOCKET_VIDEOUPLOAD_CHUNKSIZE } from '../constants';
import { createPost } from '../utils/APIUtils';
import './Write.css';

class Write extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: '',
            videoSrc: '',
            uploadAvailable: true,
            currentChunk: 0,
            numChunks: 0,
            progress: 0,
        }
    }

    onChangeContent = (e) => {
        this.setState({
            content: e
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        if(!this.props.selectedFile) return;

        this.setState({
            uploadAvailable: false
        });

        const ws = new WebSocket(WEBSOCKET_VIDEOUPLOAD_URL)
        this.setState({
            currentChunk: 0,
            numChunks: Math.ceil(this.props.selectedFile.size / WEBSOCKET_VIDEOUPLOAD_CHUNKSIZE)
        })
        ws.binaryType = "arraybuffer";

        ws.onopen = (e) => {
            console.log('Connected: ' + e);
            let sendmsg = {
                type: "VIDEOFILE_INFO",
                userid: this.props.currentUser.id,
                fileSize:  this.props.selectedFile.size,
                numChunks: this.state.numChunks,
                extension: this.props.selectedFile.name.split(".").pop().toLowerCase()
            }
            ws.send(JSON.stringify(sendmsg));
        }

        ws.onmessage = (e) => {

            if(e.data instanceof ArrayBuffer) { 
                // TODO: Text 메시지가 온 다음 왜 ArrayBuffer 메시지가 오는거지?
                console.log("Array");
            }
            else {
                console.log(e);
                const msg = JSON.parse(e.data);
                let sendmsg;
                let senddata;
                switch(msg.type) {
                    case "TRANSFER_START":
                        senddata = this.props.selectedFile.slice(this.state.currentChunk * WEBSOCKET_VIDEOUPLOAD_CHUNKSIZE,
                            Math.min((this.state.currentChunk + 1) * WEBSOCKET_VIDEOUPLOAD_CHUNKSIZE, this.props.selectedFile.size));     
                        console.log(this.state.currentChunk + "/" + this.state.numChunks + " transfered");
                        this.setState({
                            currentChunk: this.state.currentChunk + 1
                        });                           
                        ws.send(senddata);
                        break;

                    case "PROGRESS_INFO":
                        // progress bar 갱신
                        this.setState({
                            progress: (this.state.currentChunk / this.state.numChunks) * 100
                        });
                        senddata = this.props.selectedFile.slice(this.state.currentChunk * WEBSOCKET_VIDEOUPLOAD_CHUNKSIZE,
                            Math.min((this.state.currentChunk + 1) * WEBSOCKET_VIDEOUPLOAD_CHUNKSIZE, this.props.selectedFile.size));     
                        Toast.loading(this.state.currentChunk / this.state.numChunks + "%");
                        this.setState({
                            currentChunk: this.state.currentChunk + 1
                        });                                 
                        ws.send(senddata); 
                        break;

                    case "TRANSFER_COMPLETE":
                        sendmsg = {
                            type: "TRANSFER_COMPLETE",
                            userid: "this.props.userid"
                        }
                        ws.send(sendmsg);
                        this.setState({
                            numChunks: 0,
                            currentChunk: 0,
                            uploadAvailable: true,
                            videoSrc: msg.fileName
                        })
                        this.submit();
                        break;
                    default:
                        break;
                }
            }
        }
    }
    submit= () => {
        const postRequest = Object.assign({}, {
            "videoSrc": this.state.videoSrc,
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
            <div classNayme="write">
                <NavBar
                    className="write-navbar"
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
                    <div className="write-preview" />
                </div>
                
                <div className="write-options">

                </div>

                <div className="write-buttons">
                    <Button className="write-button">임시 저장</Button>
                    <Button className="write-button" type="warning" onClick={this.onSubmit}>게시</Button>
                </div>                
                
            </div>
        );
    }
}

export default Write;