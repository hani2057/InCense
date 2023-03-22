import React from "react";
import { FlexDiv } from "../../common/FlexDiv/FlexDiv";

const PerfumeItem = () => {
  return (
    <FlexDiv
      width="25%"
      direction="column"
      padding="1rem"
      style={{ border: "1px solid var(--gray-color)" }}
    >
      <FlexDiv justify="end">
        <img src="/assets/icons/edit.svg" alt="edit" />
      </FlexDiv>
      <img
        // src="/assets/images/fluer.png"
        src="https://j8a804.p.ssafy.io/api/display?filename=perfumes/test.jpg"
        alt="perfume"
        style={{ width: "60%" }}
      />
      <FlexDiv justify="space-between">
        <FlexDiv direction="column" align="start">
          <span>{"Diptyque"}</span>
          <span style={{ fontWeight: "700" }}>{"fleur de peau"}</span>
        </FlexDiv>
        <FlexDiv justify="end">
          <img src="/assets/icons/edit.svg" alt="edit" />
          <img src="/assets/icons/edit.svg" alt="delete" />
        </FlexDiv>
      </FlexDiv>
    </FlexDiv>
  );
};

export default PerfumeItem;
