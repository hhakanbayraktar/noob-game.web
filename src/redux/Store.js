import { configureStore } from "@reduxjs/toolkit";
import AuthModalSlice from "./reducers/AuthModalSlice.js";
import UserSlice from "./reducers/UserSlice.js";
import SignalRSlice from "./reducers/SignalRSlice.js";

const Store = configureStore({
  reducer: {
    authModal: AuthModalSlice,
    user: UserSlice,
    signalR: SignalRSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default Store;
