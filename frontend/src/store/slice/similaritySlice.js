import { createSlice } from "@reduxjs/toolkit";


const content = {
  predictRate: 0,
  favNotes : [],
  worNotes : []
  }

export const similaritySlice = createSlice({
  name: 'similarity',
  initialState: {
    similarity:[
      content,
    ]

  },
  reducers: {
    getSimilarity: (state, {payload}) => {
      console.log('similarity get요청')
      state.similarity = payload
      console.log(state.similarity)
    }
  }
})

export const similarityReducers = similaritySlice.reducer;
export const similarityActions = similaritySlice.actions;