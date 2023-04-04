import React from "react";
import {
  TestImg,
  TestItemWrapper,
  TestSpan,
} from "../../../pages/TestPage/style";
import { FlexDiv } from "../../common/FlexDiv/FlexDiv";

const TestTwo = ({ toNext, setResult, prevResult }) => {
  const data = [
    {
      src: "perfumes/438.jpg",
      description: "햇빛 반짝이는 들판의 싱그러움",
    },
    {
      src: "perfumes/438.jpg",
      description: "나무, 흙, 숲이 주는 깊이감",
    },
    {
      src: "perfumes/438.jpg",
      description: "이제 막 피어나기 시작한 여린 꽃망울",
    },
    {
      src: "perfumes/438.jpg",
      description: "디너 테이블 위 우아한 꽃다발",
    },
    {
      src: "perfumes/438.jpg",
      description: "꽃과 과일의 화사한 달콤함",
    },
    {
      src: "perfumes/438.jpg",
      description: "바닐라, 꿀과 같은 진득한 달콤함",
    },
    {
      src: "perfumes/438.jpg",
      description: "바쁘게 움직이는 도시의 한낮",
    },
    {
      src: "perfumes/438.jpg",
      description: "깊고 어두운 도시의 밤",
    },
  ];

  const dataToRender = data.slice(prevResult * 2, prevResult * 2 + 2);

  return (
    <>
      <TestSpan size="1.2rem" margin="0 0 3.5rem 0">
        좋아하는 향기에 더 가까운 이미지를 골라주세요
      </TestSpan>

      <FlexDiv height="auto" width="45rem" direction="column" gap="2rem">
        {dataToRender.map(({ src, description }, idx) => (
          <TestItemWrapper
            direction="column"
            gap="0.5rem"
            key={idx}
            onClick={() => {
              setResult((prev) => ({ ...prev, test2: idx }));
              toNext();
            }}
          >
            <TestImg width="6rem" height="6rem" src={src} pointer={true} />
            <TestSpan className="changeColorWhenHover" bold={true}>
              {description}
            </TestSpan>
          </TestItemWrapper>
        ))}
      </FlexDiv>
    </>
  );
};

export default TestTwo;
