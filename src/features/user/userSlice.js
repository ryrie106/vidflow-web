import { createSlice } from "@reduxjs/toolkit";
import { getUserInfo, getUserPosts, getUserLikes, followUser, unfollowUser } from "utils/APIUtils";

/**
 * 유저 정보는 userInfoId에 의존합니다.
 *  */ 
const initialState = {
  userInfoId: 0,
  following: false,
  followPending: false,
  followError: null,
  
  userInfo: {
    name: "",
    introduction: "",
    numLikes: 0,
    numFollowing: 0,
    numFollower: 0,
  },
  loadingInfo: false,
  loadingInfoError: null,

  userPosts: [],
  getUserPostsPending: false,
  getUserPostsError: null,

  userLikes: [],
  getUserLikesPending: false,
  getUserLikesError: null, 
  
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfoId(state, action) {
      state.userInfoId = action.payload;
    },
    getUserInfoStart(state) {
      state.loadingInfo = true;
      state.loadingInfoError = null;
    },
    getUserInfoSuccess(state, action) {
      state.userInfo = action.payload;
      state.loadingInfo = false;
      state.loadingInfoError = null;
    },
    getUserInfoFailure(state, action) {
      state.loadingInfo = false;
      state.loadingInfoError = action.payload;
    },
    getUserPostsStart(state) {
      state.getUserPostsPending = true;
      state.getUserPostsError = null;
    },
    getUserPostsSuccess(state, action) {
      state.getUserPostsPending = false;
      state.getUserPostsError = null;
      state.userPosts = action.payload;
    },
    getUserPostsFailure(state, action) {
      state.getUserPostsPending = false;
      state.getUserPostsError = action.payload;
    },
    getUserLikesStart(state) {
      state.getUserLikesPending = true;
      state.getUserLikesError = null;
    },
    getUserLikesSuccess(state, action) {
      state.getUserLikesPending = false;
      state.getUserLikesError = null;
      state.userLikes = action.payload;
    },
    getUserLikesFailure(state, action) {
      state.getUserLikesPending = true;
      state.getUserLikesError = action.payload;
    },
    followUserStart(state) {
      state.followPending = true;
      state.followError = null;
    },
    followUserSuccess(state) {
      state.followPending = false;
      state.followError = null;
    },
    followUserFailure(state, action) {
      state.followPending = false;
      state.followError = action.payload;
    },
    unfollowUserStart(state, action) {
      state.followPending = true;
      state.followError = null;
    },
    unfollowUserSuccess(state, action) {
      state.followPending = false;
      state.followError = null;
    },
    unfollowUserFailure(state, action) {
      state.followPending = false;
      state.followError = action.payload;
    },
  },
});

export const {
  setUserInfoId,
  getUserInfoStart,
  getUserInfoSuccess,
  getUserInfoFailure,
  getUserPostsStart,
  getUserPostsSuccess,
  getUserPostsFailure,
  getUserLikesStart,
  getUserLikesSuccess,
  getUserLikesFailure,
  followUserStart,
  followUserSuccess,
  followUserFailure,
  unfollowUserStart,
  unfollowUserSuccess,
  unfollowUserFailure,
} = userSlice.actions;

export default userSlice.reducer;

export const fetchUserInfo = (userId) => async (dispatch) => {
  try {
    dispatch(getUserInfoStart());
    const response = await getUserInfo(userId);
    dispatch(getUserInfoSuccess(response));
  } catch (err) {
    dispatch(getUserInfoFailure(err.toString()));
  }
};

export const fetchUserPosts = (userId) => async (dispatch) => {
  try {
    dispatch(getUserPostsStart());
    const response = await getUserPosts(userId);
    dispatch(getUserPostsSuccess(response));
  } catch (err) {
    dispatch(getUserPostsFailure(err.toString()));
  }
};

export const fetchUserLikes = (userId) => async (dispatch) => {
  try {
    dispatch(getUserLikesStart());
    const response = await getUserLikes(userId);
    dispatch(getUserLikesSuccess(response));
  } catch (err) {
    dispatch(getUserLikesFailure(err.toString()));
  }
};


export const follow = (userId) => async (dispatch) => {
  try {
    dispatch(followUserStart());
    const response = await followUser(userId);
    dispatch(followUserSuccess(response));
  } catch (err) {
    dispatch(followUserFailure(err.toString()));
  }
};

export const unfollow = (userId) => async (dispatch) => {
  try {
    dispatch(unfollowUserStart());
    const response = await unfollowUser(userId);
    dispatch(unfollowUserSuccess(response));
  } catch (err) {
    dispatch(unfollowUserFailure(err.toString()));
  }
};
