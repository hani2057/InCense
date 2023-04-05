import { combineReducers } from "redux";
import { articleReducers } from "./articleSlice";
import { perfumeInfoReducers } from "./perfumeInfoSlice";
import { perfumeListReducers } from "./perfumeListSlice";
import { alarmSliceReducer } from "./alarmSlice";
import { commentReducers } from "./commentSlice";
import { articleListReducers } from "./articleListSlice";
import { reviewReducers } from "./reviewSlice";
import { similarListReducers } from "./similarListSlice";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

export const rootReducer = combineReducers({
  articleReducers,
  perfumeInfoReducers,
  perfumeListReducers,
  alarmSliceReducer,
  commentReducers,
  articleListReducers,
  reviewReducers,
  similarListReducers,
});
export default persistReducer(persistConfig, rootReducer);
