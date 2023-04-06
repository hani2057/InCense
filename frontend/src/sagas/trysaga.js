import { take, call, put, fork, cancel, takeLatest } from "redux-saga/effects";

import api from "../apis/api"

function* initAlarmRun() {
    const res = yield call(api.alarm.getAlarmSend);
    yield put({type:"alarm/selectAlarmList",payload:res})
    yield put({type: "alarm/increaseAlarmCount"});
  }


function* initAlarmSaga() {
    yield takeLatest("INIT_ALARM", initAlarmRun);
  }


export default initAlarmSaga;