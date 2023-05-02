import { configureStore } from '@reduxjs/toolkit'
import AuthModalSlice from "./reducers/AuthModalSlice.js";
import UserSlice from './reducers/UserSlice.js';

const Store = configureStore({
  reducer: {
    authModal: AuthModalSlice,
    user: UserSlice
  },
});

export default Store;
