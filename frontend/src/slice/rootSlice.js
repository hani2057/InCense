import { combineReducers } from "redux";
// import { articleReducers } from "./articleSlice";
// import { boardReducers } from "./boardSlice";
// import { commentReducers } from "./commentSlice";
// import { questionReducers } from "./questionSlice";
// import { questionArticleReducers } from "./questionArticleSlice";
// import { questionCommentReducers } from "./questionCommentSlice";
// import { answerReducers } from "./answerSlice";
// import { userInfoReducers } from "./userInfoSlice";
// import { groupInfoReducers } from "./groupInfoSlice";
// import { scheduleReducers } from "./scheduleSlice";
// import { userTodoReducers } from "../components/TodoThings/TodoSlice";
import { articleReducers } from "./articleSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: 'root',
  storage,

}


export const rootReducer = combineReducers({articleReducers,})
export default persistReducer(persistConfig, rootReducer);

// export default rootReducer;

// export const persistReducer(persistConfig, rootReducer);