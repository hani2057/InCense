import React from "react";
import { FlexDiv } from "../../../components/common/FlexDiv/FlexDiv";
import { ScrollContainer } from "../../../components/common/ScrollContainer/ScrollContainer";
import ProfileTitleBox from "../../../components/Profile/ProfileTitleBox/ProfileTitleBox";
import WantAnalysisCard from "../../../components/Profile/WantAnalysisCard/WantAnalysisCard";
import Wordcloud from "../../../components/Profile/Wordcloud/Wordcloud";
import { ProfileOutletContainer } from "../ProfilePage/style";

const ProfileAnalysisPage = () => {
  // 더미데이터
  const name = "닉네임";
  const iWantItList = [
    {
      name: "fleur de peau",
      brand: "Diptyque",
      img: "perfumes/1.jpg",
    },
    {
      name: "fleur de peau",
      brand: "Diptyque",
      img: "perfumes/1.jpg",
    },
    {
      name: "fleur de peau",
      brand: "Diptyque",
      img: "perfumes/1.jpg",
    },
    {
      name: "fleur de peau",
      brand: "Diptyque",
      img: "perfumes/1.jpg",
    },
    {
      name: "fleur de peau",
      brand: "Diptyque",
      img: "perfumes/1.jpg",
    },
    {
      name: "fleur de peau",
      brand: "Diptyque",
      img: "perfumes/1.jpg",
    },
  ];

  return (
    <ProfileOutletContainer>
      <FlexDiv direction="column">
        <ProfileTitleBox bgimgNo={1} title={`${name}님의 취향 분석 결과`} />
        <Wordcloud />

        <ProfileTitleBox bgimgNo={1} title={"I want it 향수 예상 평점"} />

        <ScrollContainer margin="0 0 10rem 0">
          {iWantItList.map(({ name, brand, img }, idx) => (
            <WantAnalysisCard
              name={name}
              brand={brand}
              img={img}
              percent={80}
              key={idx}
            />
          ))}
        </ScrollContainer>

        <ProfileTitleBox
          bgimgNo={1}
          title={`${name}님의 취향 기반 추천 향수`}
        />
      </FlexDiv>
    </ProfileOutletContainer>
  );
};

export default ProfileAnalysisPage;
