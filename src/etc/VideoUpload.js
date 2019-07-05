import React, { Component } from 'react';
import { Progress, Toast } from 'antd-mobile';

const CHUNK_SIZE = 1024 * 1024; // 1MB

class VideoUpload extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            videoFile: undefined,
            uploadAvailable: true,
            currentChunk: 0,
            numChunks: 0,
            progress: 0
        }
    }

    componentDidMount() {
        document.getElementById("video").addEventListener('change', e => {
            this.fileSelector(e);
        })
    }

    fileSelector = e => {
        if(this.state.uploadAvailable) {
            if(e.target.files[0] != null) {
                this.setState({
                    videoFile: e.target.files[0],
                    numChunks: Math.ceil(e.target.files[0].size / CHUNK_SIZE)
                });
            } else {
                console.log("Video Not Selected");
            }
        } else {
                Toast.info("업로드 중인 파일이 있습니다.", 1);
        }
    }

    uploadVideo = () => {
        if(this.state.videoFile && this.state.uploadAvailable) {
            this.setState({
                uploadAvailable: false
            });

            const ws = new WebSocket("ws://localhost:8080/videoUpload")
            this.setState({
                currentChunk: 0
            })
            ws.binaryType = "arraybuffer";

            ws.onopen = (e) => {
                console.log('Connected: ' + e);
                let sendmsg = {
                    type: "VIDEOFILE_INFO",
                    userid: this.props.currentUser.id,
                    fileSize:  this.state.videoFile.size,
                    numChunks: this.state.numChunks,
                    extension: this.state.videoFile.name.split(".").pop().toLowerCase()
                }
                ws.send(JSON.stringify(sendmsg));
            }

            ws.onmessage = (e) => {

                if(e.data instanceof ArrayBuffer) { 
                    // TODO: Text 메시지가 온 다음 왜 ArrayBuffer 메시지가 오는거지?
                    console.log("Array");}
                else {
                console.log(e);
                const msg = JSON.parse(e.data);
                let sendmsg;
                let senddata;
                switch(msg.type) {
                    case "TRANSFER_START":
                        senddata = this.state.videoFile.slice(this.state.currentChunk * CHUNK_SIZE,
                            Math.min((this.state.currentChunk + 1) * CHUNK_SIZE, this.state.videoFile.size));     
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
                        senddata = this.state.videoFile.slice(this.state.currentChunk * CHUNK_SIZE,
                            Math.min((this.state.currentChunk + 1) * CHUNK_SIZE, this.state.videoFile.size));     
                            console.log(this.state.currentChunk + "/" + this.state.numChunks + " transfered");
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
                        this.props.setVideosrc(msg.fileName);
                        this.setState({
                            numChunks: 0,
                            currentChunk: 0,
                            uploadAvailable: true
                        })
                        Toast.info("파일 전송 완료");                            
                        break;
                    default:
                        break;
                }
                }
                
            }

        }
    }

    render() {
        return (
            <div>
                <input id="video" type="file" accept="video/*" />
                <button id="file-upload" onClick={this.uploadVideo}>업로드</button>
                <Progress percent={this.state.progress} position="normal" unfilled={false} appearTransition />
            </div>
        );
    }
}

export default VideoUpload;