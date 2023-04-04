import React from "react";
import {
  GlowBox,
  TestItemWrapper,
  TestSpan,
} from "../../../pages/TestPage/style";
import { FlexDiv } from "../../common/FlexDiv/FlexDiv";

const TestThree = ({ toNext, setResult, prevResult }) => {
  const data = [
    { description: "상큼한" },
    { description: "산뜻한" },
    { description: "투명한" },
    { description: "귀여운" },
    { description: "차분한" },
    { description: "시크한" },
    { description: "어른스러운" },
    { description: "프로페셔널" },
    { description: "싱그러운" },
    { description: "청순한" },
    { description: "자연스러운" },
    { description: "사랑스러운" },
    { description: "다정한" },
    { description: "달콤한" },
    { description: "포근한" },
    { description: "우아한" },
    { description: "귀여운" },
    { description: "우아한" },
    { description: "로맨틱한" },
    { description: "따듯한" },
    { description: "우아한" },
    { description: "관능적인" },
    { description: "어른스러운" },
    { description: "따듯한" },
    { description: "우아한" },
    { description: "관능적인" },
    { description: "어른스러운" },
    { description: "따듯한" },
    { description: "산뜻한" },
    { description: "샤프한" },
    { description: "우아한" },
    { description: "차분한" },
    { description: "차분한" },
    { description: "따뜻한" },
    { description: "깊이있는" },
    { description: "깔끔한" },
  ];

  const dataToRender = data.slice(prevResult * 4, prevResult * 4 + 4);

  return (
    <>
      <TestSpan size="1.2rem" margin="0 0 3.5rem 0">
        좋아하는 향기에 더 가까운 이미지를 골라주세요
      </TestSpan>

      <FlexDiv height="auto" width="45rem" direction="column" gap="0.8rem">
        {dataToRender.map(({ src, description }, idx) => (
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
