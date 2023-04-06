import styled, { css } from "styled-components";

const NoteAnalysisContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 10rem 1fr;
  grid-template-rows: repeat(3, 3rem);
  column-gap: 1rem;
  margin-bottom: 10rem;
`;

const NoteSpan = styled.span`
  ${({ align, bold }) => css`
    text-align: ${align || "center"};
    font-weight: ${bold ? "700" : "400"};
    line-height: 3rem;
  `}
`;

const NoteCircle = styled.div`
  ${({ weight, isSimilar, isBase }) => css`
    display: inline;
    width: ${isSimilar ? (weight * 3) ** 5 : (weight * 11) ** 1.5}px;
    height: ${isSimilar ? (weight * 3) ** 5 : (weight * 11) ** 1.5}px;
    border-radius: 50%;
    background-color: var(--${isBase ? "pink-main" : "main"}-color);
    margin-right: 0.5px;
    position: relative;

    &::after {
      content: attr(data-content);
      width: auto;
      height: auto;
      padding: 0.5rem;
      border: 1px solid var(--${isBase ? "pink-main" : "main"}-color);
      color: var(--${isBase ? "pink-main" : "main"}-color);
      background: white;
      position: absolute;
      bottom: 2rem;
      transform: translateX(-40%);
      display: none;
    }
    &:hover::after {
      display: block;
    }
  `}
`;

export { NoteAnalysisContainer, NoteSpan, NoteCircle };
