import React from "react";
import {
  FaPlusCircle,
  FaHeart,
  FaShareAlt,
  FaCommentDots,
  FaEllipsisH,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

import { likePost, unlikePost } from "utils/APIUtils";
import {
  openSignInModal,
  openShareModal,
  openCommentsModal,
} from "features/meta/metaSlice";
import { refreshCurrentPost } from "features/posts/postsSlice";
import { useSelector, useDispatch } from "react-redux";
import "./Icons.css";

function Icons({ postId, postWriterId, numComment, numLike, isLiked }) {
  const { account } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const myPost = postWriterId === account.id;
  function like() {
    if (account.id === 0) {
      openSignInModal();
    } else {
      // likePost 요청을 보낸 후 Home에 있는 refreshPost() 를 호출하여 Post의 state를 갱신한다.
      likePost(postId).then(refreshCurrentPost());
    }
  }

  function unlike() {
    if (account.id === 0) {
      openSignInModal();
    } else {
      // unlikePost 요청을 보낸 후 Home에 있는 refreshPost() 를 호출하여 Post의 state를 갱신한다.
      unlikePost(postId).then(refreshCurrentPost());
    }
  }

  return (
    <div className="icons">
      <div className="follow-button">
        <NavLink className="icons-pic" to={`/user/${postWriterId}`}>
          <FaPlusCircle className="icons-pic" />
        </NavLink>
      </div>
      <div className="like-button">
        {isLiked ? (
          <FaHeart
            className="icons-pic"
            style={{ color: "red" }}
            onClick={unlike}
          />
        ) : (
          <FaHeart className="icons-pic" onClick={like} />
        )}
        {numLike}
      </div>
      <div className="comment-button" onClick={() => dispatch(openCommentsModal())}>
        <FaCommentDots className="icons-pic" />
        {numComment}
      </div>
      {myPost ? (
        <div className="my-share-button" onClick={() => dispatch(openShareModal())}>
          <FaEllipsisH className="icons-pic" />
        </div>
      ) : (
        <div className="share-button" onClick={() => dispatch(openShareModal())}>
          <FaShareAlt className="icons-pic" />
        </div>
      )}
    </div>
  );
}

export default Icons;
