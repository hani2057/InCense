import { createSlice } from "@reduxjs/toolkit";


const content = {
  id : 0,
  title: '',
  content: '',
  userId: '',
  gubun : 'SALE',
  price: '',
  isDelivery: 0,
  perfumeId: '',
  buyDate: '',
  files: [],
  isClosed: 0,
  volume: '',
  createdDate: '',
  comments: [],
  userNickname: ''
  }

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