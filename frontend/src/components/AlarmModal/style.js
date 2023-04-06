import styled, { css } from "styled-components";
import { FlexDiv } from "../common/FlexDiv/FlexDiv";

const AlarmContainer = styled.div`
  width: 18rem;
  height: 31rem;
  text-align: center;
  box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: var(--nav-height);
  right: 4rem;
  background: white;
  overflow: auto;
  z-index: 1000;

  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
  /* 크롬, 사파리, 오페라, 엣지 */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const AlarmWrapper = styled(FlexDiv)`
  border-bottom: 1px solid var(--gray-color);
  position: relative;
`;

const AlarmSpan = styled.span`
  ${({ size, weight, pointer }) => css`
    font-size: ${size || "1rem"};
    font-weight: ${weight || "400"};
    padding: 0.3rem 0.5rem;
    cursor: ${pointer ? "pointer" : "default"};
  `}
`;

const AlarmDeleteIcon = styled.img`
  position: absolute;
  top: 0.5rem;
  left: 16rem;
  cursor: pointer;
  width: 1rem;
  height: 1rem;
  color: var(--dark-gray-color);
  stroke: var(--dark-gray-color);
`;

export { AlarmContainer, AlarmWrapper, AlarmSpan, AlarmDeleteIcon };
