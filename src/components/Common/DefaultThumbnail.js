import React from "react";
import "./DefaultThumbnail.css";

// 첫 번쨰 글자를 사용한 google식 기본 썸네일
function DefaultThumbnail(props) {
  return (
    <div className="default-thumbnail" style={props.style}>
      <div className="default-thumbnail-name">
        {props.name ? props.name.charAt(0) : ""}
      </div>
    </div>
  );
}

export default DefaultThumbnail;
