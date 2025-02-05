// authSlice.js

import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    users: null,
    suggestedUsers: [],
    userProfile: null,
    selectedUser: null,
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
    setAllUsers: (state, action) => {
      state.users = action.payload;
    },
    setSuggestedUsers: (state, action) => {
      state.suggestedUsers = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});

// Export actions
export const {
  setAuthUser,
  setSuggestedUsers,
  setUserProfile,
  setSelectedUser,
  setAllUsers,
} = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
