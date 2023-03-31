import { createSlice } from "@reduxjs/toolkit";

export const perfumeInfoSlice = createSlice({

  name: 'perfumeInfo',
  initialState: {
    perfumeInfo: {
      
        id: -1,
        name: '',
        brandName: '',
        topNoteName: [],
        middleNoteName: [],
        baseNoteName: [],
        price: 0,
        volume: 0,
        gender: '',
        rating: 0,
        image: '',
        concentration: ''      
    }
  },
  reducers: {
    getPerfumeInfo: (state, {payload}) => {
      console.log('Detail get요청')
      state.perfumeInfo = payload
    }
  }
})

export const perfumeInfoReducers = perfumeInfoSlice.reducer;
export const perfumeInfoActions = perfumeInfoSlice.actions;