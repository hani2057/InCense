import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { defaultInstance } from "../../../apis";
import api from "../../../apis/api";
import Loading from "../../common/Loading/Loading";
<<<<<<< HEAD
// import { useDispatch } from "react-redux";
// import { actionCreators as userActions } from "../redux/modules/user";
// import Spinner from "./Spinner";
=======
>>>>>>> 5b2e725b12140d3a89639cffc5e4ff0ed7a45489

const KakaoRedirect = (props) => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    kakaoLogin(code);
  }, []);

  const kakaoLogin = async (code) => {
<<<<<<< HEAD
    const res = await api.user.login("kakao", { params: { code: code } });
    if (res.accessToken) navigate("/");
    else
=======
    const res = await api.user.login("kakao", code);
    if (res.accessToken) {
      dispatch(login({ accessToken: res.accessToken }));
      // dispatch({ type: "START_WEBSOCKET" });
      navigate("/");
    } else
>>>>>>> 5b2e725b12140d3a89639cffc5e4ff0ed7a45489
      navigate("/signup", {
        state: { email: res.email, type: res.type },
      });
  };

  return <Loading />;
};

export default KakaoRedirect;
