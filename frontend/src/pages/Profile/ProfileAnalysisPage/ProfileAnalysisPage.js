import React from "react";
import { FlexDiv } from "../../../components/common/FlexDiv/FlexDiv";
import ProfileTitleBox from "../../../components/Profile/ProfileTitleBox/ProfileTitleBox";
import { ProfileOutletContainer } from "../ProfilePage/style";

const ProfileAnalysisPage = () => {
  // 더미데이터
  const name = "닉네임";

  return (
    <ProfileOutletContainer>
      <FlexDiv direction="column">
        <ProfileTitleBox bgimgNo={1} title={`${name}님의 취향 분석 결과`} />
        <ProfileTitleBox bgimgNo={1} title={"I want it 향수 취향 적중도"} />

        <ProfileTitleBox
          bgimgNo={1}
          title={`${name}님의 취향 기반 추천 향수`}
        />
      </FlexDiv>
    </ProfileOutletContainer>
  );
};

export default ProfileAnalysisPage;
