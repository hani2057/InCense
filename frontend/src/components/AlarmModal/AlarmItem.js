import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import { AlarmSpan, AlarmWrapper, AlarmDeleteIcon } from "./style";
import { Link } from "react-router-dom";

dayjs.extend(relativeTime);
dayjs.locale("ko");

const AlarmItem = ({
  createdAt,
  brandName,
  perfumeName,
  dealTitle,
  dealId,
  isReceived,
}) => {
  return (
    <AlarmWrapper
      direction="column"
      height="5.5rem"
      align="start"
      // justify="space-around"
    >
      <AlarmDeleteIcon src="/assets/icons/x.svg" alt="delete" />
      {/* <AlarmSpan size="0.6rem">{dayjs("2023-03-29").fromNow()}</AlarmSpan> */}
      <AlarmSpan size="0.6rem">{createdAt}</AlarmSpan>
      <AlarmSpan weight="700">{`${brandName} - ${perfumeName}`}</AlarmSpan>
      <AlarmSpan weight="700">
        <Link to={`/share/${dealId}`}>{dealTitle}</Link>
      </AlarmSpan>
      <AlarmSpan weight="700">
        {isReceived === 0 ? <>읽지 않음</> : <>읽음</>}
      </AlarmSpan>
      <AlarmSpan size="0.75rem">향수의 나눔/판매글이 등록되었습니다.</AlarmSpan>
    </AlarmWrapper>
  );
};

export default AlarmItem;
