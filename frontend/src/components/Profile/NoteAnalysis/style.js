import styled, { css } from "styled-components";

const NoteAnalysisContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 10rem 1fr;
  grid-template-rows: repeat(3, 3rem);
  column-gap: 1rem;
`;

const NoteSpan = styled.span`
  ${({ align, bold }) => css`
    text-align: ${align || "center"};
    font-weight: ${bold ? "700" : "400"};
    line-height: 3rem;
  `}
`;

const NoteCircle = styled.div`
  ${({ weight, color }) => css`
    display: inline;
    width: ${(weight * 5.5) ** 2}px;
    height: ${(weight * 5.5) ** 2}px;
    border-radius: 50%;
    background-color: var(--${color}-color);
    margin-right: 0.5px;
    position: relative;

    &::after {
      content: attr(data-content);
      width: 3rem;
      height: 2rem;
      border: 1px solid var(--${color}-color);
      color: var(--${color}-color);
      position: absolute;
      top: -2.2rem;
      display: none;
    }
    &:hover::after {
      display: block;
    }
  `}
`;

export { NoteAnalysisContainer, NoteSpan, NoteCircle };
