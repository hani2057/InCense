import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TestMain from "../../components/Test/TestMain/TestMain";
import TestOne from "../../components/Test/TestOne/TestOne";
import TestTwo from "../../components/Test/TestTwo/TestTwo";
import TestThree from "../../components/Test/TestThree/TestThree";
import TestFour from "../../components/Test/TestFour/TestFour";
import TestFive from "../../components/Test/TestFive/TestFive";
import TestSix from "../../components/Test/TestSix/TestSix";
import api from "../../apis/api";
import { FlexDiv } from "../../components/common/FlexDiv/FlexDiv";
import {
  TestContainer,
  TestWrapper,
  TestStepBar,
  TestBtn,
  TestSpan,
  GlowBox,
} from "./style";

const TestPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [result, setResult] = useState({
    test1: null,
    test2: null,
    test3: null,
    test4: null,
    test5: null,
    test6: null,
  });

  const toNext = () => setStep((prev) => prev + 1);

  const fetchPostTestResult = async () => {
    const data = Object.values(result);
    await api.analysis.postTestResult(data);
  };

  return (
    <TestContainer>
      {step !== 0 && step !== 7 && (
        <FlexDiv direction="column" height="auto">
          <TestSpan margin="1.5rem">테스트 진행도</TestSpan>
          <TestStepBar step={step} />
        </FlexDiv>
      )}

      <TestWrapper height="80%">
        {step === 0 && <TestMain toNext={toNext} />}
        {step === 1 && <TestOne toNext={toNext} setResult={setResult} />}
        {step === 2 && (
          <TestTwo
            toNext={toNext}
            setResult={setResult}
            prevResult={result.test1}
          />
        )}
        {step === 3 && (
          <TestThree
            toNext={toNext}
            setResult={setResult}
            prevResult={result.test2}
          />
        )}
        {step === 4 && <TestFour toNext={toNext} setResult={setResult} />}
        {step === 5 && <TestFive toNext={toNext} setResult={setResult} />}
        {step === 6 && <TestSix toNext={toNext} setResult={setResult} />}
        {step === 7 && (
          <GlowBox
            width="45rem"
            height="8rem"
            pointer={true}
            onClick={() => {
              fetchPostTestResult();
              navigate("/profile/analysis");
            }}
          >
            <FlexDiv>
              <TestSpan size="1.2rem" bold={true}>
                결과 보기
              </TestSpan>
            </FlexDiv>
          </GlowBox>
        )}
      </TestWrapper>

      <FlexDiv height="20%">
        {step !== 0 && step !== 7 ? (
          <TestBtn onClick={() => setStep((prev) => prev - 1)}>이전</TestBtn>
        ) : (
          <></>
        )}
      </FlexDiv>
    </TestContainer>
  );
};

export default TestPage;
