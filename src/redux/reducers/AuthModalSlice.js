import { createSlice } from "@reduxjs/toolkit";

export const AuthModalSlice = createSlice({
  name: "AuthModal",
  initialState: {
    authModalOpen: false,
    test2: false,
  },
  reducers: {
    setAuthModalOpen: (state = false, action) => {
      state.authModalOpen = action.payload;
    },
    setFormType: (state, action) => {
      state.formType = action.payload;
    },
  },
});

export const { setAuthModalOpen, setFormType } = AuthModalSlice.actions;

export default AuthModalSlice.reducer;
