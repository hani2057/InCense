import React, { useEffect, useState } from "react";
import AlarmItem from "./AlarmItem";
import { AlarmContainer } from "./style";
import api from "../../apis/api";
import { selectAlarmList, setAlarmList } from "../../store/slice/alarmSlice";
import { useDispatch, useSelector } from "react-redux";

const AlarmModal = ({ alarmOpen, setAlarmOpen }) => {
  const dispatch = useDispatch();
  const alarmList = useSelector(selectAlarmList);

  useEffect(() => {
    api.alarm
      .getAlarmSend()
      .then((res) => {
        dispatch(setAlarmList(res));
      })
      .catch((err) => {
        // console.log("axios alarm send err");
      });
  }, [alarmOpen]);

  return (
    <AlarmContainer>
      {alarmList.length ? (
        alarmList.map(
          ({
            id,
            createdAt,
            brandName,
            perfumeName,
            dealTitle,
            dealId,
            isReceived,
          }) => (
            <AlarmItem
              id={id}
              createdAt={createdAt}
              brandName={brandName}
              perfumeName={perfumeName}
              dealTitle={dealTitle}
              dealId={dealId}
              isReceived={isReceived}
              key={id}
              setAlarmOpen={setAlarmOpen}
            />
          )
        )
      ) : (
        <span style={{ width: "100%", lineHeight: "31rem" }}>
          알람이 없어요
        </span>
      )}
    </AlarmContainer>
  );
};

export default AlarmModal;
