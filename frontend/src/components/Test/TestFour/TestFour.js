import React from "react";
import {
  TestImg,
  TestItemWrapper,
  TestSpan,
} from "../../../pages/TestPage/style";
import { FlexDiv } from "../../common/FlexDiv/FlexDiv";

const TestFour = ({ toNext, setResult }) => {
  const data = [
    { description: "강, 바다, 수영장의", title: "물 내음" },
    { description: "달달한", title: "과일 한 아름" },
    { description: "코끝을 톡 건드리는", title: "시나몬" },
    { description: "달짝지근한", title: "바닐라" },
    { description: "보송보송한", title: "파우더" },
    { description: "", title: "다 좋아요" },
  ];

  return (
    <>
      <TestSpan size="1.2rem" margin="0 0 3.5rem 0">
        싫어하는 느낌의 향기가 있다면 골라주세요
      </TestSpan>

      <FlexDiv height="auto" width="45rem" gap="2rem" wrap="wrap">
        {data.map(({ description, title }, idx) => (
          <TestItemWrapper
            width="30%"
            height="auto"
            direction="column"
            gap="0.2rem"
            key={idx}
            onClick={() => {
              setResult((prev) => ({ ...prev, test4: idx }));
              toNext();
            }}
          >
            <TestImg
              width="7rem"
              height="7rem"
              src={`/assets/images/test4-${idx}.jpeg`}
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

export default TestFour;
