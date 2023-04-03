import { all, fork } from "redux-saga/effects";

import takeStompSaga from "./websaga";
export default function* rootSaga() {
  yield all([fork(takeStompSaga)]);
}
