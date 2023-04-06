import React from "react";
import { NoteAnalysisContainer, NoteSpan, NoteCircle } from "./style";
import { FlexDiv } from "../../common/FlexDiv/FlexDiv";

const NoteAnalysis = ({ noteData }) => {
  console.log("aaaaa", noteData);

  let { mainScent, middleWeight, baseWeight } = noteData;
  const middleNotes = `${middleWeight[0].word}, ${middleWeight[1].word}, ${middleWeight[2].word}`;
  const baseNotes = `${baseWeight[0].word}, ${baseWeight[1].word}, ${baseWeight[2].word}`;

  const shuffle = (arr) => {
    arr.sort(() => Math.random() - 0.5);
    return arr;
  };

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
