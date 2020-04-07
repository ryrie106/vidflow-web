import { combineReducers } from "redux";
import postsReducer from 'features/posts/postsSlice'

export default combineReducers({
  posts: postsReducer
});
