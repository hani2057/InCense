import React from "react";
import { FlexDiv } from "../../../components/common/FlexDiv/FlexDiv";
import ProfileTitleBox from "../../../components/Profile/ProfileTitleBox/ProfileTitleBox";
import WantAnalysisCard from "../../../components/Profile/WantAnalysisCard/WantAnalysisCard";
import { ProfileOutletContainer } from "../ProfilePage/style";

const ProfileAnalysisPage = () => {
  // 더미데이터
  const name = "닉네임";
  const iWantItList = [
    {
      name: "fleur de peau",
      brand: "Diptyque",
      img: "https://j8a804.p.ssafy.io/api/display?filename=perfumes/test.jpg",
    },
    {
      name: "fleur de peau",
      brand: "Diptyque",
      img: "https://j8a804.p.ssafy.io/api/display?filename=perfumes/test.jpg",
    },
    {
      name: "fleur de peau",
      brand: "Diptyque",
      img: "https://j8a804.p.ssafy.io/api/display?filename=perfumes/test.jpg",
    },
    {
      name: "fleur de peau",
      brand: "Diptyque",
      img: "https://j8a804.p.ssafy.io/api/display?filename=perfumes/test.jpg",
    },
    {
      name: "fleur de peau",
      brand: "Diptyque",
      img: "https://j8a804.p.ssafy.io/api/display?filename=perfumes/test.jpg",
    },
    {
      name: "fleur de peau",
      brand: "Diptyque",
      img: "https://j8a804.p.ssafy.io/api/display?filename=perfumes/test.jpg",
    },
  ];

  return (
    <ProfileOutletContainer>
      <FlexDiv direction="column">
        <ProfileTitleBox bgimgNo={1} title={`${name}님의 취향 분석 결과`} />
        <ProfileTitleBox bgimgNo={1} title={"I want it 향수 취향 적중도"} />
        <FlexDiv
          justify="start"
          style={{ overflowX: "scroll", paddingBottom: "10rem" }}
        >
          {iWantItList.map(({ name, brand, img }, idx) => (
            <WantAnalysisCard
              name={name}
              brand={brand}
              imgSrc={img}
              percent={80}
              key={idx}
            />
          ))}
        </FlexDiv>
        <ProfileTitleBox
          bgimgNo={1}
          title={`${name}님의 취향 기반 추천 향수`}
        />
      </FlexDiv>
    </ProfileOutletContainer>
  );
};

export default ProfileAnalysisPage;
