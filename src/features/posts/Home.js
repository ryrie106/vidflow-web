import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swiper from "react-id-swiper";
import Post from "features/posts/Post";
import {
  fetchPosts,
  nextTransition,
  prevTransition,
  playCurrentPost,
} from "features/posts/postsSlice";

import "react-id-swiper/src/styles/css/swiper.css";
import "./Home.css";

function Home() {
  const { posts, postIndex, nextPostId } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    if(postIndex + 3 > posts.length) {
      dispatch(fetchPosts(nextPostId));
    }
  }, [postIndex]);

  useEffect(() => {
    // dispatch(playCurrentPost());
  }, []);

  // react-id-swiper의 Swiper Component에 전달할 parameter이다.
  const params = {
    direction: "vertical",
    shouldSwiperUpdate: true,
    on: {
      slideNextTransitionEnd: () => {
        dispatch(nextTransition());
      },
      slidePrevTransitionEnd: () => {
        dispatch(prevTransition());
      },
    },
  };

  const postList = posts.map((post) => (
    <div key={post.id}>
      <Post post={post} />
    </div>
  ));

  return (
    <div className="main-tab" id="home">
      <Swiper {...params}>{postList}</Swiper>
    </div>
  );
}

export default Home;
