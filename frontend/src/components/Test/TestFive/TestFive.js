import React from "react";
import {
  TestImg,
  TestItemWrapper,
  TestSpan,
} from "../../../pages/TestPage/style";
import { FlexDiv } from "../../common/FlexDiv/FlexDiv";

const TestOne = ({ toNext, setResult }) => {
  const data = [
    { description: "봄" },
    { description: "여름" },
    { description: "가을" },
    { description: "겨울" },
  ];

  return (
    <>
      <TestSpan size="1.2rem" margin="0 0 3.5rem 0">
        향수를 사용할 계절을 알려주세요
      </TestSpan>
      <FlexDiv height="auto" width="45rem">
        {data.map(({ description }, idx) => (
          <TestItemWrapper
            direction="column"
            gap="0.5rem"
            key={idx}
            onClick={() => {
              setResult((prev) => ({ ...prev, test5: idx }));
              toNext();
            }}
          >
            <TestImg
              width="8rem"
              height="8rem"
              src={`/assets/images/test5-${idx}.jpeg`}
              pointer={true}
            />
            <TestSpan className="changeColorWhenHover" bold={true}>
              {description}
            </TestSpan>
          </TestItemWrapper>
        ))}
      </FlexDiv>
    </>
  );
};

export default TestOne;
