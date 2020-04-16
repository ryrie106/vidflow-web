import { createSlice } from '@reduxjs/toolkit';

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    nextPostId: -1,
    
  },
  reducers: {
    
  }
});

export default postsSlice.reducer;