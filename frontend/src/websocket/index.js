import SockJS from "sockjs-client";
import Stomp from "stompjs";

var sockJs;
var stomp;

const websocket = {
  connect: async function (socketId, dispatch, alarmSliceReducer) {
    const WEBSOCKET_URL = "http://localhost:8080/api/stomp/chat";
    sockJs = new SockJS(WEBSOCKET_URL);
    stomp = Stomp.over(sockJs);

    //2. connection이 맺어지면 실행
    await stomp.connect({}, async function () {
      console.log("STOMP Connection");

      //4. subscribe(path, callback)으로 메세지를 받을 수 있음
      await stomp.subscribe("/sub/notification/" + socketId, function (chat) {
        console.log("chat!!!!");
        console.log(chat);
        dispatch(alarmSliceReducer(true));
      });
    });

    return stomp;
  },
  close: function () {
    if (stomp !== undefined) {
      stomp.close();
    }
  },
};

export default websocket;
