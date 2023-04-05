import { createSlice } from "@reduxjs/toolkit";

export const reviewSlice = createSlice({

  name: 'review',
  initialState: {
    review: [{
      name: '',
      preference: 0,
      comment: ''
    },]
  },
  
  reducers: {
    getReview: (state, {payload}) => {
      console.log('리뷰 state에서 조회')
      state.review = payload
    },
    postReview: (state, {payload}) => {
      console.log('작성리뷰 스토어에 저장')
      state.review = payload
    }
  }
  
})

export const reviewReducers = reviewSlice.reducer;
export const reviewActions = reviewSlice.actions;