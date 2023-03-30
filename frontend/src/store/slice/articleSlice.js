import { createSlice } from "@reduxjs/toolkit";



export const articleSlice = createSlice({

  name: 'article',
  initialState: {
    article: {
    id : 0,
    title: '',
    content: '',
    userId: '',
    gubun : '',
    price: 0,
    isDelivery: 0,
    perfumeId: 0,
    buyDate: '',
    files: [],
    isClosed: 0,
    volume: 0,
    createdDate: '',
    comments: [],
    userNickname: ''
    }


  },
  reducers: {
    getArticleDetail: (state, {payload}) => {
      console.log('Article상세조회!')
      state.article = payload
    }
    ,
    saveArticle: (state, {payload}) => {
      console.log('article 저장 액션 호출');
      // console.log(data)
      state.article = payload;
    },

    updateArticle: (state, {payload}) => {
      // 마감여부는 따로 버튼
      console.log('article 수정 액션 호출');
      console.log(payload)
      state.article = payload

    },    
    saveMyRoomInfo: (state, {payload}) => {
      console.log('saveMyRoomInfo 저장 액션 호출');
      state.user.myRooms = payload.myRooms;
      state.user.schedules = payload.schedules;
      console.log(state.user);
    },
    createMytodo: (state, {payload}) => {
      console.log('createMytodo 저장 액션 호출');
      state.user.doing.push(payload.newTodo);
      console.log(state.user);
    },
    changeRegisterInput: (state, { payload }) => {
      switch (payload.name) {
        case "title":
          return {
            ...state,
            title: payload.value,
          };

        case "content":
          return {
            ...state,
            content: payload.value,
          };

        default:
          break;
      }
    },
  }
})


export const articleReducers = articleSlice.reducer;
export const articleActions = articleSlice.actions;