import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import ReviewModal from "../ReviewModal/ReviewModal";
import { FlexDiv } from "../../common/FlexDiv/FlexDiv";
import { ModalSpan } from "../SearchModal/style";
import { ShareItemWrapper } from "../ShareItem/style";

const ReviewItem = ({
  img,
  createdAt,
  brand,
  name,
  preference,
  review,
  reviewId,
  perfumeId,
  fetchGetReviews,
}) => {
  const navigate = useNavigate();

  const [modifyModalOpen, setModifyModalOpen] = useState(false);

  return (
    <>
      <ShareItemWrapper>
        <FlexDiv width="35%">
          <img
            src={`https://j8a804.p.ssafy.io/api/display?filename=${img}`}
            alt="perfume"
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
            <img
              src="/assets/icons/edit.svg"
              alt="edit"
              style={{ cursor: "pointer" }}
              onClick={() => setModifyModalOpen(true)}
            />
          </FlexDiv>
          <ModalSpan
            size="0.75rem"
            margin="1.5rem 0 0 0"
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
            <ModalSpan
              margin="0 2rem 0 0"
              className="changeColorWhenHover"
            >{`★ ${preference / 2}`}</ModalSpan>
          </FlexDiv>
          <ModalSpan margin="2rem 0 0 0">{review}</ModalSpan>
        </FlexDiv>
      </ShareItemWrapper>

      {modifyModalOpen && (
        <ReviewModal
          setModalOpen={setModifyModalOpen}
          img={img}
          brand={brand}
          name={name}
          preference={preference}
          review={review}
          reviewId={reviewId}
          fetchGetReviews={fetchGetReviews}
        />
      )}
    </>
  );
};

export default ReviewItem;
