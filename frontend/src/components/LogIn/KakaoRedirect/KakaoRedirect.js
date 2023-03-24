import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { defaultInstance } from "../../../apis";
import api from "../../../apis/api";
import Loading from "../../common/Loading/Loading";
// import { useDispatch } from "react-redux";
// import { actionCreators as userActions } from "../redux/modules/user";
// import Spinner from "./Spinner";

const KakaoRedirect = (props) => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    kakaoLogin(code);
  }, []);
  // React.useEffect(async () => {
  //   await dispatch(userActions.kakaoLogin(code));
  // }, []);

  const kakaoLogin = async (code) => {
    const res = await api.user.login("kakao", { params: { code: code } });
    if (res.accessToken) navigate("/");
    else
      navigate("/signup", {
        state: { email: res.email, type: res.type },
      });
  };

  return <Loading />;
};

export default KakaoRedirect;
