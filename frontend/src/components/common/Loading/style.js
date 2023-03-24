import styled, { css, keyframes } from "styled-components";

const grow = keyframes`

  0% , 40% , 100% {
    transform:scale(0.2);
  }
  20% {
     transform:scale(1);
  }
`;

const LoadingWrapper = styled.ul`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  padding: 0;
  display: flex;
`;

const LoadingElement = styled.li`
  ${({ color, delaySec }) => css`
    list-style: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #fff;
    animation: ${grow} 2s ease-in-out infinite;
    animation-delay: ${delaySec};
    box-shadow: 0 0 50px ${color};
  `}
`;

export { LoadingWrapper, LoadingElement };
