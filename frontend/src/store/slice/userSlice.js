import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogedIn: false,
  },
  reducers: {},
  // extraReducers: (builder) => {
  //   builder.addCase(login.fulfilled, (state, action) => {
  //     state.isLogedIn = true
  //   })
  // }
});

export const userReducers = userSlice.reducer;
export default userSlice;
