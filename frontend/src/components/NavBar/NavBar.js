<<<<<<< HEAD
import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
=======
import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
>>>>>>> 5b2e725b12140d3a89639cffc5e4ff0ed7a45489
import { BsBell } from "react-icons/bs";
import { BsFillBellFill } from "react-icons/bs";
import { FlexDiv } from "../common/FlexDiv/FlexDiv";
import { NavWrapper, NavTitle, NavItem, NavLogInStatus } from "./style";
<<<<<<< HEAD
=======
import AlarmModal from "../AlarmModal/AlarmModal";
import { logout } from "../../store/slice/userSlice";
import { selectAlarmCount, initAlarmCount } from "../../store/slice/alarmSlice";
>>>>>>> 5b2e725b12140d3a89639cffc5e4ff0ed7a45489

const NavBar = () => {
  const { pathname } = useLocation();
<<<<<<< HEAD

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

=======
  const [alarmOpen, setAlarmOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.userReducers.isLoggedIn);
  const alarmCount = useSelector(selectAlarmCount);
  const alarmClick = () => {
    dispatch(initAlarmCount());
    setAlarmOpen((prev) => !prev);
  };
>>>>>>> 5b2e725b12140d3a89639cffc5e4ff0ed7a45489
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
<<<<<<< HEAD
          <BsBell />
          <NavLogInStatus>Log out</NavLogInStatus>
=======
          {alarmCount > 0 ? (
            <button onClick={alarmClick}>알람 옴</button>
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
>>>>>>> 5b2e725b12140d3a89639cffc5e4ff0ed7a45489
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
