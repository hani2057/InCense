import { createSlice } from "@reduxjs/toolkit";

export const articleListSlice = createSlice({
  name: 'articleList',
  initialState: {
    articleList:[]

  },
  reducers: {
    getArticleList: (state, {payload}) => {
      console.log('List get요청')
      state.articleList = payload
    }
  }
})

export const articleListReducers = articleListSlice.reducer;
export const articleListActions = articleListSlice.actions;