import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsBell } from "react-icons/bs";
import { FlexDiv } from "../common/FlexDiv/FlexDiv";
import {
  NavWrapper,
  NavTitle,
  NavItem,
  NavLogInStatus,
  AlarmCnt,
  AlarmSpan,
} from "./style";
import AlarmModal from "../AlarmModal/AlarmModal";
import { logout } from "../../store/slice/userSlice";
import {
  initAlarmCount,
  selectAlarmList,
  selectAlarmCount,
  setAlarmList,
  increaseAlarmCount,
  selectAlarmLen,
} from "../../store/slice/alarmSlice";
import api from "../../apis/api";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isLoggedIn = useSelector((state) => state.userReducers.isLoggedIn);
  const alarmList = useSelector(selectAlarmList);

  const alarmCount = useSelector(selectAlarmCount);

  const [alarmOpen, setAlarmOpen] = useState(false);
  const [alarmLen, setAlarmLen] = useState(0);

  // 디테일 페이지에서 List에 active 추가
  useEffect(() => {
    if (pathname === "/list" || pathname.startsWith("/detail")) {
      document.querySelector("#listNav").classList.add("active");
    } else {
      document.querySelector("#listNav").classList.remove("active");
    }
  }, [pathname]);

  // 알람 이모티콘 클릭
  const alarmClick = () => {
    if (alarmOpen === true) {
      setAlarmLen(0);
    } else {
      dispatch({ type: "ON_ALARM_CHANGE" });
    }
    setAlarmOpen((prev) => !prev);
  };

  // 웹소켓 연결
  useEffect(() => {
    dispatch({ type: "INIT_ALARM" });
    // console.log("init alarm");
  }, []);

  // 알람 갯수가 바뀔 때마다 alarmLen을 업데이트
  useEffect(() => {
    const len = alarmList.filter((data) => data.isReceived === 0).length;
    setAlarmLen(len);
  }, [alarmCount]);

  return (
    <>
      <NavWrapper pathname={pathname}>
        <FlexDiv width="auto">
          <NavTitle to="/">
            <img src="/assets/images/Icon.svg" alt="logo" />
          </NavTitle>
          <NavTitle to="/" style={{ paddingLeft: "0" }}>
            In Cense
          </NavTitle>
        </FlexDiv>
        <FlexDiv width="auto">
          <NavItem to="/test">Test</NavItem>
          <NavItem to="/list" id="listNav">
            Perfumes
          </NavItem>
          <NavItem to="/share">Share/Sell</NavItem>
          <NavItem to="/profile">My Page</NavItem>
        </FlexDiv>
        <FlexDiv width="auto">
          <div style={{ position: "relative" }}>
            <BsBell onClick={alarmClick} style={{ cursor: "pointer" }} />
            {alarmLen > 0 && <AlarmCnt>{alarmLen}</AlarmCnt>}
          </div>
          <NavLogInStatus
            onClick={() => {
              if (isLoggedIn) {
                dispatch(logout());
                setAlarmLen(0);
              } else {
                navigate("/login");
              }
            }}
          >
            {isLoggedIn ? "Log out" : "Log in"}
          </NavLogInStatus>
        </FlexDiv>
      </NavWrapper>

      {alarmOpen && (
        <AlarmModal alarmOpen={alarmOpen} setAlarmOpen={setAlarmOpen} />
      )}

      <div style={{ paddingTop: "var(--nav-height)" }}>
        <Outlet />
      </div>
    </>
  );
};

export default NavBar;
