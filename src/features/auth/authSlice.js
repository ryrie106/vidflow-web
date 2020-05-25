import { createSlice } from "@reduxjs/toolkit";
import { signIn, signUp, getCurrentUser } from "utils/APIUtils";
import { addAccountToken, clearAccountToken } from "utils/storage";

export const initialAccount = {
  id: 0,
  email: "guest",
  name: "guest",
};

export const isGuest = (account) => {
  return account.id===0 && account.email==="guest" && account.name === "guest";
}

const initialState = {
  account: initialAccount,
  signInPending: false,
  signInError: null,
  signUpPending: false,
  signUpError: null,
  getCurrentUserPending: false,
  getCurrentUserError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInStart(state) {
      state.signInPending = true;
      state.signInError = null;
    },
    signInSuccess(state, action) {
      state.signInPending = false;
      state.signInError = null;
      addAccountToken(action.payload.message);
    },
    signInFailure(state, action) {
      state.signInPending = false;
      state.signInError = action.payload;
    },
    signUpStart(state) {
      state.signInPending = true;
      state.signInError = null;
    },
    signUpSuccess(state, action) {
      state.signInPending = false;
      state.signInError = null;
    },
    signUpFailure(state, action) {
      state.signInPending = false;
      state.signInError = action.payload;
    },
    getCurrentUserStart(state) {
      state.getCurrentUserPending = true;
      state.getCurrentUserError = null;
    },
    getCurrentUserSuccess(state, action) {
      state.getCurrentUserPending = false;
      state.getCurrentUserError = null;
      state.account = action.payload;
    },
    getCurrentUserError(state, action) {
      state.getCurrentUserPending = false;
      // state.getCurrentUserError = action.payload;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signUpStart,
  signUpSuccess,
  signUpFailure,
  getCurrentUserStart,
  getCurrentUserSuccess,
  getCurrentUserError,

} = authSlice.actions;

export const fetchSignIn = (request) => async (dispatch) => {
  try {
    dispatch(signInStart());
    const response = await signIn(request);
    dispatch(signInSuccess(response));
  } catch (err) {
    dispatch(signInFailure());
    throw new Error("fetchSignIn");
  }
};

export const signOut = () => {
  clearAccountToken();
}

export const fetchSignUp = (request) => async (dispatch) => {
  try {
    dispatch(signUpStart());
    await signUp(request);
    dispatch(signUpSuccess());
  } catch (err) {
    dispatch(signUpFailure());
    throw new Error("fetchSignUp");
  }
};

export const fetchCurrentUser = () => async (dispatch) => {
  try {
    dispatch(getCurrentUserStart());
    const response = await getCurrentUser();
    dispatch(getCurrentUserSuccess(response));
  } catch (err) {
    // TODO: 로그인한 상태가 아닌 경우와, 로그인이 정말 실패하는 경우를 구별해야 한다.
    dispatch(getCurrentUserError());
    // throw new Error("fetchCurrentUser");
  }
};

export default authSlice.reducer;
