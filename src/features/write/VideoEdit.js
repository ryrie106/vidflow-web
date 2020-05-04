import React, { Component } from 'react';
import { Icon, NavBar, Button, Toast } from 'antd-mobile';

import './VideoEdit.css';

class VideoEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fileName: '',
        };
        this.videoRef = React.createRef();
        this.canvasRef = React.createRef();
        this.canvasCtx = null;
    }

    componentDidMount() {
        Toast.info("업로드할 영상을 선택하고 다음 버튼을 누르세요 아직 편집은 지원하지 않습니다.", 3);
    }

    onLoadedData = (e) => {
        e.target.play();
    };

    // 영상 시작/중지 토글
    togglePlay = () => {
        if(this.videoRef.current.paused){
            this.videoRef.current.play();
        }else{
            this.videoRef.current.pause();
        }
    };

    onLoadedMetadata = () => {
        this.canvasRef.current.width = window.innerWidth;
        this.canvasRef.current.height = window.innerHeight;
        this.canvasCtx = this.canvasRef.current.getContext("2d");
    };

    // 비디오 파일을 탐색기에서 선택하면 호출
    onChangeVideoSelector = (e) => {
        let fileInput = e.target;
		let fileUrl = window.URL.createObjectURL(fileInput.files[0]);
		this.setState({
            fileName: fileInput.files[0].name,
        });
        this.props.onChangeVideoSelector(fileInput.files[0]);
        this.videoRef.current.src = fileUrl;
    };

    onClickNext = () => {
        if(this.state.fileName) {
            this.canvasCtx.drawImage(this.videoRef.current, 0, 0,
                window.innerWidth, window.innerHeight);
            // write의 preview에 설정함.
            this.props.setPreview(this.canvasRef.current.toDataURL());
            // Base64 to Blob
            fetch(this.canvasRef.current.toDataURL())
                .then(res => res.blob())
                .then(blob => {
                    blob.lastModifiedDate = new Date();
                    blob.name = "thumbnail.png";
                    this.props.setThumbnail(blob);
                });
            // this.props.setThumbnail(this.canvasRef.current.toDataURL());
            this.props.history.push("/write");
        } else {
            Toast.info("영상을 선택해주세요.", 1);
        }
    };

    render() {
        return (
            <div className="video-edit">
                <NavBar
                    id="video-edit-navbar"
                    icon={<Icon type="left" />}
                    mode="light"
                    onLeftClick={() => this.props.history.push("/")}
                    rightContent={[
                        <Button key="video-edit-next" size="small" type="warning" onClick={this.onClickNext}>
                            다음
                        </Button>
                    ]}
                />
                <video id="video-edit-preview"
                    loop 
                    onLoadedMetadata={this.onLoadedMetadata}
                    onLoadedData={this.onLoadedData}
                    onClick={this.togglePlay}
                    ref={this.videoRef} />
                <canvas id="video-edit-canvas" ref={this.canvasRef}/>
                <div id="video-edit-selector">
                    <input type="file" accept="video/mp4"
                    onChange={this.onChangeVideoSelector}/>
                </div>
            </div>
        );
    }
}

export default VideoEdit;