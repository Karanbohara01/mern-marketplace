import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./authSlice";
import categorySlice from "./categorySlice";
import chatSlice from "./chatSlice";
import postSlice from "./postSlice";
import rtnSlice from "./rtnSlice";
import socketSlice from "./socketSlice";

// Persist configuration
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authSlice,
  post: postSlice,
  chat: chatSlice,
  category: categorySlice,
  socketio: socketSlice,
  realTimeNotification: rtnSlice,
});

// Persist the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
