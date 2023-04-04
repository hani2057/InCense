import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comment: {
    id: 0,
    content: '',
    userId: '',
    isSecret: 0,
    parentId: 0,
    createdDate: '',

  }
}

export const commentSlice = createSlice({

  name: 'comment',
  initialState: {
    comment: {
      id: 0,
      content: '',
      userId: '',
      isSecret: 0,
      parentId: 0,
      createdDate: ''
    }
  },
  reducers: {
    getComment: (state, {payload}) => {
      console.log('comment 조회')
    }


  }

})