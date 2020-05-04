import { combineReducers } from "redux";
import commentsReducer from "features/posts/commentsSlice";
import postsReducer from "features/posts/postsSlice";
import authReducer from "features/auth/authSlice";
import metaReducer from "features/meta/metaSlice";
import writeReducer from "features/write/writeSlice";
import userReducer from "features/user/userSlice";

export default combineReducers({
  comments: commentsReducer,
  posts: postsReducer,
  auth: authReducer,
  meta: metaReducer,
  write: writeReducer,
  user: userReducer,
});
