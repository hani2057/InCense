import React from "react";
import {
  TestImg,
  TestItemWrapper,
  TestSpan,
} from "../../../pages/TestPage/style";
import { FlexDiv } from "../../common/FlexDiv/FlexDiv";

const TestOne = ({ toNext, setResult }) => {
  const data = [
    {
      description: "기분을 전환시키는",
      title: "풀, 나무 향기",
    },
    {
      description: "마음을 설레게 하는",
      title: "꽃 향기",
    },
    {
      description: "주변 공기를 부드럽게",
      title: "달콤한 향기",
    },
    {
      description: "차분하고 성숙한",
      title: "도시의 향기",
    },
  ];

  return (
    <>
      <TestSpan size="1.2rem" margin="0 0 3.5rem 0">
        떠올리는 것만으로도 행복하거나 편안해지는 향기를 골라주세요
      </TestSpan>
      <FlexDiv height="auto" width="45rem">
        {data.map(({ description, title }, idx) => (
          <TestItemWrapper
            direction="column"
            gap="0.5rem"
            key={idx}
            onClick={() => {
              setResult((prev) => ({ ...prev, test1: idx }));
              toNext();
            }}
          >
            <TestImg
              width="7rem"
              height="7rem"
              src={`/assets/images/test1-${idx}.jpeg`}
              pointer={true}
            />
            <TestSpan className="changeColorWhenHover">{description}</TestSpan>
            <TestSpan className="changeColorWhenHover" bold={true}>
              {title}
            </TestSpan>
          </TestItemWrapper>
        ))}
      </FlexDiv>
    </>
  );
};

export default TestOne;
