import { all, fork } from "redux-saga/effects";

import takeStompSaga from "./websaga";
import alarmSaga from "./alarmsaga";
import initAlarmSaga from "./trysaga";
export default function* rootSaga() {
  yield all([fork(takeStompSaga),fork(alarmSaga),fork(initAlarmSaga)]);
}
