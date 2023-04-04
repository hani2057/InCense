import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import api from "../../../apis/api";
import { FlexDiv } from "../../common/FlexDiv/FlexDiv";
import {
  ProfileInfoWrapper,
  ProfileImg,
  ProfileGrade,
  ProfileInfoSpan,
} from "./style";

const ProfileInfo = () => {
  const [userInfo, setUserInfo] = useState(null);

  // 유저 정보 불러오기
  const fetchGetUserInfo = async () => {
    const res = await api.user.getInfo();
    setUserInfo(res);
  };

  useEffect(() => {
    fetchGetUserInfo();
  }, []);

  if (!userInfo) return null;

  const ageRange =
    Math.floor((dayjs().year() - userInfo.birth[0] + 1) / 10) * 10;

  return (
    <ProfileInfoWrapper direction="column" justify="start">
      <ProfileImg src={userInfo.profile} alt="profile" />
      <FlexDiv
        width="10rem"
        height="auto"
        padding="1rem 0 2.5rem 0"
        style={{ position: "relative" }}
      >
        <span style={{ fontWeight: "700" }}>{userInfo.nickname}</span>
        <img
          src="/assets/icons/edit.svg"
          alt="modify"
          style={{ position: "absolute", right: "0" }}
        />
      </FlexDiv>
      <FlexDiv height="auto" justify="start">
        <ProfileGrade alt="grade" grade={userInfo.grade_name} />
        <FlexDiv direction="column" align="start" width="auto">
          {/* <ProfileInfoSpan>{userInfo.email}</ProfileInfoSpan> */}
          <FlexDiv justify="start">
            <ProfileInfoSpan bold={true}>
              {userInfo.gender ? "여성" : "남성"}
            </ProfileInfoSpan>
            <ProfileInfoSpan>
              {/* {userInfo.genderOpen ? null : (
                <img src="/assets/icons/lock.svg" alt="locked" />
              )} */}
              {userInfo.genderOpen ? "공개" : "비공개"}
            </ProfileInfoSpan>
          </FlexDiv>
          <FlexDiv justify="start">
            <ProfileInfoSpan bold={true}>{`${ageRange}대`}</ProfileInfoSpan>
            <ProfileInfoSpan>
              {/* {userInfo.birthOpen ? null : (
                <img src="/assets/icons/lock.svg" alt="locked" />
              )} */}
              {userInfo.birthOpen ? "공개" : "비공개"}
            </ProfileInfoSpan>
          </FlexDiv>
          <FlexDiv justify="start">
            <ProfileInfoSpan bold={true}>알림</ProfileInfoSpan>
            <ProfileInfoSpan>
              {userInfo.alarmOpen ? "받음" : "받지 않음"}
            </ProfileInfoSpan>
          </FlexDiv>
        </FlexDiv>
      </FlexDiv>
    </ProfileInfoWrapper>
  );
};

export default ProfileInfo;
