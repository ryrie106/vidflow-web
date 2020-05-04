import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedTab: "hometab",
  signInModal: false,
  shareModal: false,
  commentsModal: false,
};

const metaSlice = createSlice({
  name: "meta",
  initialState,
  reducers: {
    setSelectedTab(state, action) {
      state.selectedTab = action.payload;
    },
    openSignInModal(state) {
      state.signInModal = true;
    },
    closeSignInModal(state) {
      state.signInModal = false;
    },
    openShareModal(state) {
      state.shareModal = true;
    },
    closeShareModal(state) {
      state.shareModal = false;
    },
    openCommentsModal(state) {
      state.commentsModal = true;
    },
    closeCommentsModal(state) {
      state.commentsModal = false;
    }
  },
});

export const { 
  setSelectedTab,
  openSignInModal,
  closeSignInModal,
  openShareModal,
  closeShareModal,
  openCommentsModal,
  closeCommentsModal
 } = metaSlice.actions;

export default metaSlice.reducer;
