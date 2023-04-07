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
      state.similarity = payload
    }
  }
})

export const similarityReducers = similaritySlice.reducer;
export const similarityActions = similaritySlice.actions;