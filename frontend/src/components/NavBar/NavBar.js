import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsBell } from "react-icons/bs";
// import { BsFillBellFill } from "react-icons/bs";
import { FlexDiv } from "../common/FlexDiv/FlexDiv";
import { NavWrapper, NavTitle, NavItem, NavLogInStatus } from "./style";
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
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
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

  const alarmClick = () => {
    dispatch({ type: "ON_ALARM_CHANGE" });
    setAlarmOpen((prev) => !prev);
  };

  // const isAlarmList = () =>{

  //   const len = alarmList.filter((data)=>data.isReceived==0).length;
  //   console.log("len!!!!"+len)
  //   console.log("len!!!!!!:"+alarmList);
  //   return len>0;
  // }

  useEffect(() => {
    dispatch({ type: "INIT_ALARM" });
    console.log("init alarm");
  }, []);

  useEffect(() => {
    console.log(alarmCount + "alarmCount");
    const len = alarmList.filter((data) => data.isReceived == 0).length;
    setAlarmLen(len);
  }, [alarmCount]);

  useEffect(() => {
    console.log(alarmLen);
  }, [alarmLen]);

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
          {alarmLen > 0 ? (
            <NotificationAddIcon onClick={alarmClick} />
          ) : (
            <BsBell onClick={alarmClick} style={{ cursor: "pointer" }} />
          )}

          <NavLogInStatus
            onClick={() => {
              if (isLoggedIn) dispatch(logout());
              else navigate("/login");
            }}
          >
            {isLoggedIn ? "Log out" : "Log in"}
          </NavLogInStatus>
        </FlexDiv>
      </NavWrapper>

      {alarmOpen && <AlarmModal setAlarmOpen={setAlarmOpen} />}

      <div style={{ paddingTop: "var(--nav-height)" }}>
        <Outlet />
      </div>
    </>
  );
};

export default NavBar;
