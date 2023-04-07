import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../../apis/api";
import ProfileTitleBox from "../../../components/Profile/ProfileTitleBox/ProfileTitleBox";
import Wordcloud from "../../../components/Profile/Wordcloud/Wordcloud";
import NoteAnalysis from "../../../components/Profile/NoteAnalysis/NoteAnalysis";
import WantAnalysisCard from "../../../components/Profile/WantAnalysisCard/WantAnalysisCard";
import { FlexDiv } from "../../../components/common/FlexDiv/FlexDiv";
import { ProfileOutletContainer } from "../ProfilePage/style";
import { ScrollContainer } from "./style";

const ProfileAnalysisPage = () => {
  const { username } = useSelector((state) => state.userReducers);
  const [wordcloud, setWordcloud] = useState(null);
  const [noteData, setNoteData] = useState(null);
  const [iWantItList, setIWantItList] = useState(null);
  const [recommandList, setRecommandList] = useState(null);

  // 워드클라우드 데이터 요청
  const fetchGetWordCloud = async () => {
    const res = await api.analysis.getWordCloud();
    setWordcloud(res.cloud);
  };

  // 노트별 취향 데이터 요청
  const fetchNoteGraph = async () => {
    const res = await api.analysis.getNoteGraph();
    setNoteData(res);
  };

  // I want it 향수 예상평점 조회 요청
  const fetchGetWantPredict = async () => {
    const res = await api.analysis.getWantPerfumePredict();
    setIWantItList(res);
  };

  // 취향 기반 추천 향수 조회 요청
  const fetchGetRecommandList = async () => {
    const res = await api.analysis.getRecommandList();
    setRecommandList(res);
  };

  useEffect(() => {
    fetchGetWordCloud();
    fetchNoteGraph();
    fetchGetWantPredict();
    fetchGetRecommandList();
  }, []);

  if (!wordcloud || !noteData || !iWantItList || !recommandList) return null;

  return (
    <ProfileOutletContainer>
      <FlexDiv direction="column">
        <ProfileTitleBox bgimgNo={1} title={`${username}님의 취향 분석 결과`} />
        <Wordcloud wordcloud={wordcloud} />
        <NoteAnalysis noteData={noteData} />

        <ProfileTitleBox bgimgNo={1} title={"I want it 향수 취향 적중도"} />
        <ScrollContainer margin="0 0 10rem 0">
          {iWantItList.map(
            ({ perfumeId, perfumeName, perfumeBrand, image, predict }) => (
              <WantAnalysisCard
                perfumeId={perfumeId}
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
                perfumeId={perfumeId}
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
