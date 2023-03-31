import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import { AlarmSpan, AlarmWrapper, AlarmDeleteIcon } from "./style";

dayjs.extend(relativeTime);
dayjs.locale("ko");

const AlarmItem = ({ createdAt, brand, name }) => {
  return (
    <AlarmWrapper
      direction="column"
      height="5.5rem"
      align="start"
      // justify="space-around"
    >
      <AlarmDeleteIcon src="/assets/icons/x.svg" alt="delete" />
      <AlarmSpan size="0.6rem">{dayjs("2023-03-29").fromNow()}</AlarmSpan>
      <AlarmSpan weight="700">{`${brand} - ${name}`}</AlarmSpan>
      <AlarmSpan size="0.75rem">향수의 나눔/판매글이 등록되었습니다.</AlarmSpan>
    </AlarmWrapper>
  );
};

export default AlarmItem;
