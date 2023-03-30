import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../apis/api";

// export const login = createAsyncThunk("user/login", async (code) => {
//   const res = await api.user.login("kakao", { params: { code: code } });
//   return res.data;
// });

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    accessToken: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.accessToken = action.payload.accessToken;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.accessToken = null;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(login.fulfilled, (state, action) => {
  //     state.isLogedIn = true
  //   })
  // }
});

export const userReducers = userSlice.reducer;
export const { login, logout } = userSlice.actions;
export default userSlice;
