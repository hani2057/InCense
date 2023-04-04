import React, { useState } from "react";
import TestMain from "../../components/Test/TestMain/TestMain";
import TestOne from "../../components/Test/TestOne/TestOne";
import TestTwo from "../../components/Test/TestTwo/TestTwo";
import TestThree from "../../components/Test/TestThree/TestThree";
import TestResult from "../../components/Test/TestResult/TestResult";
import { FlexDiv } from "../../components/common/FlexDiv/FlexDiv";
import { TestContainer, TestWrapper, TestStepBar, TestBtn } from "./style";

const TestPage = () => {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState({
    test1: null,
    test2: null,
    test3: null,
  });

  return (
    <TestContainer>
      {step !== 0 && step !== 5 && <TestStepBar step={step} />}

      <TestWrapper height="80%">
        {step === 0 && <TestMain />}
        {step === 1 && <TestOne setResult={setResult} />}
        {step === 2 && <TestTwo setResult={setResult} />}
        {step === 3 && <TestThree setResult={setResult} />}
        {step === 4 && <TestResult />}
      </TestWrapper>

      <FlexDiv height="20%">
        {step !== 0 && step !== 5 && (
          <TestBtn onClick={() => setStep((prev) => prev - 1)}>이전</TestBtn>
        )}
        {step !== 5 && (
          <TestBtn onClick={() => setStep((prev) => prev + 1)}>
            {step === 4 ? "완료" : "다음"}
          </TestBtn>
        )}
      </FlexDiv>
    </TestContainer>
  );
};

export default TestPage;
