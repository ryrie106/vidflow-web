import React from "react";
import { TextareaItem } from "antd-mobile";
import "./PostContent.css";

function PostContent(props) {
  return (
    <div className="post-content">
      <div className="writer">@{props.writer}</div>
      <TextareaItem
        className="content"
        value={props.content}
        rows={4}
        editable={false}
      />
    </div>
  );
}

export default PostContent;
