import styled, { css } from "styled-components";
import { FlexDiv } from "../../components/common/FlexDiv/FlexDiv";

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
  `}
`;

const TestBtn = styled.button`
    width: 10rem;
    height: 4rem;
    background
`;

export { TestWrapper, TestStepBar, GlowBox, TestBtn };
