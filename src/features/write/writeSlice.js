import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedFile: null,
  preview: null,
  thumbnail: null
}

const authSlice = createSlice({
  name: "write",
  initialState,
  reducers: {

  }
});

export const loadUser = () => async (dispatch) => {
  try {

  } catch(err) {

  }
};

export default authSlice.reducer;