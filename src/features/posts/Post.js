import React from "react";

import Icons from "./Icons";
import PostContent from "./PostContent";
import VideoPlayer from "./VideoPlayer";
import "./Post.css";

function Post({ post }) {
  return (
    <div className="post">
      <VideoPlayer videoSrc={post.videosrc} playing={post.playing} />
      <PostContent writer={post.writername} content={post.content} />
      <Icons
        postId={post.id}
        postWriterId={post.writerid}
        numComment={post.num_comment}
        numLike={post.num_like}
        isLiked={post.isliked}
      />
    </div>
  );
}
export default Post;
