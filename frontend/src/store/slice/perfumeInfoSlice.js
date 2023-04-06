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
    },
    category: null,
  },
  reducers: {
    getPerfumeInfo: (state, {payload}) => {
      state.perfumeInfo = payload
    },
    getCategory: (state, {payload}) =>{
      state.category = payload
    }

  }
})

export const perfumeInfoReducers = perfumeInfoSlice.reducer;
export const perfumeInfoActions = perfumeInfoSlice.actions;