// import { createSlice } from "@reduxjs/toolkit";

// const chatSlice = createSlice({
//   name: "chat",
//   initialState: {
//     onlineUsers: [],
//     messages: [],
//   },
//   reducers: {
//     // actions
//     setOnlineUsers: (state, action) => {
//       state.onlineUsers = action.payload;
//     },
//     setMessages: (state, action) => {
//       state.messages = action.payload;
//     },
//   },
// });
// export const { setOnlineUsers, setMessages } = chatSlice.actions;
// export default chatSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    onlineUsers: [],
    messages: [],
    // Do not store socket or other non-serializable data here
    // socket: null, // This is just an example if you were storing it.
  },
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    // Add action for socket connection or other non-serializable data handling (store elsewhere)
    setSocket: (state, action) => {
      // Handle socket connection here (but don't store in Redux state, ideally)
    },
  },
});

export const { setOnlineUsers, setMessages, setSocket } = chatSlice.actions;
export default chatSlice.reducer;
