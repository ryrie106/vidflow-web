import React, { useEffect, useRef, useState } from "react";
import { Icon, NavBar, Button, Toast } from "antd-mobile";
import { useHistory } from "react-router";

import "./VideoEdit.css";

function VideoEdit(props) {

  const { setSelectedFile, setThumbnail, setPreview, gotoWrite } = props;

  let history = useHistory();
  const [fileName, setFileName] = useState("");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  let canvasCtx = undefined;

  useEffect(() => {
    Toast.info(
      "업로드할 영상을 선택하고 다음 버튼을 누르세요 아직 편집은 지원하지 않습니다.",
      3
    );
  }, []);

  function onLoadedData(e) {
    e.target.play();
  }

  // 영상 시작/중지 토글
  function togglePlay() {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }

  function onLoadedMetadata() {
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;
    canvasCtx = canvasRef.current.getContext("2d");
  }

  // 비디오 파일을 탐색기에서 선택하면 호출
  function onChangeVideoSelector(e) {
    const fileInput = e.target;
    const fileUrl = window.URL.createObjectURL(fileInput.files[0]);
    setFileName(fileInput.files[0].name);
    setSelectedFile(fileInput.files[0]);
    videoRef.current.src = fileUrl;
  }

  function onClickNext() {
    if (fileName) {
      canvasCtx.drawImage(
        videoRef.current,
        0,
        0,
        window.innerWidth,
        window.innerHeight
      );
      // write의 preview에 설정함.
      setPreview(canvasRef.current.toDataURL());
      // Base64 to Blob
      fetch(canvasRef.current.toDataURL())
        .then((res) => res.blob())
        .then((blob) => {
          blob.lastModifiedDate = new Date();
          blob.name = "thumbnail.png";
          setThumbnail(blob);
        });
      // this.props.setThumbnail(this.canvasRef.current.toDataURL());
      gotoWrite();
    } else {
      Toast.info("영상을 선택해주세요.", 1);
    }
  }

  return (
    <>
      <NavBar
        id="video-edit-navbar"
        icon={<Icon type="left" />}
        mode="light"
        onLeftClick={() => history.push("/")}
        rightContent={[
          <Button
            key="video-edit-next"
            size="small"
            type="warning"
            onClick={onClickNext}
          >
            다음
          </Button>,
        ]}
      />
      <video
        id="video-edit-preview"
        loop
        onLoadedMetadata={onLoadedMetadata}
        onLoadedData={onLoadedData}
        onClick={togglePlay}
        ref={videoRef}
      />
      <canvas id="video-edit-canvas" ref={canvasRef} />
      <div id="video-edit-selector">
        <input
          type="file"
          accept="video/mp4"
          onChange={onChangeVideoSelector}
        />
      </div>
    </>
  );
}

export default VideoEdit;
