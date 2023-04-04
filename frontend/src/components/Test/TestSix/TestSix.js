import React from "react";
import {
  TestImg,
  TestItemWrapper,
  TestSpan,
} from "../../../pages/TestPage/style";
import { FlexDiv } from "../../common/FlexDiv/FlexDiv";

const TestTwo = ({ toNext, setResult }) => {
  const data = [
    {
      src: "perfumes/438.jpg",
      description: "낮",
    },
    {
      src: "perfumes/438.jpg",
      description: "밤",
    },
  ];

  return (
    <>
      <TestSpan size="1.2rem" margin="0 0 3.5rem 0">
        향수를 사용할 시간을 알려주세요
      </TestSpan>

      <FlexDiv height="auto" width="45rem" direction="column" gap="2rem">
        {data.map(({ src, description }, idx) => (
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
