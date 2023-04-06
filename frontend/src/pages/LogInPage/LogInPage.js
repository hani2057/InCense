import React from "react";
import { FlexDiv } from "../../components/common/FlexDiv/FlexDiv";
import { TitleSpan, LoginBtn } from "./style";

const KAKAO_CLIENT_ID = "219f3d4b6069d9e1cbc39012ba719f67";
const KAKAO_REDIRECT_URI = `https://j8a804.p.ssafy.io/oauth/callback/kakao`;
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
const KAKAO_LOCAL_REDIRECT_URI = `http://localhost:3000/oauth/callback/kakao`;
const KAKAO_LOCAL_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_LOCAL_REDIRECT_URI}&response_type=code`;

const NAVER_CLIENT_ID = "N3pZgno1b_CSURFjx9Yw";
const NAVER_REDIRECT_URI = `http://localhost:3000/oauth/callback/naver`;
const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&state=1234`;

const LogInPage = () => {
  return (
    <FlexDiv height="100vh">
      <FlexDiv
        direction="column"
        justify="center"
        width="45%"
        style={{
          backgroundImage: "url('/assets/images/bgimg1.png')",
          backgroundSize: "cover",
        }}
      >
        <TitleSpan>In</TitleSpan>
        <TitleSpan>Cense</TitleSpan>
      </FlexDiv>
      <FlexDiv direction="column" gap="1rem">
        <span style={{ fontSize: "2rem", marginBottom: "4rem" }}>Log In</span>
        <LoginBtn href={KAKAO_AUTH_URL}>KaKao</LoginBtn>
        <LoginBtn href={NAVER_AUTH_URL}>Naver</LoginBtn>
        {/* <LoginBtn>Google</LoginBtn> */}
      </FlexDiv>
    </FlexDiv>
  );
};

export default LogInPage;
