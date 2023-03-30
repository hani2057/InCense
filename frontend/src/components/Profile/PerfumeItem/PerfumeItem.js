import React from "react";
import { BsBell } from "react-icons/bs";
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
        <BsBell style={{ color: "var(--dark-gray-color)", strokeWidth: "1" }} />
      </FlexDiv>
      <img
        // src="/assets/images/fluer.png"
        src="https://j8a804.p.ssafy.io/api/display?filename=perfumes/1.jpg"
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
          <img
            src="/assets/icons/delete.svg"
            alt="delete"
            style={{ marginLeft: "0.5rem", stroke: "1" }}
          />
        </FlexDiv>
      </FlexDiv>
    </FlexDiv>
  );
};

export default PerfumeItem;
