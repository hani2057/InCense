import React, { useEffect, useState } from "react";
import AlarmItem from "./AlarmItem";
import { AlarmContainer } from "./style";
import api from "../../apis/api";

const AlarmModal = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.alarm
      .getAlarmSend()
      .then(function (res) {
        console.log(res + "getalarmsend success");
        setData(res);
      })
      .catch((err) => {
        console.log("axios alarm send err");
      });
  }, []);
  // 더미데이터

  return (
    <AlarmContainer>
      {data.map(
        (
          { createdAt, brandName, perfumeName, dealTitle, dealId, isReceived },
          idx
        ) => (
          <AlarmItem
            createdAt={createdAt}
            brandName={brandName}
            perfumeName={perfumeName}
            dealTitle={dealTitle}
            dealId={dealId}
            isReceived={isReceived}
            key={idx}
          />
        )
      )}
    </AlarmContainer>
  );
};

export default AlarmModal;
