import { createSlice } from "@reduxjs/toolkit";



export const articleListSlice = createSlice({
  name: 'articleList',
  initialState: {
    articleList:[

      
    ]

  },
  reducers: {
    getArticleList: (state, {payload}) => {
      console.log('Share List get요청')
      state.articleList = {...payload}
      console.log(state.articleList)
    }
  }
})

export const articleListReducers = articleListSlice.reducer;
export const articleListActions = articleListSlice.actions;