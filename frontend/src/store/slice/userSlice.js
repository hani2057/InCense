import { createSlice } from "@reduxjs/toolkit";

<<<<<<< HEAD
export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogedIn: false,
=======
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
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      sessionStorage.setItem("accessToken", action.payload.accessToken);
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      sessionStorage.setItem("accessToken", null);
    },
>>>>>>> 5b2e725b12140d3a89639cffc5e4ff0ed7a45489
  },
  reducers: {},
  // extraReducers: (builder) => {
  //   builder.addCase(login.fulfilled, (state, action) => {
  //     state.isLoggedIn = true;
  //   });
  // },
});

export const userReducers = userSlice.reducer;
export default userSlice;
