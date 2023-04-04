import React, { useState } from "react";
import TestMain from "../../components/Test/TestMain/TestMain";
import TestOne from "../../components/Test/TestOne/TestOne";
import TestTwo from "../../components/Test/TestTwo/TestTwo";
import TestThree from "../../components/Test/TestThree/TestThree";
import TestResult from "../../components/Test/TestResult/TestResult";
import { FlexDiv } from "../../components/common/FlexDiv/FlexDiv";
import {
  TestContainer,
  TestWrapper,
  TestStepBar,
  TestBtn,
  TestSpan,
} from "./style";

const TestPage = () => {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState({
    isNew: false,
    test1: null,
    test2: null,
    test3: null,
  });

  console.log(result);
  const toNext = () => setStep((prev) => prev + 1);

  return (
    <TestContainer>
      {step !== 0 && step !== 5 && (
        <FlexDiv direction="column" height="auto">
          <TestSpan margin="1.5rem">테스트 진행도</TestSpan>
          <TestStepBar step={step} />
        </FlexDiv>
      )}

      <TestWrapper height="80%">
        {step === 0 && <TestMain toNext={toNext} setResult={setResult} />}
        {step === 1 && <TestOne toNext={toNext} setResult={setResult} />}
        {step === 2 && <TestTwo toNext={toNext} setResult={setResult} />}
        {step === 3 && <TestThree toNext={toNext} setResult={setResult} />}
        {step === 4 && <TestResult />}
      </TestWrapper>

      <FlexDiv height="20%">
        {step === 5 ? (
          <TestBtn onClick={() => setStep((prev) => prev + 1)}>완료</TestBtn>
        ) : step !== 0 ? (
          <TestBtn onClick={() => setStep((prev) => prev - 1)}>이전</TestBtn>
        ) : (
          <></>
        )}
      </FlexDiv>
    </TestContainer>
  );
};

export default TestPage;
