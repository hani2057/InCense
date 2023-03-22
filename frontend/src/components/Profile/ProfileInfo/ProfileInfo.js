import React from "react";
import { FlexDiv } from "../../common/FlexDiv/FlexDiv";
import {
  ProfileInfoWrapper,
  ProfileImg,
  ProfileGrade,
  ProfileInfoSpan,
} from "./style";

const ProfileInfo = () => {
  return (
    <ProfileInfoWrapper direction="column" justify="start">
      <ProfileImg alt="profile" />
      <FlexDiv
        width="10rem"
        height="auto"
        padding="1rem 0 2.5rem 0"
        style={{ position: "relative" }}
      >
        <span style={{ fontWeight: "700" }}>닉네임</span>
        <img
          src="/assets/icons/edit.svg"
          alt="modify"
          style={{ position: "absolute", right: "0" }}
        />
      </FlexDiv>
      <FlexDiv height="auto" justify="start">
        <ProfileGrade alt="grade" grade={"1"} />
        <FlexDiv direction="column" align="start" width="auto">
          <FlexDiv justify="start">
            <ProfileInfoSpan>여성</ProfileInfoSpan>
            <ProfileInfoSpan>
              <img src="/assets/icons/lock.svg" alt="locked" />
            </ProfileInfoSpan>
          </FlexDiv>
          <FlexDiv justify="start">
            <ProfileInfoSpan>1999.01.01.</ProfileInfoSpan>
            <ProfileInfoSpan>
              <img src="/assets/icons/lock.svg" alt="locked" />
            </ProfileInfoSpan>
          </FlexDiv>
          <FlexDiv justify="start">
            <ProfileInfoSpan>알림</ProfileInfoSpan>
            <ProfileInfoSpan>받음</ProfileInfoSpan>
          </FlexDiv>
        </FlexDiv>
      </FlexDiv>
    </ProfileInfoWrapper>
  );
};

export default ProfileInfo;
