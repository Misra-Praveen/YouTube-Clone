import { createSlice } from "@reduxjs/toolkit";

const userInfoFromStorage = JSON.parse(localStorage.getItem("userInfo"));

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: userInfoFromStorage || null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
