import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  article: {
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
}

export const articleSlice = createSlice({


  name: 'article',
  initialState: {
    article: {
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
  },
  reducers: {
    getArticleDetail: (state, {payload}) => {
      console.log('Article상세조회!')
      state.article = payload
    }
    ,
    saveArticle: (state, {payload}) => {
      console.log('article 저장 액션 호출');
      // console.log(data)
      state.article = payload;
    },

    updateArticle: (state, {payload}) => {
      // 마감여부는 따로 버튼
      console.log('article 수정 액션 호출');
      console.log(payload)
      state.article = payload

    },    

    changeRegisterInput: (state, { payload }) => {
      if (payload.name==='title') {
        state.article.title = payload.value
      } 
      if (payload.name==='content') {
        state.article.content = payload.value
      }
      if (payload.name==='category') {
        state.article.gubun = payload.value
      }
      if (payload.name==='price') {
        state.article.price = payload.value
      }
      if (payload.name==='isDelivery') {
        state.article.isDelivery = payload.value
      }
      if (payload.name==='buyDate') {
        state.article.buyDate = payload.value
      }
      if (payload.name==='perfumeId') {
        state.article.perfumeId = payload.value
      }
      if (payload.name==='volume') {
        state.article.volume = payload.value
      }
    },
    // 제출 시 form reset
    reset : () => initialState
  }
})


export const articleReducers = articleSlice.reducer;
export const articleActions = articleSlice.actions;