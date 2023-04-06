import { createSlice } from "@reduxjs/toolkit";


const content = {
  perfumeId : 0,
  perfumeName: '',
  perfumeBrand: '',
  image: ''
  }

export const similarListSlice = createSlice({
  name: 'similarList',
  initialState: {
    similarList:[
      content,
    ]

  },
  reducers: {
    getSimilarList: (state, {payload}) => {
      state.similarList = payload
    }
  }
})

export const similarListReducers = similarListSlice.reducer;
export const similarListActions = similarListSlice.actions;