import { createSlice } from "@reduxjs/toolkit";
import { createComment, deleteComment, getCommentsByPostId } from "utils/APIUtils";

const initialState = {
  CommentsByPostId: {},
  creating: false,
  fetching: false,
  deleting: false,
  error: null,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    fetchCommentsStart(state) {
      state.fetching = true;
      state.error = null;
    },
    fetchCommentsSuccess(state, action) {
      const { postId, response } = action.payload;
      state.fetching = false;
      state.error = null;
      state.CommentsByPostId[postId] = response;
    },
    fetchCommentsFailure(state, action) {
      state.fetching = false;
      state.error = action.payload;
    },
    createCommentStart(state) {
      state.creating = true;
      state.error = null;
    },
    createCommentSuccess(state) {
      state.creating = false;
      state.error = null;
    },
    createCommentFailure(state, action) {
      state.creating = false;
      state.error = action.payload;
    },
    deleteCommentStart(state) {
      state.deleting = true;
      state.error = null;
    },
    deleteCommentSuccess(state) {
      state.deleting = false;
      state.error = null;
    },
    deleteCommentFailure(state) {
      state.deleting = false;
      state.error = null;
    },
  },
});

export const {
  fetchCommentsStart,
  fetchCommentsSuccess,
  fetchCommentsFailure,
  createCommentStart,
  createCommentSuccess,
  createCommentFailure,
  deleteCommentStart,
  deleteCommentSuccess,
  deleteCommentFailure,
} = commentsSlice.actions;

export default commentsSlice.reducer;

export const fetchComments = (postId) => async (dispatch) => {
  try {
    dispatch(fetchCommentsStart());
    const response = await getCommentsByPostId(postId);
    dispatch(fetchCommentsSuccess({ postId, response }));
  } catch (err) {
    dispatch(fetchCommentsFailure(err.toString()));
  }
};

// TODO: 이름 고치기
export const submitComment = (postId, request) => async (dispatch) => {
  try {
    dispatch(createCommentStart());
    const response = await createComment(postId, request);
    dispatch(createCommentSuccess({ postId, response }));
  } catch (err) {
    dispatch(createCommentFailure(err.toString()));
  }
};

// TODO: 이름 고치기
export const removeComment = (postId, commentId) => async (dispatch) => {
  try {
    dispatch(deleteCommentStart());
    const response = await deleteComment(postId, commentId);
    dispatch(deleteCommentSuccess());
  } catch (err) {
    dispatch(deleteCommentFailure(err.toString()));
  }
};
