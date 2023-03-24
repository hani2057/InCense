import React from "react";
import { Outlet } from "react-router-dom";
import { FlexDiv } from "../../../components/common/FlexDiv/FlexDiv";
import ProfileInfo from "../../../components/Profile/ProfileInfo/ProfileInfo";

const ProfilePage = () => {
  return (
    <FlexDiv>
      <ProfileInfo />
      <Outlet />
    </FlexDiv>
  );
};

export default ProfilePage;
