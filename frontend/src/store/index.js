import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
// import persistStore from 'redux-persist/es/persistStore';
import { articleReducers } from "./slice/articleSlice";
import { userReducers } from "./slice/userSlice";
import { perfumeInfoReducers } from "./slice/perfumeInfoSlice";
import { perfumeListReducers } from "./slice/perfumeListSlice";
import { articleListReducers } from "./slice/articleListSlice";
import { alarmSliceReducer } from "./slice/alarmSlice";
import { commentReducers } from "./slice/commentSlice";
import { reviewReducers } from "./slice/reviewSlice";
import { similarListReducers } from "./slice/similarListSlice";
import { similarityReducers } from "./slice/similaritySlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas";
// const customHistory = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  articleReducers,
  userReducers,
  perfumeInfoReducers,
  perfumeListReducers,
  articleListReducers,
  alarmSliceReducer,
  commentReducers,
  reviewReducers,
  similarListReducers,
  similarityReducers,
});

const persistConfig = {
  key: "root",
  storage: storageSession, // 세션스토리지 사용
  // whitelist: ['user']
};

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
export default store;
