import React from "react";
import ProfileMainBtn from "../../../components/Profile/ProfileMainBtn/ProfileMainBtn";
import { ProfileOutletContainer } from "./style";

const ProfileMainPage = () => {
  return (
    <ProfileOutletContainer>
      <ProfileMainBtn />
      <ProfileMainBtn />
      <ProfileMainBtn />
    </ProfileOutletContainer>
  );
};

export default ProfileMainPage;
