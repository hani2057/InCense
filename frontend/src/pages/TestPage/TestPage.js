import React, { useState } from "react";
import TestOne from "../../components/Test/TestOne/TestOne";
import TestTwo from "../../components/Test/TestTwo/TestTwo";
import TestThree from "../../components/Test/TestThree/TestThree";
import TestResult from "../../components/Test/TestResult/TestResult";
import { FlexDiv } from "../../components/common/FlexDiv/FlexDiv";
import { TestWrapper, TestStepBar, TestBtn } from "./style";

const TestPage = () => {
  const [step, setStep] = useState(2);
  const [result, setResult] = useState({
    test1: null,
    test2: null,
    test3: null,
  });

  const toPrev = () => setStep((prev) => prev - 1);
  const toNext = () => setStep((prev) => prev + 1);

  return (
    <FlexDiv direction="column">
      <TestStepBar step={step} />

      <TestWrapper>
        {step === 1 && (
          <TestOne toPrev={toPrev} toNext={toNext} setResult={setResult} />
        )}
        {step === 2 && (
          <TestTwo toPrev={toPrev} toNext={toNext} setResult={setResult} />
        )}
        {step === 3 && (
          <TestThree toPrev={toPrev} toNext={toNext} setResult={setResult} />
        )}
        {step === 3 && <TestResult toPrev={toPrev} toNext={toNext} />}
      </TestWrapper>

      <FlexDiv>
        <TestBtn></TestBtn>
        <TestBtn></TestBtn>
      </FlexDiv>
    </FlexDiv>
  );
};

export default TestPage;
