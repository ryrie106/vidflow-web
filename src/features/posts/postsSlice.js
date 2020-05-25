import { createSlice } from "@reduxjs/toolkit";
import { getPosts, getPostById } from "utils/APIUtils";

const initialState = {
  posts: [],
  nextPostId: -1,
  postIndex: 0,
  currentPostId: 0,
  currentPostWriterId: 0,
  loading: false,
  error: null,
  commentModal: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    fetchPostsStart(state, action) {
      state.loading = true;
      state.error = null;
    },
    fetchPostsSuccess(state, action) {
      const response = action.payload;
      if (response.length !== 0) {
        state.posts = [...state.posts, ...response];
        state.nextPostId = response[response.length - 1].id - 1;
        state.currentPostId = state.posts[state.postIndex].id;
        state.currentPostWriterId = state.posts[state.postIndex].writerid;
      }
      state.loading = false;
      state.error = null;
    },
    fetchPostsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    refreshCurrentPostStart(state, action) {},
    refreshCurrentPostSuccess(state, action) {
      const response = action.payload;
      const id = state.postIndex;
      state.posts[id].num_like = response.num_like;
      state.posts[id].num_comment = response.num_comment;
      state.posts[id].isliked = response.isliked;
    },
    refreshCurrentPostError(state, action) {},
    nextTransition(state) {
      const id = state.postIndex;
      if (id < state.posts.length - 1) {
        state.postIndex = id + 1;
        state.currentPostId = state.posts[id + 1].id;
        state.currentPostWriterId = state.posts[id + 1].writerid;
        state.posts[id].playing = false;
        state.posts[id + 1].playing = true;
      }
    },
    prevTransition(state) {
      const id = state.postIndex;
      if (id > 0) {
        state.postIndex = id - 1;
        state.currentPostId = state.posts[id - 1].id;
        state.currentPostWriterId = state.posts[id - 1].writerid;
        state.posts[id].playing = false;
        state.posts[id - 1].playing = true;
      }
    },
    playCurrentPost(state) {
      console.log(state.posts);
      state.posts[state.postIndex].playing = true;
    },
    pauseCurrentPost(state) {
      state.posts[state.postIndex].playing = false;
    },
  },
});

export const {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
  refreshCurrentPostStart,
  refreshCurrentPostSuccess,
  refreshCurrentPostError,
  nextTransition,
  prevTransition,
  playCurrentPost,
  pauseCurrentPost,
} = postsSlice.actions;

export default postsSlice.reducer;

export const fetchPosts = (nextPostId) => async (dispatch) => {
  try {
    dispatch(fetchPostsStart());
    let response = await getPosts(nextPostId);
    response.map((r) => (r.playing = false));
    dispatch(fetchPostsSuccess(response));
  } catch (err) {
    dispatch(fetchPostsFailure(err.toString()));
  }
};

export const refreshCurrentPost = (postId) => async (dispatch) => {
  try {
    dispatch(refreshCurrentPostStart());
    const response = await getPostById(postId);
    dispatch(refreshCurrentPostSuccess(response));
  } catch (err) {
    dispatch(refreshCurrentPostError());
  }
};
