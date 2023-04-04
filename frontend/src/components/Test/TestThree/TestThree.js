import React from "react";
import {
  GlowBox,
  TestItemWrapper,
  TestSpan,
} from "../../../pages/TestPage/style";
import { FlexDiv } from "../../common/FlexDiv/FlexDiv";

const TestThree = ({ toNext, setResult }) => {
  const data = [
    {
      description: "싱그러운",
    },
    {
      description: "청순한",
    },
    {
      description: "자연스러운",
    },
    {
      description: "사랑스러운",
    },
  ];

  return (
    <>
      <TestSpan size="1.2rem" margin="0 0 3.5rem 0">
        좋아하는 향기에 더 가까운 이미지를 골라주세요
      </TestSpan>

      <FlexDiv height="auto" width="45rem" direction="column" gap="0.8rem">
        {data.map(({ src, description }, idx) => (
          <TestItemWrapper
            direction="column"
            gap="0.5rem"
            key={idx}
            onClick={() => {
              setResult((prev) => ({ ...prev, test3: idx }));
              toNext();
            }}
          >
            <GlowBox width="16rem" height="4rem" pointer={true}>
              <FlexDiv className="changeColorWhenHover" bold={true}>
                {description}
              </FlexDiv>
            </GlowBox>
          </TestItemWrapper>
        ))}
      </FlexDiv>
    </>
  );
};

export default TestThree;
