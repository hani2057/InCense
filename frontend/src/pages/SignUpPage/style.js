import styled, { css } from "styled-components";
import { FlexDiv } from "../../components/common/FlexDiv/FlexDiv";

const SignUpSpan = styled.span`
  font-family: "Noto Serif KR", serif;
  font-size: 1.4rem;
  line-height: 2rem;
`;

const SignUpItemWrapper = styled(FlexDiv)``;

const SignUpItem = styled(FlexDiv)`
  justify-content: start;
  width: auto;
  margin-bottom: 1.5rem;
`;

const SignUpInput = styled.input`
  width: 23rem;
  height: 3rem;
  border-bottom: 1px solid var(--gray-color);
  font-size: 1.2rem;
  padding: 0.7rem;
  margin-right: 2.5rem;

  &::placeholder {
    color: var(--gray-color);
  }
`;

const SignUpMsg = styled.span`
  ${({ color }) => css`
    font-size: 0.75rem;
    padding-top: 0.5rem;
    color: ${color ? "var(--" + color + "-color)" : "var(--gray-color)"};
  `}
`;

export { SignUpSpan, SignUpItemWrapper, SignUpItem, SignUpInput, SignUpMsg };
