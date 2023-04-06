import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import api from "../../../apis/api";
import { updateTasteTime } from "../../../store/slice/userSlice";
import { FlexDiv } from "../../common/FlexDiv/FlexDiv";
import {
  ProfileInfoWrapper,
  ProfileImg,
  ProfileGrade,
  ProfileInfoSpan,
} from "./style";
import ModifyModal from "../ModifyModal/ModifyModal";

const ProfileInfo = () => {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState(null);
  const [modifyModalOpen, setModifyModalOpen] = useState(false);

  // 유저 정보 불러오기
  const fetchGetUserInfo = async () => {
    const res = await api.user.getUserInfo();
    setUserInfo(res);
    dispatch(updateTasteTime({ updateTasteTime: res.lastTime }));
  };

  useEffect(() => {
    fetchGetUserInfo();
  }, []);

  if (!userInfo) return null;

  const {
    nickname,
    gender,
    genderOpen,
    alarmOpen,
    birth,
    birthOpen,
    profile,
    grade_name,
  } = userInfo;

  const ageRange = Math.floor((dayjs().year() - birth[0] + 1) / 10) * 10;

  return (
    <>
      <ProfileInfoWrapper direction="column" justify="start">
        <ProfileImg src={profile} alt="profile" />
        <FlexDiv
          width="10rem"
          height="auto"
          padding="1rem 0 2.5rem 0"
          style={{ position: "relative" }}
        >
          <span style={{ fontWeight: "700" }}>{nickname}</span>
          <img
            src="/assets/icons/edit.svg"
            alt="modify"
            style={{ position: "absolute", right: "0", cursor: "pointer" }}
            onClick={() => setModifyModalOpen(true)}
          />
        </FlexDiv>
        <FlexDiv height="auto" justify="start">
          <ProfileGrade alt="grade" grade={grade_name} />
          <FlexDiv direction="column" align="start" width="auto">
            <FlexDiv justify="start">
              <ProfileInfoSpan bold={true}>
                {gender ? "여성" : "남성"}
              </ProfileInfoSpan>
              <ProfileInfoSpan>
                {/* {userInfo.genderOpen ? null : (
                <img src="/assets/icons/lock.svg" alt="locked" />
              )} */}
                {genderOpen ? "공개" : "비공개"}
              </ProfileInfoSpan>
            </FlexDiv>
            <FlexDiv justify="start">
              <ProfileInfoSpan bold={true}>{`${ageRange}대`}</ProfileInfoSpan>
              <ProfileInfoSpan>
                {/* {userInfo.birthOpen ? null : (
                <img src="/assets/icons/lock.svg" alt="locked" />
              )} */}
                {birthOpen ? "공개" : "비공개"}
              </ProfileInfoSpan>
            </FlexDiv>
            <FlexDiv justify="start">
              <ProfileInfoSpan bold={true}>알림</ProfileInfoSpan>
              <ProfileInfoSpan>
                {alarmOpen ? "받음" : "받지 않음"}
              </ProfileInfoSpan>
            </FlexDiv>
          </FlexDiv>
        </FlexDiv>
      </ProfileInfoWrapper>

      {modifyModalOpen && (
        <ModifyModal
          setModalOpen={setModifyModalOpen}
          name={nickname}
          img={profile}
          birth={birth}
          birthOpen={birthOpen}
          gender={gender}
          genderOpen={genderOpen}
          alarm={alarmOpen}
          fetchGetUserInfo={fetchGetUserInfo}
        />
      )}
    </>
  );
};

export default ProfileInfo;
