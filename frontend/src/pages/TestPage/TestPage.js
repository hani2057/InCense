import React, { useState } from "react";
import TestOne from "../../components/Test/TestOne/TestOne";
import TestTwo from "../../components/Test/TestTwo/TestTwo";
import TestThree from "../../components/Test/TestThree/TestThree";
import TestResult from "../../components/Test/TestResult/TestResult";

const TestPage = () => {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState({
    test1: null,
    test2: null,
    test3: null,
  });

  const toPrev = () => setStep((prev) => prev - 1);
  const toNext = () => setStep((prev) => prev + 1);

  return (
    <FlexDiv>
      {step === 1 && <TestOne toPrev={toPrev} toNext={toNext} />}
      {step === 2 && <TestTwo toPrev={toPrev} toNext={toNext} />}
      {step === 3 && <TestThree toPrev={toPrev} toNext={toNext} />}
      {step === 3 && <TestResult toPrev={toPrev} toNext={toNext} />}
    </FlexDiv>
  );
};

export default TestPage;
