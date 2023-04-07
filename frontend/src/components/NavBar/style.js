import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
import { FlexDiv } from "../common/FlexDiv/FlexDiv";

const NavWrapper = styled(FlexDiv)`
  ${({ pathname }) => css`
    display: ${pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/"
      ? "none"
      : "flex"};
    position: fixed;
    height: var(--nav-height);
    background-color: white;
    justify-content: space-between;
    z-index: 1000;
  `}
`;

const NavTitle = styled(NavLink)`
  font-family: "Federo", sans-serif;
  font-size: 24px;
  padding-left: 1rem;
`;

const NavItem = styled(NavLink)`
  padding: 0.5rem 1rem;
  font-size: 22px;
  background: linear-gradient(90deg, var(--main-color) 50%, var(--font-color) 0)
      calc(100% - var(--p, 0%)) / 200% 100%,
    linear-gradient(var(--main-color) 0 0) 0% 100% / var(--p, 0%) 0.1rem
      no-repeat;
  -webkit-background-clip: text, padding-box;
  background-clip: text, padding-box;
  transition: 0.8s;

  &.active {
    --p: 100%;
    color: var(--main-color);
  }
`;

const NavLogInStatus = styled.span`
  margin: 0 1rem 0 1.5rem;
  cursor: pointer;
`;

const AlarmCnt = styled.div`
  width: 0.9rem;
  height: 0.9rem;
  border-radius: 50%;
  background-color: var(--red-color);
  position: absolute;
  top: -0.4rem;
  right: -0.4rem;
  color: white;
  font-size: 0.7rem;
  text-align: center;
  line-height: 0.9rem;
  cursor: pointer;
`;

export { NavWrapper, NavTitle, NavItem, NavLogInStatus, AlarmCnt };
