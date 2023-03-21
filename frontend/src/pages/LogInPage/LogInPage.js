import React from "react";
import { FlexDiv } from "../../components/common/FlexDiv/FlexDiv";
import { TitleSpan, LoginBtn } from "./style";

const LogInPage = () => {
  return (
    <FlexDiv height="100vh">
      <FlexDiv
        direction="column"
        justify="center"
        width="45%"
        style={{ backgroundImage: "url('/assets/images/bgimg1.png')" }}
      >
        <TitleSpan>In</TitleSpan>
        <TitleSpan>Cense</TitleSpan>
      </FlexDiv>
      <FlexDiv direction="column" gap="1rem">
        <span style={{ fontSize: "2rem", marginBottom: "4rem" }}>Log In</span>
        <LoginBtn>KaKao</LoginBtn>
        <LoginBtn>Naver</LoginBtn>
        <LoginBtn>Google</LoginBtn>
      </FlexDiv>
    </FlexDiv>
  );
};

export default LogInPage;
