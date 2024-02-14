import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "User",
  initialState: {
    user: null,
    favourites: [],
  },
  reducers: {
    setUser: (state, action) => {
      if (action.payload == null) {
        localStorage.removeItem("user");
      } else {
        if (action.payload)
          localStorage.setItem("user", JSON.stringify(action.payload));
      }
      state.user = action.payload;
    },
    setFavourites: (state, action) => {
      state.favourites = action.payload;
    },
    addFavourite: (state, action) => {
      state.favourites = [...state.favourites, action.payload];
    },
    deleteFavourite: (state, action) => {
      console.log("delete", action.payload);
      state.favourites = [...state.favourites].filter(
        (e) => e !== action.payload
      );
    },
  },
});

export const { setUser, setFavourites, addFavourite, deleteFavourite } =
  UserSlice.actions;

export default UserSlice.reducer;
