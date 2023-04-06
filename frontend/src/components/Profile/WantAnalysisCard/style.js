import styled, { css, keyframes } from "styled-components";

const circleSize = keyframes`
from {
    width: 250px;
    height: 250px;
}
to {
    width: 300px;
    height: 300px;
}
`;
const shadowRotate = keyframes`
from {
    transform: translate(-50%, -50%) rotate(0deg);
}
to {
    transform: translate(-50%, -50%) rotate(360deg);
}
`;

const AnalysisCardSpan = styled.span`
  ${({ size, weight, color, zIndex, position }) => css`
    font-size: ${size || "1rem"};
    font-weight: ${weight || "400"};
    font-color: ${color || "var(--font-color)"};
    z-index: ${zIndex || "0"};
    position: ${position || "static"};
  `}
`;

const AnalysisPercent = styled.div`
  position: absolute;
  top: 55%;
  left: 70%;
  transform: translate(-50%, -50%);

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 100%;
    z-index: 2;
    box-shadow: 0 0 0.5rem 0.5rem white;
  }

  &::before {
    width: 6rem;
    height: 6rem;
    // background-color: #1a084e;
    background-color: white;
  }

  // &::after {
  //   width: 6.25rem;
  //   height: 6.25rem;
  //   background-color: #2f1e5f;
  //   animation: ${circleSize} 0.8s linear infinite alternate;
  // }

  & div {
    width: 6rem;
    height: 6rem;
    position: absolute;
    top: 50%;
    left: 50%;
    // transform: translate(-50%, -50%);
    border-radius: 100%;
    z-index: 1;
    box-shadow: 0.25rem -0.2rem 0.65rem 0.375rem #823ca6,
      0.6rem -0.25rem 1.175rem 0.25rem #aab3d2,
      -0.525rem -0.5rem 1.6rem 0.25rem #5acee3,
      0.3rem 0.275rem 0.425rem 0.25rem #1b7d8f,
      0.075rem 0.05rem 1.925rem 0.25rem #f30bf5;
    animation: ${shadowRotate} 1.5s linear infinite;
    transform-origin: center;
  }
`;

export { AnalysisCardSpan, AnalysisPercent };
