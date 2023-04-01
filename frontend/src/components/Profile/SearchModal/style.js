import styled, { css } from "styled-components";

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
  position: absolute;
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
  justify-content: start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 2rem;
`;

const ModalImg = styled.img.attrs((props) => ({
  src: `https://j8a804.p.ssafy.io/api/display?filename=${props.src}`,
}))`
  height: ${(props) => props.height};
`;

const ModalInput = styled.input`
  &::placeholder {
    color: var(--gray-color);
  }
`;

const SearchResultWrapper = styled.div`
  position: absolute;
  width: calc(30rem * 0.7);
  height: 14rem;
  top: 6rem;
  overflow: scroll;
  border: 1px solid var(--gray-color);
  background: white;
  z-index: 1;

  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
  /* 크롬, 사파리, 오페라, 엣지 */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SearchResultItem = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: start;
  padding: 0.5rem;
  cursor: pointer;
`;

const ModalSpan = styled.span`
  ${({ size, bold, color, margin, pointer }) => css`
    font-size: ${size || "1rem"};
    font-weight: ${bold ? "700" : "400"};
    color: ${color ? "var(--" + color + "-color)" : "var(--font-color)"};
    margin: ${margin || "0"};
    cursor: ${pointer ? "pointer" : "auto"};
  `}
`;

const ModalReview = styled.textarea`
  resize: none;
  width: 100%;
  height: ${(props) => props.height || "4rem"};
  border: 1px solid var(--gray-color);
  outline: var(--gray-color);
  padding: 0.5rem;
  margin-top: ${(props) => props.marginTop || "4.5rem"};

  &::placeholder {
    color: var(--gray-color);
  }
`;

const ModalSubmit = styled.div`
  position: absolute;
  top: 30rem;
  width: 100%;
  height: 4rem;
  background-color: var(--main-color);
  color: white;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ModalErrorMsg = styled.div`
  position: absolute;
  width: 20rem;
  height: 2rem;
  top: calc(50% - 1rem);
  left: calc(50% - 10rem);
  border: none;
  // border-radius: 5px;
  background-color: var(--red-color);
  opacity: 0.4;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export {
  ModalContainer,
  ModalWrapper,
  ModalClose,
  ModalContent,
  ModalImg,
  ModalInput,
  SearchResultWrapper,
  SearchResultItem,
  ModalSpan,
  ModalReview,
  ModalSubmit,
  ModalErrorMsg,
};
