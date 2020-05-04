import React, { useEffect, useRef } from "react";
import videojs from "video.js";

import { VIDEO_SRC } from "utils/constants";
import "video.js/dist/video-js.css";

function VideoPlayer({ videoSrc, playing }) {
  const options = {
    loop: true,
    preload: "auto",
    sources: [
      {
        src: VIDEO_SRC + videoSrc,
        type: "video/mp4",
      },
    ],
  };
  const ref = useRef();
  let player;
  useEffect(() => {
    player = videojs(ref.current, options, function onPlayerReady() {});
  }, []);

  useEffect(() => {
    if (playing) ref.current.play();
    else ref.current.pause();
  }, [playing]);

  function onClick() {
    if (ref.current.paused) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }

  return (
    <div
      data-vjs-player="true"
      style={{ width: "100%", height: "100%" }}
      onClick={onClick}
      onTouchStart={onClick}
    >
      <video ref={ref} className="video-js" />
    </div>
  );
}

export default VideoPlayer;
