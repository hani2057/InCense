import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FlexDiv } from "../common/FlexDiv/FlexDiv";

const NavWrapper = styled(FlexDiv)`
  height: 88px;
  justify-content: space-between;
`;

const NavTitle = styled(NavLink)`
  font-family: "Federo", sans-serif;
  font-size: 24px;
  padding-left: 1rem;
`;

const NavItem = styled(NavLink)`
  padding: 0 1rem;
  font-size: 22px;
`;

const NavLogInStatus = styled.span`
  padding: 0 1rem;
`;

export { NavWrapper, NavTitle, NavItem, NavLogInStatus };
