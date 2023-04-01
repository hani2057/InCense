import React, { useRef, useState } from "react";
import api from "../../../apis/api";
import useModal from "../../../hooks/useModal";
import StarRating from "../../../pages/DetailPage/StarRating";
import { FlexDiv } from "../../common/FlexDiv/FlexDiv";
import {
  ModalClose,
  ModalContainer,
  ModalContent,
  ModalImg,
  ModalReview,
  ModalSpan,
  ModalSubmit,
  ModalWrapper,
} from "../SearchModal/style";

const ReviewModal = ({
  setModalOpen,
  img,
  brand,
  name,
  preference,
  review,
  reviewId,
  fetchGetReviews,
}) => {
  const ref = useRef();
  useModal(ref, () => {
    setModalOpen(false);
  });

  const [newPreference, setNewPreference] = useState(preference);
  const [newReview, setNewReview] = useState(review);

  const fetchModifyReview = async () => {
    const data = {
      comment: newReview,
      preference: newPreference,
      reviewId: reviewId,
    };

    await api.profile.putUserReview(data);
    setModalOpen(false);
    fetchGetReviews();
  };

  return (
    <ModalContainer>
      <ModalWrapper ref={ref}>
        <ModalClose ref={ref} onClick={() => setModalOpen(false)}>
          X
        </ModalClose>
        <ModalContent>
          <FlexDiv direction="column" justify="start">
            <FlexDiv height="45%">
              <FlexDiv width="45%" height="auto" margin="0 0.5rem 0 0">
                <ModalImg src={img} alt="perfume" height="10rem" />
              </FlexDiv>
              <FlexDiv direction="column" align="start">
                <ModalSpan>{brand}</ModalSpan>
                <ModalSpan size="1.4rem" bold={true} margin="0.7rem 0 0 0">
                  {name}
                </ModalSpan>
              </FlexDiv>
            </FlexDiv>
            <FlexDiv height="5%" justify="end" align="end">
              <StarRating
                starValue={newPreference}
                setStarValue={setNewPreference}
                size="1.2rem"
              />
            </FlexDiv>
            <ModalReview
              height="30%"
              marginTop="0.8rem"
              placeholder="다른 사람들을 위해 후기를 남겨주세요"
              onChange={(e) => setNewReview(e.target.value)}
            ></ModalReview>
            <ModalSubmit onClick={() => fetchModifyReview()}>
              수정하기
            </ModalSubmit>
          </FlexDiv>
        </ModalContent>
      </ModalWrapper>
    </ModalContainer>
  );
};

export default ReviewModal;
