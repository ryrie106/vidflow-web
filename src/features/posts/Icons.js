import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  FaPlusCircle,
  FaHeart,
  FaShareAlt,
  FaCommentDots,
  FaEllipsisH,
} from "react-icons/fa";
import {
  openSignInModal,
  openShareModal,
  openCommentsModal,
} from "features/meta/metaSlice";
import { isGuest } from "features/auth/authSlice";
import { refreshCurrentPost } from "features/posts/postsSlice";
import "./Icons.css";

function Icons({ postId, postWriterId, numComment, numLike, isLiked }) {
  const { account } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const myPost = postWriterId === account.id;

  // TODO: 
  function likePost() {}
  function unlikePost() {}

  async function like() {
    if (isGuest(account)) {
      openSignInModal();
    } else {
      await dispatch(() => likePost(postId));
      await dispatch(refreshCurrentPost);
    }
  }

  async function unlike() {
    if (isGuest(account)) {
      openSignInModal();
    } else {
      await dispatch(() => unlikePost(postId));
      await dispatch(refreshCurrentPost);
    }
  }

  let likeButton;
  if (isLiked) {
    likeButton = (
      <FaHeart
        className="icons-pic"
        style={{ color: "red" }}
        onClick={unlike}
      />
    );
  } else {
    likeButton = <FaHeart className="icons-pic" onClick={like} />;
  }

  let shareButton;
  if (myPost) {
    shareButton = <FaEllipsisH className="icons-pic" />;
  } else {
    shareButton = <FaShareAlt className="icons-pic" />;
  }

  return (
    <div className="icons">
      <div className="follow-button">
        <NavLink className="icons-pic" to={`/user/${postWriterId}`}>
          <FaPlusCircle className="icons-pic" />
        </NavLink>
      </div>
      <div className="like-button">
        {likeButton}
        {numLike}
      </div>
      <div
        className="comment-button"
        onClick={() => dispatch(openCommentsModal())}
      >
        <FaCommentDots className="icons-pic" />
        {numComment}
      </div>
      <div className="share-button" onClick={() => dispatch(openShareModal())}>
        {shareButton}
      </div>
    </div>
  );
}

export default Icons;
