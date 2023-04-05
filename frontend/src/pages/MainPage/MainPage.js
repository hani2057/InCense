import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FlexDiv } from "../../components/common/FlexDiv/FlexDiv";
import { MainContainer, MainItemWrapper, MainSpan } from "./style";

const MainPage = () => {
  const navigate = useNavigate();
  const [bgImgIdx, setBgImgIdx] = useState(1);
  console.log(bgImgIdx);

  return (
    <MainContainer idx={bgImgIdx}>
      <MainItemWrapper onMouseEnter={() => setBgImgIdx(1)}>
        <FlexDiv
          direction="column"
          justify="start"
          align="start"
          padding="0 0 0 2rem"
        >
          <MainSpan>취향 테스트</MainSpan>
          <MainSpan>나의 향수 취향을 테스트하고,</MainSpan>
          <MainSpan>취향에 맞는 향수를 추천받아 보세요</MainSpan>
          <MainSpan onClick={() => navigate("/test")}>
            취향 테스트 하러 가기
          </MainSpan>
        </FlexDiv>
      </MainItemWrapper>

      <MainItemWrapper onMouseEnter={() => setBgImgIdx(2)}>
        <FlexDiv
          direction="column"
          justify="start"
          align="start"
          padding="0 0 0 2rem"
        >
          <MainSpan>향수 리스트</MainSpan>
          <MainSpan>1,000개 이상의 향수 목록을 둘러보세요</MainSpan>
          <MainSpan></MainSpan>
          <MainSpan onClick={() => navigate("/list")}>
            향수 리스트 보러 가기
          </MainSpan>
        </FlexDiv>
      </MainItemWrapper>

      <MainItemWrapper onMouseEnter={() => setBgImgIdx(3)}>
        <FlexDiv
          direction="column"
          justify="start"
          align="start"
          padding="0 0 0 2rem"
        >
          <MainSpan>나눔 & 판매</MainSpan>
          <MainSpan>향수를 소분하여 나눔하거나,</MainSpan>
          <MainSpan>구매 후 아쉬운 향수를 판매해보세요</MainSpan>
          <MainSpan onClick={() => navigate("/share")}>
            나눔&판매 보러 가기
          </MainSpan>
        </FlexDiv>
      </MainItemWrapper>

      <MainItemWrapper onMouseEnter={() => setBgImgIdx(4)}>
        <FlexDiv
          direction="column"
          justify="start"
          align="start"
          padding="0 0 0 2rem"
        >
          <MainSpan>마이 페이지</MainSpan>
          <MainSpan>나의 활동 내역을 확인하고</MainSpan>
          <MainSpan>보다 상세한 취향 분석 결과를 받아보세요</MainSpan>
          <MainSpan onClick={() => navigate("/share")}>
            마이 페이지로 가기
          </MainSpan>
        </FlexDiv>
      </MainItemWrapper>
    </MainContainer>
  );
};

export default MainPage;
