import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import { AlarmSpan, AlarmWrapper, AlarmDeleteIcon } from "./style";
import { Link } from "react-router-dom";
import api from "../../apis/api";
import { setAlarmList,} from "../../store/slice/alarmSlice"
import {useDispatch,} from "react-redux"

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
}) => {

  const dispatch = useDispatch();

  const deleteAlarm =  async () => {
    await api.alarm.deleteAlarmSend(id);
    const res = await api.alarm.getAlarmSend();
    dispatch(setAlarmList(res));
  }

  const readAlarm = async () => {
    await api.alarm.readAlarmSend(id);
    const res = await api.alarm.getAlarmSend();
    dispatch(setAlarmList(res));
  }

  return (
    <AlarmWrapper
      direction="column"
      height="5.5rem"
      align="start"
      // justify="space-around"
    >    
    <AlarmDeleteIcon onClick={deleteAlarm} src="/assets/icons/x.svg" alt="delete" />
      {/* <AlarmSpan size="0.6rem">{dayjs("2023-03-29").fromNow()}</AlarmSpan> */}
      <AlarmSpan size="0.6rem">{createdAt}</AlarmSpan>
      <AlarmSpan weight="700">{`${brandName} - ${perfumeName}`}</AlarmSpan>
      <AlarmSpan weight="700">
      <Link onClick={readAlarm} to={`/share/article/${dealId}`}>{dealTitle}</Link>
      </AlarmSpan>
      <AlarmSpan weight="700">
        {isReceived === 0 ? <>읽지 않음</> : <>읽음</>}
      </AlarmSpan>
      <AlarmSpan size="0.75rem">향수의 나눔/판매글이 등록되었습니다.</AlarmSpan>
    </AlarmWrapper>
  );
};

export default AlarmItem;
