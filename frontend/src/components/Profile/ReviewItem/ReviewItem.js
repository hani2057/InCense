import React from "react";
import dayjs from "dayjs";
import { FlexDiv } from "../../common/FlexDiv/FlexDiv";
import { ModalSpan } from "../SearchModal/style";
import { ReviewItemWrapper } from "./style";
import { useNavigate } from "react-router-dom";

const ReviewItem = ({
  img,
  createdAt,
  brand,
  name,
  preference,
  review,
  reviewId,
  perfumeId,
}) => {
  const navigate = useNavigate();

  return (
    <ReviewItemWrapper>
      <FlexDiv width="35%">
        <img
          src={`https://j8a804.p.ssafy.io/api/display?filename=${img}`}
          style={{ height: "10rem", cursor: "pointer" }}
          onClick={() => navigate(`/detail/${perfumeId}`)}
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
          <img src="/assets/icons/edit.svg" />
        </FlexDiv>
        <ModalSpan
          size="0.75rem"
          margin="1.5rem 0 0 0"
          className="changeColorWhenHover"
        >
          {brand}
        </ModalSpan>
        <FlexDiv justify="start" height="auto">
          <ModalSpan
            bold={true}
            margin="0.2rem 0.5rem 0 0"
            className="changeColorWhenHover"
          >
            {name}
          </ModalSpan>
          <ModalSpan size="0.75rem" className="changeColorWhenHover">{`★ ${
            preference / 2
          }`}</ModalSpan>
        </FlexDiv>
        <ModalSpan>{review}</ModalSpan>
      </FlexDiv>
    </ReviewItemWrapper>
  );
};

export default ReviewItem;
