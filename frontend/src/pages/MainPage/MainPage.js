import React, { useState } from "react";
import MainItem from "./MainItem";
import { MainContainer } from "./style";

const MainPage = () => {
  const [bgImgIdx, setBgImgIdx] = useState(1);
  console.log(bgImgIdx);

  return (
    <MainContainer idx={bgImgIdx}>
      <MainItem
        idx={1}
        setBgImgIdx={setBgImgIdx}
        title="취향 테스트"
        description1="나의 향수 취향을 테스트하고,"
        description2="취향에 맞는 향수를 추천받아 보세요"
        navText="취향 테스트 하러 가기"
        navTo="/test"
      />

      <MainItem
        idx={2}
        setBgImgIdx={setBgImgIdx}
        title="향수 리스트"
        description1="1,000개 이상의 향수 목록을 둘러보세요"
        description2=""
        navText="향수 리스트 보러 가기"
        navTo="/list"
      />

      <MainItem
        idx={3}
        setBgImgIdx={setBgImgIdx}
        title="나눔 & 판매"
        description1="향수를 소분하여 나눔하거나,"
        description2="구매 후 아쉬운 향수를 판매해보세요"
        navText="나눔&판매 보러 가기"
        navTo="/share"
      />

      <MainItem
        idx={4}
        setBgImgIdx={setBgImgIdx}
        title="마이 페이지"
        description1="나의 활동 내역을 확인하고"
        description2="상세한 취향 분석 결과를 받아보세요"
        navText="마이 페이지로 가기"
        navTo="/profile"
      />
    </MainContainer>
  );
};

export default MainPage;
