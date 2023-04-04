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
    background-color: var(--gray-color);
    border-radius: 0.5rem;

    &::after {
      content: "";
      display: inline-block;
      width: ${(step / 4) * 100}%;
      height: 1rem;
      background-color: var(--main-color);
      border-radius: 0.5rem;
    }
  `}
`;

const TestWrapper = styled(FlexDiv)``;

const GlowBox = styled.div`
  ${(width, height) => css`
    width: ${width || "auto"};
    height: ${height || "auto"};
    border: 1px solid var(--gray-color);

    &:hover {
      box-shadow: 0 0 20px -5px var(--pink-sub-color);
    }
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

export { TestContainer, TestWrapper, TestStepBar, GlowBox, TestBtn };
