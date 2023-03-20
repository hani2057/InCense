import React from "react";
import axios from "axios";
import { FlexDiv } from "../../components/common/FlexDiv/FlexDiv";
import { TitleSpan, LoginBtn } from "./style";

const CLIENT_ID = `885f85b9b3a981a7a2a73071720fb28e`;
const REDIRECT_URI = `http://localhost:3000/signup`;
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
// const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize`;

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
        <a href={KAKAO_AUTH_URL}>
          <LoginBtn>KaKao</LoginBtn>
        </a>
        <LoginBtn>Naver</LoginBtn>
        <LoginBtn>Google</LoginBtn>
      </FlexDiv>
    </FlexDiv>
  );
};

export default LogInPage;
