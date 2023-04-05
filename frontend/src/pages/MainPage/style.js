import styled, { css } from "styled-components";
import mainimg1 from "./images/mainimg1.png";
import mainimg2 from "./images/mainimg2.png";
import mainimg3 from "./images/mainimg3.png";
import mainimg4 from "./images/mainimg4.png";

const MainContainer = styled.div`
  ${({ idx }) => css`
    width: 100vw;
    height: 100vh;
    background-image: url(${idx === 1
      ? mainimg1
      : idx === 2
      ? mainimg2
      : idx === 3
      ? mainimg3
      : mainimg4});
    background-size: cover;
    display: flex;
    align-items: end;
    transition: all 0.15s ease-out;
  `}
`;

const MainItemWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 25%;
  height: 12rem;
  cursor: pointer;
  color: var(--white-color);
  transition: all 0.4s ease-out;

  &:hover {
    color: var(--font-color);
    height: calc(12rem + 5rem);
  }
  &:hover .nav {
    display: inline;
  }
`;

const MainSpan = styled.span`
  ${({ size }) => css`
    font-size: ${size || "1rem"};
  `}
`;

export { MainContainer, MainItemWrapper, MainSpan };
