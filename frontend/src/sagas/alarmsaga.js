import { take, call, put, fork, cancel, takeLatest } from "redux-saga/effects";
import api from "../apis/api";

function* alarmRun() {
  yield call(api.alarm.readAlarmSendAll);
  const res = yield call(api.alarm.getAlarmSend);
  yield put({ type: "alarm/selectAlarmList", payload: res });
  // console.log("saga alarmRun");
  yield put({ type: "alarm/increaseAlarmCount" });
  // console.log("count");
}

function* alarmSaga() {
  yield takeLatest("ON_ALARM_CHANGE", alarmRun);
}

export default alarmSaga;
