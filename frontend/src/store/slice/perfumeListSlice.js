import { createSlice } from "@reduxjs/toolkit";

export const perfumeListSlice = createSlice({
  name: 'perfumeList',
  initialState: {
    perfumeList:{
      content: [{
      
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
    },],
      totalElements: 0
    }

  },
  reducers: {
    getPerfumeList: (state, {payload}) => {
      state.perfumeList= payload
    }
  }
})

export const perfumeListReducers = perfumeListSlice.reducer;
export const perfumeListActions = perfumeListSlice.actions;