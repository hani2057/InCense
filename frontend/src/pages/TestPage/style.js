import styled, { css } from "styled-components";
import { FlexDiv } from "../../components/common/FlexDiv/FlexDiv";

const TestContainer = styled(FlexDiv)`
  flex-direction: column;
  height: calc(100vh - var(--nav-height));
`;

const TestStepBar = styled.div`
  ${({ step }) => css`
    width: 60%;
    height: 1rem;
    // background-color: var(--gray-color);
    border: 1px solid var(--gray-color);
    border-radius: 0.5rem;

    &::after {
      content: "";
      display: inline-block;
      width: ${((step - 1) / 6) * 100}%;
      height: 1rem;
      background-color: var(--main-color);
      border-radius: 0.5rem;
    }
  `}
`;

const TestWrapper = styled(FlexDiv)`
  flex-direction: column;
`;

const TestItemWrapper = styled(FlexDiv)`
  &:hover .changeColorWhenHover {
    color: var(--pink-main-color);
  }
`;

const TestSpan = styled.span`
  ${({ size, bold, padding, margin }) => css`
    font-size: ${size || "1rem"};
    font-weight: ${bold ? "700" : "400"};
    padding: ${padding || "0"};
    margin: ${margin || "0"};
  `}
`;

const GlowBox = styled.div`
  ${({ width, height, padding, margin, pointer, color }) => css`
    width: ${width || "auto"};
    height: ${height || "auto"};
    border: 1px solid var(--gray-color);
    padding: ${padding || "0"};
    margin: ${margin || "0"};
    cursor: ${pointer ? "pointer" : "auto"};

    &:hover {
      box-shadow: 0 0 20px -5px var(--${color || "pink-sub"}-color);
    }
  `}
`;

const TestImg = styled.img`
  ${({ width, height, pointer }) => css`
    width: ${width};
    height: ${height};
    cursor: ${pointer ? "pointer" : "auto"};
    border-radius: 10px;
    object-fit: cover;
  `}
`;

const TestBtn = styled.button`
  width: 10rem;
  height: 3rem;
  border: 1px solid var(--gray-color);
  margin: 1.5rem;

  &:hover {
    box-shadow: 0 0 20px -5px var(--main-color);
  }
`;

export {
  TestContainer,
  TestWrapper,
  TestItemWrapper,
  TestStepBar,
  TestSpan,
  GlowBox,
  TestImg,
  TestBtn,
};
