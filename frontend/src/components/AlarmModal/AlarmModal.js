import React, { useEffect, useState } from "react";
import AlarmItem from "./AlarmItem";
import { AlarmContainer } from "./style";
import api from "../../apis/api";
import {selectAlarmList, setAlarmList,selectAlarmCount} from "../../store/slice/alarmSlice"
import {useDispatch, useSelector} from "react-redux"

const AlarmModal = ({setAlarmOpen}) => {
  const dispatch = useDispatch();
  const alarmList = useSelector(selectAlarmList);
  const alarmCount = useSelector(selectAlarmCount);

  useEffect(() => {
    api.alarm
      .getAlarmSend()
      .then((res) => {
        dispatch(setAlarmList(res))
      })
      .catch((err) => {
        console.log("axios alarm send err");
      });
  }, []);

  useEffect(() => {
  }, [alarmCount]);
  // 더미데이터

  return (
    <AlarmContainer>
      {alarmList.map(
        (
          {id, createdAt, brandName, perfumeName, dealTitle, dealId, isReceived },
          idx
        ) => (
          <AlarmItem
            id={id}
            createdAt={createdAt}
            brandName={brandName}
            perfumeName={perfumeName}
            dealTitle={dealTitle}
            dealId={dealId}
            isReceived={isReceived}
            key={idx}
            setAlarmOpen={setAlarmOpen}
          />
        )
      )}
    </AlarmContainer>
  );
};

export default AlarmModal;
