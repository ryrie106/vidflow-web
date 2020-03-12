import React from "react";

import Icons from "./Icons";
import PostContent from "./PostContent";
import VideoPlayer from "./VideoPlayer";
import "./Post.css";

function Post(props) {
  return (
    <div className="post">
      <VideoPlayer
        videoSrc={props.post.videosrc}
        videoRef={props.post.videoRef}
      />
      <PostContent
        writer={props.post.writername}
        content={props.post.content}
      />
      <Icons
        currentUser={props.currentUser}
        postId={props.post.id}
        postWriterId={props.post.writerid}
        showModal={props.showModal}
        showLoginModal={props.showLoginModal}
        numComment={props.post.num_comment}
        numLike={props.post.num_like}
        isLiked={props.post.isliked}
        myPost={
          props.currentUser && props.post.writerid === props.currentUser.id
        }
        refreshPost={props.refreshPost}
      />
    </div>
  );
}
export default Post;
