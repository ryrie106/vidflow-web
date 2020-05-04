import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Comment.css";

function Comment(props) {
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.auth);
  return (
    <div className="comment">
      <div className="comment-thumbnail">
        <div className="comment-thumbnail-name">
          {props.comment.writername.charAt(0)}
        </div>
      </div>
      <div className="comment-info">
        <div className="comment-writername">{props.comment.writername}</div>
        <div className="comment-content">{props.comment.content}</div>
        <div className="comment-regdate">
          {props.comment.regdate}
          {account.id === props.comment.writerid ? (
            <div
              className="comment-remove"
              // TODO: 
              onClick={() => {}}
            >
              삭제
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Comment;
