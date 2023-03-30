import styled from "styled-components";

const ModalContainer = styled.div`
  position: fixed;
  inset: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(10, 10, 10, 0.4);
  z-index: 1001;
`;

const ModalWrapper = styled.div`
  position: relative;
  width: 34rem;
  height: 34rem;
  background: white;
  z-index: 1002;
`;

const ModalClose = styled.div`
  position: relative;
  left: 34.3rem;
  width: 2.6rem;
  height: 2.6rem;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1003;
`;

const ModalContent = styled.div`
  position: relative;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export { ModalContainer, ModalWrapper, ModalClose, ModalContent };
