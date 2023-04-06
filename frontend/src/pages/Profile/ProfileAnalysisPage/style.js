import styled, { css } from "styled-components";
import { FlexDiv } from "../../../components/common/FlexDiv/FlexDiv";

const ScrollContainer = styled(FlexDiv)`
  ${({ margin, scroll }) => css`
    overflow-x: auto;
    justify-content: start;
    margin: ${margin || "0"};
    padding-bottom: 1.5rem;
  `}

  /* 스크롤바 영역 */
  &::-webkit-scrollbar {
    width: 50%;
    height: 0.5rem;
    // background-color: var(--gray-color);
    // border: 1px solid var(--gray-color);
  }
  /* 스크롤바 뒷배경 */
  ::-webkit-scrollbar-track {
    height: 1px;
    background: rgba(33, 122, 244, 0.1);
  }
  /* 스크롤바 */
  ::-webkit-scrollbar-thumb {
    width: 30%;
    border-radius: 0.25rem;
    background-color: var(--pink-sub-color);
  }
`;

export { ScrollContainer };
