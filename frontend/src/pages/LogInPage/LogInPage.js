import React from "react";
import { FlexDiv } from "../../components/common/FlexDiv/FlexDiv";
import { TitleSpan, LoginBtn } from "./style";

const CLIENT_ID = `219f3d4b6069d9e1cbc39012ba719f67`;
const REDIRECT_URI = `http://localhost:3000/oauth/callback/kakao`;
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

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
        <LoginBtn href={KAKAO_AUTH_URL}>KaKao</LoginBtn>
        <LoginBtn>Naver</LoginBtn>
        <LoginBtn>Google</LoginBtn>
      </FlexDiv>
    </FlexDiv>
  );
};

export default LogInPage;
