import React from "react";
import { FlexDiv } from "../../common/FlexDiv/FlexDiv";
import { AnalysisCardSpan, AnalysisPercent } from "./style";

const WantAnalysisCard = ({ name, brand, imgSrc, percent }) => {
  return (
    <FlexDiv
      direction="column"
      width="23rem"
      height="12.5rem"
      gap="0.1rem"
      padding="0.8rem"
      style={{ border: "1px solid var(--gray-color)", position: "relative" }}
    >
      <FlexDiv direction="column" align="start" justify="start">
        <AnalysisCardSpan size="0.75rem">{brand}</AnalysisCardSpan>
        <AnalysisCardSpan weight="700">{name}</AnalysisCardSpan>
      </FlexDiv>
      <FlexDiv height="auto" justify="space-around">
        <img src={imgSrc} alt="want perfume" style={{ height: "8rem" }} />
        <AnalysisPercent>
          <AnalysisCardSpan size="1.5rem" position="relative" zIndex="5">
            {percent}%
          </AnalysisCardSpan>
          <div></div>
        </AnalysisPercent>
        <div style={{ width: "10rem" }}></div>
      </FlexDiv>
    </FlexDiv>
  );
};

export default WantAnalysisCard;
