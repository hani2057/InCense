import styled from "styled-components";

const TitleSpan = styled.span`
  font-family: "Federo", sans-serif;
  font-size: 2rem;
`;

const LoginBtn = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--dark-gray-color);
  width: 60%;
  max-width: 30rem;
  height: 3.5rem;
  color: var(--gray-color);

  &:hover {
    box-shadow: 0 0 10px var(--main-color);
    border: 1px solid var(--main-color);
    color: var(--main-color);
  }
`;

export { TitleSpan, LoginBtn };

// 테스트용 주석
