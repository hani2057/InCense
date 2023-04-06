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
      state.review = payload
    },
    postReview: (state, {payload}) => {
      state.review = payload
    }
  }
  
})

export const reviewReducers = reviewSlice.reducer;
export const reviewActions = reviewSlice.actions;