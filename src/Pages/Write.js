import React, { Component } from 'react';
import { ActivityIndicator, Button, Icon,  NavBar, TextareaItem, Toast } from 'antd-mobile';
import { createPost } from '../utils/APIUtils';
import { uploadVideo, uploadImage } from '../utils/upload-s3';
import './Write.css';

/**
 * Component Write
 * 
 */
class Write extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            uploading: false,
        }
    }

    onChangeContent = (e) => {
        this.setState({
            content: e
        })
    };

    submit = async () => {
        // e.preventDefault();

        this.setState({
            uploading: true
        });

        if(!this.props.selectedFile) {
            Toast.error("선택한 영상이 올바르지 않았습니다. 처음부터 다시 시도해 주세요", 1);
        }

        const videoSrc = await uploadVideo(this.props.selectedFile, this.props.currentUser.id);
        
        console.log(videoSrc);

        if(!videoSrc) {
            Toast.error("영상 업로드 실패!", 1);
            return;
        } 

        if(!this.props.thumbnail) {
            Toast.error("썸네일이 올바르지 않았습니다. 처음부터 다시 시도해 주세요", 1);
        }
        const thumbnailSrc = await uploadImage(this.props.thumbnail, this.props.currentUser.id);

        console.log(thumbnailSrc);

        if(!thumbnailSrc) {
            Toast.error("이미지 업로드 실패!", 1);
            return;
        }

        const postRequest = Object.assign({}, {
            "videoSrc": videoSrc,
            "thumbnailSrc": thumbnailSrc,
            "content": this.state.content
        });
    
        await createPost(postRequest);

        this.setState({
            uploading: false
        });

        this.props.history.push("/");
        Toast.success("작성 성공!", 2);

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
                    <Button className="write-button" type="warning" onClick={this.submit}>게시</Button>
                </div>
                <div className="write-upload-indicator">
                    <ActivityIndicator
                        toast
                        text="Uploading..."
                        animating={this.state.uploading}
                    />
                </div>
              />

            </div>
        );
    }
}

export default Write;