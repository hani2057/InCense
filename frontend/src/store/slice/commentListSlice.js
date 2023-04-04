import { createSlice } from "@reduxjs/toolkit";

export const commentListSlice = createSlice({
  name: 'commentList',
  initialState: {
    commentList:[]

  },
  reducers: {
    getcommentList: (state, {payload}) => {
      console.log('Share List get요청')
      state.commentList = payload
    }
  }
})

export const commentListReducers = commentListSlice.reducer;
export const commentListActions = commentListSlice.actions;