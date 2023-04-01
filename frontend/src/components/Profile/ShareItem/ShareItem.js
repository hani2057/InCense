import React from "react";
import dayjs from "dayjs";
import { FlexDiv } from "../../common/FlexDiv/FlexDiv";
import { ModalSpan } from "../SearchModal/style";
import { useNavigate } from "react-router-dom";
import {
  ShareItemWrapper,
  ShareSellType,
  ShareItemTable,
  ShareItemTHead,
  ShareItemTBody,
} from "./style";

const ReviewItem = ({
  // commentCount,
  // createdAt,
  // dealId,
  // gubun,
  // img,
  // isClosed,
  // isDelivery,
  // brand,
  // name,
  // price,
  // title,
  // volume,
  // nickname,
  isMine,
}) => {
  const navigate = useNavigate();

  const data = {
    commentCount: 1,
    createdAt: "2023-03-30",
    dealId: 0,
    gubun: "SALE",
    img: "perfumes/438.jpg",
    isClosed: 0,
    isDelivery: 1,
    brand: "brand name",
    name: "perfume name",
    price: 30000,
    title: "제목",
    volume: 30,
    nickname: "작성자",
  };

  const {
    commentCount,
    createdAt,
    dealId,
    gubun,
    img,
    isClosed,
    isDelivery,
    brand,
    name,
    price,
    title,
    volume,
    nickname,
  } = data;

  return (
    <ShareItemWrapper>
      <FlexDiv width="35%">
        <img
          src={`https://j8a804.p.ssafy.io/api/display?filename=${img}`}
          style={{ height: "10rem", cursor: "pointer" }}
          onClick={() => navigate(`/share/article/${dealId}`)}
        />
      </FlexDiv>
      <FlexDiv
        direction="column"
        align="start"
        justify="start"
        width="65%"
        padding="1rem"
        style={{ borderLeft: "1px solid #ffd6f8" }}
      >
        <FlexDiv justify="space-between" height="auto">
          <ModalSpan size="0.75rem">
            {dayjs(createdAt).locale("en").format("MMM DD, YYYY")}
          </ModalSpan>
          <ShareSellType type={gubun}>
            {gubun === "SELL" ? "나눔" : "판매"}
          </ShareSellType>
        </FlexDiv>
        <ModalSpan size="1.2rem" bold={true}>
          {title}
        </ModalSpan>

        <FlexDiv>
          <FlexDiv direction="column" align="start" justify="start" width="80%">
            <ModalSpan
              size="0.75rem"
              margin="1rem 0 0 0"
              className="changeColorWhenHover"
            >
              {brand}
            </ModalSpan>
            <FlexDiv justify="space-between" height="auto">
              <ModalSpan
                bold={true}
                margin="0.2rem 0.5rem 0 0"
                className="changeColorWhenHover"
              >
                {name}
              </ModalSpan>
              {isMine || (
                <ModalSpan size="0.75rem" className="changeColorWhenHover">
                  {`by ${nickname}`}
                </ModalSpan>
              )}
            </FlexDiv>
            <ShareItemTable>
              <thead>
                <tr>
                  <ShareItemTHead>용량</ShareItemTHead>
                  <ShareItemTHead>가격</ShareItemTHead>
                  <ShareItemTHead>택배</ShareItemTHead>
                  <ShareItemTHead>마감</ShareItemTHead>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <ShareItemTBody>{`${volume}ml`}</ShareItemTBody>
                  <ShareItemTBody>
                    {price.toLocaleString("ko-KR")}
                  </ShareItemTBody>
                  <ShareItemTBody>
                    {isDelivery ? "가능" : "불가능"}
                  </ShareItemTBody>
                  <ShareItemTBody>
                    {isClosed ? "마감" : "진행중"}
                  </ShareItemTBody>
                </tr>
              </tbody>
            </ShareItemTable>
          </FlexDiv>

          <FlexDiv width="20%" align="end">
            <img src="/assets/icons/message.svg" alt="comment" />
            <ModalSpan size="0.75rem" margin="0 0 0.2rem 0.4rem">
              {commentCount}
            </ModalSpan>
          </FlexDiv>
        </FlexDiv>
      </FlexDiv>
    </ShareItemWrapper>
  );
};

export default ReviewItem;
