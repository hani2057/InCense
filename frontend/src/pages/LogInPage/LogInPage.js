import React from "react";
import { FlexDiv } from "../../components/common/FlexDiv/FlexDiv";
import { TitleSpan, LoginBtn } from "./style";

const LogInPage = () => {
  return (
    <FlexDiv height="100vh">
      <FlexDiv direction="column" justify="center">
        <TitleSpan>In</TitleSpan>
        <TitleSpan>Cense</TitleSpan>
      </FlexDiv>
      <FlexDiv direction="column">
        <LoginBtn>KaKao</LoginBtn>
        <LoginBtn>Naver</LoginBtn>
        <LoginBtn>Google</LoginBtn>
      </FlexDiv>
    </FlexDiv>
  );
};

export default LogInPage;
