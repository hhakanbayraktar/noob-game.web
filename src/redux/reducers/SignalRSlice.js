import { createSlice } from "@reduxjs/toolkit";

export const SignalRSlice = createSlice({
  name: "SignalR",
  initialState: {
    hubConn: null,
  },
  reducers: {
    setHubConn: (state = false, action) => {
      state.hubConn = action.payload;
    },
  },
});

export const { setHubConn } = SignalRSlice.actions;

export default SignalRSlice.reducer;
