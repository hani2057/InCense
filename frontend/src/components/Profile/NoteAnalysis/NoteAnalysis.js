import React from "react";
import { NoteAnalysisContainer, NoteSpan, NoteCircle } from "./style";
import { FlexDiv } from "../../common/FlexDiv/FlexDiv";

const NoteAnalysis = ({ noteData }) => {
  let { mainScent, middleWeight, baseWeight } = noteData;
  const middleNotes = `${middleWeight[0].word}, ${middleWeight[1].word}, ${middleWeight[2].word}`;
  const baseNotes = `${baseWeight[0].word}, ${baseWeight[1].word}, ${baseWeight[2].word}`;

  const shuffle = (arr) => {
    arr.sort(() => Math.random() - 0.5);
    return arr;
  };

  // 표시되는 원의 크기를 일정하게 하기 위해
  // 조정계수를 설정해 최대 크기를 0.9대로 맞춤
  const newMiddle = middleWeight.map(({ weight }) => weight);
  const newBase = baseWeight.map(({ weight }) => weight);

  const adjustFactorMiddle = (10 - Math.ceil(Math.max(...newMiddle) * 10)) / 10;
  const adjustFactorBase = (10 - Math.ceil(Math.max(...newBase) * 10)) / 10;

  middleWeight = middleWeight.map((prev) => ({
    ...prev,
    weight: prev.weight + adjustFactorMiddle,
  }));
  baseWeight = baseWeight.map((prev) => ({
    ...prev,
    weight: prev.weight + adjustFactorBase,
  }));

  // 순서를 랜덤하게 섞음
  middleWeight = shuffle(middleWeight);
  baseWeight = shuffle(baseWeight);

  return (
    <NoteAnalysisContainer>
      <NoteSpan align="end">{mainScent}</NoteSpan>
      <NoteSpan bold={true}>Top</NoteSpan>
      <NoteSpan></NoteSpan>

      <NoteSpan align="end">{middleNotes}</NoteSpan>
      <NoteSpan bold={true}>Middle</NoteSpan>
      <FlexDiv justify="space-between">
        {middleWeight.map(({ word, weight }, idx) => (
          <NoteCircle weight={weight} data-content={word} key={idx} />
        ))}
      </FlexDiv>

      <NoteSpan align="end">{baseNotes}</NoteSpan>
      <NoteSpan bold={true}>Base</NoteSpan>
      <FlexDiv justify="space-between">
        {baseWeight.map(({ word, weight }, idx) => (
          <NoteCircle
            weight={weight}
            data-content={word}
            isBase={true}
            key={idx}
          />
        ))}
      </FlexDiv>
    </NoteAnalysisContainer>
  );
};

export default NoteAnalysis;
