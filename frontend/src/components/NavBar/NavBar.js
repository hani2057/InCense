import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsBell } from "react-icons/bs";
import { BsFillBellFill } from "react-icons/bs";
import { FlexDiv } from "../common/FlexDiv/FlexDiv";
import { NavWrapper, NavTitle, NavItem, NavLogInStatus } from "./style";
import AlarmModal from "../AlarmModal/AlarmModal";
import { logout } from "../../store/slice/userSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [alarmOpen, setAlarmOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.userReducers.isLoggedIn);

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
          <NavItem to="/list">Perfumes</NavItem>
          <NavItem to="/share">Share/Sell</NavItem>
          <NavItem to="/profile">My Page</NavItem>
        </FlexDiv>
        <FlexDiv width="auto">
          <BsBell
            onClick={() => setAlarmOpen((prev) => !prev)}
            style={{ cursor: "pointer" }}
          />
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

      {alarmOpen && <AlarmModal />}

      <div style={{ paddingTop: "var(--nav-height)" }}>
        <Outlet />
      </div>
    </>
  );
};

export default NavBar;
