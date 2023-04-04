import React from "react";
import { GlowBox, TestSpan } from "../../../pages/TestPage/style";
import { FlexDiv } from "../../common/FlexDiv/FlexDiv";

const TestMain = ({ toNext, setResult }) => {
  return (
    <>
      <TestSpan margin="2.5rem" size="1.3rem">
        나에게 맞는 테스트를 골라주세요
      </TestSpan>
      <GlowBox
        width="45rem"
        height="8rem"
        pointer={true}
        onClick={() => {
          setResult((prev) => ({ ...prev, isNew: true }));
          toNext();
        }}
      >
        <FlexDiv direction="column" gap="1rem">
          <TestSpan bold={true}>향기에 눈을 뜨기 시작한 당신,</TestSpan>
          <TestSpan>좋아하는 이미지를 선택하여 향기를 추천받아 보세요</TestSpan>
        </FlexDiv>
      </GlowBox>
      <GlowBox
        width="45rem"
        height="8rem"
        margin="1rem 0 0 0"
        pointer={true}
        onClick={() => {
          setResult((prev) => ({ ...prev, isNew: false }));
          toNext();
        }}
      >
        <FlexDiv direction="column" gap="1rem">
          <TestSpan bold={true}>이미 향수 취향이 뚜렷한 당신,</TestSpan>
          <TestSpan>
            사용해본 향수 이름을 입력하고 향기를 추천받아 보세요
          </TestSpan>
        </FlexDiv>
      </GlowBox>
    </>
  );
};

export default TestMain;
