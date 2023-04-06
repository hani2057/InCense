import { all, fork } from "redux-saga/effects";

import takeStompSaga from "./websaga";
import alarmSaga from "./alarmsaga";
export default function* rootSaga() {
  yield all([fork(takeStompSaga),fork(alarmSaga)]);
}
