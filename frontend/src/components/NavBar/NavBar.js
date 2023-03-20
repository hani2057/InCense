import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BsBell } from "react-icons/bs";
import { BsFillBellFill } from "react-icons/bs";
import { FlexDiv } from "../common/FlexDiv/FlexDiv";
import { NavWrapper, NavTitle, NavItem, NavLogInStatus } from "./style";

const NavBar = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  return (
    <NavWrapper
      style={{
        display: `${
          pathname === "/login" || pathname === "/signup" || pathname === "/"
            ? "none"
            : "flex"
        }`,
      }}
    >
      <FlexDiv width="auto">
        <NavTitle to="/">
          <img src="/assets/images/Icon.svg" alt="logo" />
          {/* <NavTitle>Home</NavTitle> */}
        </NavTitle>
        <NavTitle to="/" title={true}>
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
        <BsBell />
        <NavLogInStatus>Log out</NavLogInStatus>
      </FlexDiv>
    </NavWrapper>
  );
};

export default NavBar;
