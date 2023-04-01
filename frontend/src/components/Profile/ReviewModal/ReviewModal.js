import React, { useRef } from "react";
import useModal from "../../../hooks/useModal";
import {
  ModalClose,
  ModalContainer,
  ModalContent,
  ModalWrapper,
} from "../SearchModal/style";

const ReviewModal = ({ setModalOpen }) => {
  const ref = useRef();
  useModal(ref, () => {
    setModalOpen(false);
  });

  return (
    <ModalContainer>
      <ModalWrapper ref={ref}>
        <ModalClose ref={ref} onClick={() => setModalOpen(false)}>
          X
        </ModalClose>
        <ModalContent></ModalContent>
      </ModalWrapper>
    </ModalContainer>
  );
};

export default ReviewModal;
