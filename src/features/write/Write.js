import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  Icon,
  NavBar,
  TextareaItem,
  Toast,
} from "antd-mobile";
import {
  createPost,
  uploadFileRequest,
  putFilesToPresignedURL,
} from "utils/APIUtils";
import "./Write.css";

function Write(props) {

  const { selectedFile, thumbnail, preview, gotoEdit } = props;

  const [content, setContent] = useState("");
  const [uploading, setUploading] = useState(false);

  async function submit() {
    if(uploading) return;
    setUploading(true);
    // video 업로드
    let videoId;
    try {
      const videoInfo = await uploadFileRequest("video");
      if (!videoInfo) throw new Error();
      videoId = videoInfo.fileId;
      await putFilesToPresignedURL(videoInfo.url, selectedFile);
    } catch (err) {
      setUploading(false);
      console.log("영상 업로드 실패");
      return;
    }

    // thumbnail 업로드
    let thumbnailId;
    try {
      const thumbnailInfo = await uploadFileRequest("image");
      thumbnailId = thumbnailInfo.fileId;
      console.log(thumbnailId);
      await putFilesToPresignedURL(thumbnailInfo.url, thumbnail);
    } catch (err) {
      setUploading(false);
      console.log("썸네일 업로드 실패");
      return;
    }
    // TODO: ...Src를 ...Id로 바꿔야 하지만 API 서버의 많은 부분을 변경 해야 한다.
    const postRequest = Object.assign(
      {},
      {
        videoSrc: videoId,
        thumbnailSrc: thumbnailId,
        content: content,
      }
    );

    await createPost(postRequest);

    setUploading(false);
    props.history.push("/");
    Toast.success("작성 성공!", 2);
  }

  return (
    <>
      <NavBar
        id="write-navbar"
        icon={<Icon type="left" />}
        onLeftClick={() => props.history.push("/videoedit")}
      >
        게시
      </NavBar>
      <div className="write-content-preview">
        <TextareaItem
          className="write-content"
          onChange={e => setContent(e)}
          placeholder="동영상을 설명하세요"
          rows={4}
          count={50}
        />
        <div className="write-preview">
          <img
            src={props.preview}
            style={{ width: "100%", height: "100%" }}
            alt="preview"
          />
        </div>
      </div>
      <div className="write-options"></div>
      <div className="write-buttons">
        <Button className="write-button">임시 저장</Button>
        <Button className="write-button" type="warning" onClick={submit}>
          게시
        </Button>
      </div>
      <div className="write-upload-indicator">
        <ActivityIndicator toast text="Uploading..." animating={uploading} />
      </div>
    </>
  );
}

export default Write;
