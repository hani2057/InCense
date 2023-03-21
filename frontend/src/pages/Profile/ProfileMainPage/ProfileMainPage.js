import React from "react";
import { FlexDiv } from "../../../components/common/FlexDiv/FlexDiv";
import ProfileMainBtn from "../../../components/Profile/ProfileMainBtn/ProfileMainBtn";
import { ProfileOutletContainer } from "../ProfilePage/style";

const ProfileMainPage = () => {
  return (
    <ProfileOutletContainer>
      <FlexDiv>
        <ProfileMainBtn />
        <ProfileMainBtn />
        <ProfileMainBtn />
      </FlexDiv>
    </ProfileOutletContainer>
  );
};

export default ProfileMainPage;
