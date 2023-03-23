import styled, { css } from "styled-components";
import { FlexDiv } from "../../components/common/FlexDiv/FlexDiv";

const SignUpSpan = styled.span`
  font-family: "Noto Serif KR", serif;
  font-size: 1.4rem;
  line-height: 2rem;
`;

const SignUpItemWrapper = styled(FlexDiv)`
  justify-content: start;
  width: auto;
  margin-bottom: 2rem;
`;

const SignUpInput = styled.input`
  width: 23rem;
  height: 3rem;
  border-bottom: 1px solid var(--gray-color);
  font-size: 1.2rem;
  padding: 0.7rem;
  margin-right: 3rem;

  &::placeholder {
    color: var(--gray-color);
  }

  &:focus {
    border-bottom: 1px solid var(--main-color);
    box-shadow: 0 10px 10px -10px var(--main-color);
  }

  /*&:focus::after {
    content: "";
    display: block;
    background-color: var(--main-color);
    width: 23rem;
    height: 3rem;
  }*/

  &:focus + span {
    color: ${(props) =>
      props.msgColor
        ? "var(--" + props.msgColor + "-color)"
        : "var(--main-color)"};
  }
`;

const SignUpMsg = styled.span`
  ${({ color }) => css`
    font-size: 0.75rem;
    padding: 0.5rem 0 0 0.5rem;
    color: ${color ? "var(--" + color + "-color)" : "var(--gray-color)"};
    height: 1.25rem;
  `}
`;

export { SignUpSpan, SignUpItemWrapper, SignUpInput, SignUpMsg };
