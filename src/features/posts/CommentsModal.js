import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { InputItem, Toast, Modal } from "antd-mobile";
import { FaPaperPlane } from "react-icons/fa";
import Comment from "./Comment";

import { openSignInModal, closeCommentsModal } from "features/meta/metaSlice";
import { refreshCurrentPost } from "features/posts/postsSlice";
import { fetchComments, submitComment } from "features/posts/commentsSlice";
import "./CommentsModal.css";

function CommentsModal() {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.auth);
  const { currentPostId } = useSelector((state) => state.posts);
  const { commentsModal } = useSelector((state) => state.meta);
  const { comments } = useSelector((state) => {
    return {
      comments: state.comments.CommentsByPostId[currentPostId],
    };
  });

  useEffect(() => {
    if(commentsModal) {
      refreshComment();
    }
  }, [commentsModal]);

  function refreshComment() {
    dispatch(fetchComments(currentPostId));
  }

  function deleteComment(commentid) {
    return async () => {
      await deleteComment(commentid);
      await refreshComment();
    };
  }

  function onSubmit() {
    if (account.id === 0) {
      dispatch(openSignInModal());
      return;
    }
    const request = {
      content: content,
    };
    try {
      dispatch(submitComment(currentPostId, request));
    } catch (err) {
      Toast.fail("댓글달기 실패", 1);
    }
  }

  const commentList = comments ? comments.map((comment) => (
    <div key={comment.id}>
      <Comment comment={comment} deleteComment={deleteComment} />
    </div>
  )) : [];

  return (
    <Modal
      popup
      visible={commentsModal}
      onClose={() => dispatch(closeCommentsModal())}
      animationType="slide-up"
      afterClose={refreshCurrentPost}
    >
      <div className="commentlist">
        <div className="commentlist-header">
          <div className="commentlist-counter">댓글 {commentList.length}개</div>
          <div className="commentlist-close" onClick={() => dispatch(closeCommentsModal())}>
            X
          </div>
        </div>
        <div className="commentlist-list">{commentList}</div>
        <div className="commentlist-writer">
          <InputItem
            className="commentlist-writer-content"
            onChange={(e) => setContent(e)}
            placeholder="댓글 추가"
          />
          <div className="commentlist-writer-button">
            <FaPaperPlane
              className="commentlist-writer-pic"
              onClick={onSubmit}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default CommentsModal;
