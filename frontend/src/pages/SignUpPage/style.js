import styled from "styled-components";

const SignUpSpan = styled.span`
  font-family: "Noto Serif KR", serif;
  font-size: 1.4rem;
  line-height: 2rem;
`;

const SignUpInput = styled.input`
  width: 22rem;
  border-bottom: 1px solid var(--gray-color);
  font-size: 1.3rem;
  padding: 0.7rem;
  margin-right: 2.5rem;

  &::placeholder {
    color: var(--gray-color);
  }
`;

export { SignUpSpan, SignUpInput };
