import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../apis/api";

// export const login = createAsyncThunk("user/login", async (code) => {
//   const res = await api.user.login("kakao", { params: { code: code } });
//   if (res.accessToken) {
//     sessionStorage.setItem("accessToken", res.accessToken);

//     navigate("/");
//   } else
//     navigate("/signup", {
//       state: { email: res.email, type: res.type },
//     });
//   return res.data;
// });

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    username: "",
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.username = action.payload.nickname;
      sessionStorage.setItem("accessToken", action.payload.accessToken);
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      sessionStorage.setItem("accessToken", null);
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(login.fulfilled, (state, action) => {
  //     state.isLoggedIn = true;
  //   });
  // },
});

export const userReducers = userSlice.reducer;
export const { login, logout } = userSlice.actions;
export default userSlice;
