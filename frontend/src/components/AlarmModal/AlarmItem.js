import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import api from "../../apis/api";
import { setAlarmList } from "../../store/slice/alarmSlice";
import { AlarmSpan, AlarmWrapper, AlarmDeleteIcon } from "./style";

dayjs.extend(relativeTime);
dayjs.locale("ko");

const AlarmItem = ({
  id,
  createdAt,
  brandName,
  perfumeName,
  dealTitle,
  dealId,
  isReceived,
  setAlarmOpen,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 알람 삭제 요청
  const deleteAlarm = async () => {
    await api.alarm.deleteAlarmSend(id);
    const res = await api.alarm.getAlarmSend();
    dispatch(setAlarmList(res));
  };

  // 알람모달 열 때 전체 읽음표시
  useEffect(() => {
    (async () => {
      if (!isReceived) {
        await api.alarm.readAlarmSend(id);
      }
    })();
  }, []);

  return (
    <AlarmWrapper direction="column" height="6.5rem" align="start">
      <AlarmDeleteIcon
        onClick={deleteAlarm}
        src="/assets/icons/x.svg"
        alt="delete"
      />
      <AlarmSpan size="0.6rem">{dayjs(createdAt).fromNow()}</AlarmSpan>
      <AlarmSpan
        size="0.8rem"
        weight="700"
      >{`${brandName} - ${perfumeName}`}</AlarmSpan>
      <AlarmSpan size="0.75rem">향수의 나눔/판매글이 등록되었습니다.</AlarmSpan>
      <AlarmSpan
        weight="700"
        pointer={true}
        onClick={() => {
          navigate(`/share/article/${dealId}`);
        }}
      >
        {`제목: ${dealTitle}`}
      </AlarmSpan>
    </AlarmWrapper>
  );
};

export default AlarmItem;
