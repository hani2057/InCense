import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comment: [{
    id: 0,
    content: '',
    writer: '',
    isSecret: 0,
    parentId: 0,
    createdDate: '',
    children: [],

  }]
}

export const commentSlice = createSlice({

  name: 'comment',
  initialState: {
    comment: [{
      id: 0,
      content: '',
      writer: '',
      isSecret: 0,
      parentId: 0,
      createdDate: '',
      children: [],
    },]
  },
  reducers: {
    getComment: (state, {payload}) => {
      state.comment = payload
    }


  }

})

export const commentReducers = commentSlice.reducer;
export const commentActions = commentSlice.actions;