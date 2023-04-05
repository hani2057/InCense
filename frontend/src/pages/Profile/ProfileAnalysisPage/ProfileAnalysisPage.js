import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FlexDiv } from "../../../components/common/FlexDiv/FlexDiv";
import { ScrollContainer } from "../../../components/common/ScrollContainer/ScrollContainer";
import ProfileTitleBox from "../../../components/Profile/ProfileTitleBox/ProfileTitleBox";
import WantAnalysisCard from "../../../components/Profile/WantAnalysisCard/WantAnalysisCard";
import Wordcloud from "../../../components/Profile/Wordcloud/Wordcloud";
import { ProfileOutletContainer } from "../ProfilePage/style";
import api from "../../../apis/api";

const ProfileAnalysisPage = () => {
  const { username } = useSelector((state) => state.userReducers);
  const [wordcloud, setWordcloud] = useState(null);
  const [iWantItList, setIWantItList] = useState(null);
  const [recommandList, setRecommandList] = useState(null);
  console.log("wordcloud", wordcloud);

  // 워드클라우드 데이터 요청
  const fetchGetWordCloud = async () => {
    const res = await api.analysis.getWordCloud();
    setWordcloud(res.cloud);
  };

  // I want it 향수 예상평점 조회 요청
  const fetchGetWantPredict = async () => {
    const res = await api.analysis.getWantPerfumePredict();
    setIWantItList(res);
  };

  // 취향 기반 추천 향수 조회 요청
  const fetchGetRecommandList = async () => {
    const res = await api.analysis.getRecommandList();
    console.log(res);
    setRecommandList(res);
  };

  useEffect(() => {
    fetchGetWordCloud();
    fetchGetWantPredict();
    fetchGetRecommandList();
  }, []);

  if (!wordcloud || !iWantItList || !recommandList) return null;

  return (
    <ProfileOutletContainer>
      <FlexDiv direction="column">
        <ProfileTitleBox bgimgNo={1} title={`${username}님의 취향 분석 결과`} />
        {/* <Wordcloud /> */}

        <ProfileTitleBox bgimgNo={1} title={"I want it 향수 예상 평점"} />

        <ScrollContainer margin="0 0 10rem 0">
          {iWantItList.map(
            ({ perfumeId, perfumeName, perfumeBrand, image, predict }) => (
              <WantAnalysisCard
                name={perfumeName}
                brand={perfumeBrand}
                img={image}
                predict={predict}
                key={perfumeId}
              />
            )
          )}
        </ScrollContainer>

        <ProfileTitleBox
          bgimgNo={1}
          title={`${username}님의 취향 기반 추천 향수`}
        />
        <ScrollContainer margin="0 0 10rem 0">
          {recommandList.map(
            ({ perfumeId, perfumeName, perfumeBrand, image, predict }) => (
              <WantAnalysisCard
                name={perfumeName}
                brand={perfumeBrand}
                img={image}
                predict={predict}
                key={perfumeId}
              />
            )
          )}
        </ScrollContainer>
      </FlexDiv>
    </ProfileOutletContainer>
  );
};

export default ProfileAnalysisPage;
