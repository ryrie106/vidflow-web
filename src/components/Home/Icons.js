import React from "react";
import {
  FaPlusCircle,
  FaHeart,
  FaShareAlt,
  FaCommentDots,
  FaEllipsisH
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

import { likePost, unlikePost } from "../../utils/APIUtils";
import "./Icons.css";

function Icons(props) {
  const like = () => {
    if (props.currentUser.id === 0) {
      props.showLoginModal();
    } else {
      // likePost 요청을 보낸 후 Home에 있는 refreshPost() 를 호출하여 Post의 state를 갱신한다.
      likePost(props.postId).then(props.refreshPost);
    }
  };

  const unlike = () => {
    if (props.currentUser.id === 0) {
      props.showLoginModal();
    } else {
      // unlikePost 요청을 보낸 후 Home에 있는 refreshPost() 를 호출하여 Post의 state를 갱신한다.
      unlikePost(props.postId).then(props.refreshPost);
    }
  };

  return (
    <div className="icons">
      <div className="follow-button">
        <NavLink className="icons-pic" to={`/user/${props.postWriterId}`}>
          <FaPlusCircle className="icons-pic" />
        </NavLink>
      </div>
      <div className="like-button">
        {props.isLiked ? (
          <FaHeart
            className="icons-pic"
            style={{ color: "red" }}
            onClick={unlike}
          />
        ) : (
          <FaHeart className="icons-pic" onClick={like} />
        )}
        {props.numLike}
      </div>
      <div
        className="comment-button"
        onClick={props.showModal("commentModal")}
      >
        <FaCommentDots className="icons-pic" />
        {props.numComment}
      </div>
      {props.myPost ? (
        <div
          className="my-share-button"
          onClick={props.showModal("shareModal")}
        >
          <FaEllipsisH className="icons-pic" />
        </div>
      ) : (
        <div
          className="share-button"
          onClick={props.showModal("shareModal")}
        >
          <FaShareAlt className="icons-pic" />
        </div>
      )}
    </div>
  );
}

export default Icons;
