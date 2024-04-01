import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",

  initialState: {
    currentUser: "Zaryab",
    isFetching: false,
    error: false,
  },

  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      (state.isFetching = false), (state.currentUser = action.payload);
    },
    loginFailture: (state) => {
      state.error = true;
    },

    signOut: (state) => {
      state.currentUser = null;
    },
  },
});

export const { loginFailture, loginStart, loginSuccess, signOut } =
  userSlice.actions;

export default userSlice.reducer;
