import { combineReducers } from "redux";
import { articleReducers } from "./articleSlice";
import { perfumeInfoReducers } from "./perfumeInfoSlice";
import { perfumeListReducers } from "./perfumeListSlice";
import { alarmSliceReducer } from "./alarmSlice";

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
});
export default persistReducer(persistConfig, rootReducer);
