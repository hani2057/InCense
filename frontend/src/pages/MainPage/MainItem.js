import React from "react";
import { useNavigate } from "react-router";
import { FlexDiv } from "../../components/common/FlexDiv/FlexDiv";
import { MainItemWrapper, MainSpan } from "./style";

const MainItem = ({
  idx,
  setBgImgIdx,
  title,
  description1,
  description2,
  navText,
  navTo,
}) => {
  const navigate = useNavigate();

  return (
    <MainItemWrapper onMouseEnter={() => setBgImgIdx(idx)}>
      <FlexDiv
        direction="column"
        justify="start"
        align="start"
        padding="0 0 0 2rem"
      >
        <MainSpan size="1.6rem" bold={true}>
          {title}
        </MainSpan>
        <MainSpan paddingBottom="0.3rem">{description1}</MainSpan>
        <MainSpan>{description2}</MainSpan>
        <MainSpan size="1.2rem" className="nav" onClick={() => navigate(navTo)}>
          {navText}
        </MainSpan>
      </FlexDiv>
    </MainItemWrapper>
  );
};

export default MainItem;
