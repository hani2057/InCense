// 리다이렉트될 화면

import axios from "axios";
import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { actionCreators as userActions } from "../redux/modules/user";
// import Spinner from "./Spinner";

const KakaoRedirect = (props) => {
  // const dispatch = useDispatch();

  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    kakaoLogin(code);
  }, []);
  // React.useEffect(async () => {
  //   await dispatch(userActions.kakaoLogin(code));
  // }, []);

  const kakaoLogin = async (code) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/auth/login/kakao",
        { params: { code: code } }
      );
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return <span>로그인 리다이렉트중</span>;
};

export default KakaoRedirect;
