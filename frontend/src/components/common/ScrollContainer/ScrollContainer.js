import styled, { css } from "styled-components";
import { FlexDiv } from "../FlexDiv/FlexDiv";

const ScrollContainer = styled(FlexDiv)`
  ${({ margin }) => css`
    overflow-x: scroll;
    justify-content: start;
    margin: ${margin || "0"};
    padding-bottom: 1.5rem;
  `}

  /* 스크롤바 영역 */
  &::-webkit-scrollbar {
    width: 50%;
    height: 3px;
    background-color: var(--gray-color);
  }
  /* 스크롤바 뒷배경 */
  ::-webkit-scrollbar-track {
    height: 1px;
    background: rgba(33, 122, 244, 0.1);
  }
  /* 스크롤바 */
  ::-webkit-scrollbar-thumb {
    width: 30%;
    height: 3px;
    background-color: var(--dark-gray-color);
  }
`;

export { ScrollContainer };
