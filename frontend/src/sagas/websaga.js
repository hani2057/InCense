import { eventChannel } from "redux-saga";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { take, call, put, fork, cancel, takeLatest } from "redux-saga/effects";
import { authInstance } from "../apis";
import api from "../apis/api"
async function getUserInfo() {
  const res = await authInstance.get("/member/info");
  return res;
}

async function getAlarmList(){
  const res = await api.alarm.getAlarmSend();
  return res;
}

function createSocketChannel(socket) {
  return eventChannel((emit) => {
    const connectCallback = () => {
      console.log("Stomp.js connected to WebSocket server");
      emit({ type: "CONNECTED" });
    };

    const errorCallback = (error) => {
      console.error("Stomp.js failed to connect to WebSocket server:", error);
      emit({ type: "ERROR", payload: error });
    };

    socket.connect({}, connectCallback, errorCallback);

    const unsubscribe = () => {
      socket.disconnect();
      console.log("Stomp.js disconnected from WebSocket server");
    };

    return unsubscribe;
  });
}

function createMessageChannel(client, destination) {
  return eventChannel((emit) => {
    const subscription = client.subscribe(destination, (message) => {
      emit({ type: "MESSAGE", payload: message.body });
    });

    const unsubscribe = () => {
      subscription.unsubscribe();
      console.log("Stomp.js unsubscribed from destination:", destination);
    };

    return unsubscribe;
  });
}

function* watchSocketChannel(channel, res, client) {
  while (true) {
    const { type, payload } = yield take(channel);

    switch (type) {
      case "CONNECTED":
        yield put({ type: "SOCKET_CONNECTED" });

        const messageChannel = yield call(
          createMessageChannel,
          client,
          `/sub/notification/${res.nickname}`
        );

        yield fork(watchMessageChannel, messageChannel);

        break;
      case "ERROR":
        yield put({ type: "SOCKET_ERROR", payload });
        break;
      default:
        break;
    }
  }
}

function* watchMessageChannel(channel) {
  while (true) {
    const { type, payload } = yield take(channel);
    switch (type) {
      case "MESSAGE":
        const alarmList = yield call(getAlarmList);
        yield put({type:"alarm/setAlarmList",payload:alarmList})
        yield put({ type: "alarm/increaseAlarmCount" });
        break;
      default:
        break;
    }
  }
}

function* stompSaga() {
  const alarmList = yield call(getAlarmList);
  yield put({type:"alarm/setAlarmList",payload:alarmList})
  const res = yield call(getUserInfo);
  // const WEBSOCKET_URL = "http://localhost:8080/api/stomp/chat";
  const WEBSOCKET_URL = "https://j8a804.p.ssafy.io/api/stomp/chat";
  const sockJs = new SockJS(WEBSOCKET_URL);
  const stomp = Stomp.over(sockJs);
  const channel = yield call(createSocketChannel, stomp);

  const socketTask = yield fork(watchSocketChannel, channel, res, stomp);

  yield take("CLOSE_SOCKET");
  yield cancel(socketTask);
}

function* takeStompSaga() {
  yield takeLatest("START_WEBSOCKET", stompSaga);
}

export default takeStompSaga;
