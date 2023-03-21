import React, { useState } from "react";
import CheckboxPickOne from "../../../components/common/CheckboxPickOne/CheckboxPickOne";
import { FlexDiv } from "../../../components/common/FlexDiv/FlexDiv";
import { ProfileOutletContainer } from "../ProfilePage/style";
import { ProfilePerfumeHeader } from "./style";

const ProfilePerfumes = () => {
  const [typeIdx, setTypeIdx] = useState(null);

  return (
    <ProfileOutletContainer>
      <ProfilePerfumeHeader>
        <CheckboxPickOne
          textArr={["I had it", "I have it", "I want it"]}
          pickedIdx={typeIdx}
          setPickedIdx={setTypeIdx}
          width="50%"
          padding="0 5%"
        />
        <FlexDiv width="50%" padding="0 5%">
          <FlexDiv justify="start">
            <img src="/assets/icons/search.svg" alt="search" />
            <span>목록에 향수 추가</span>
          </FlexDiv>
          <FlexDiv direction="column" align="end">
            <span>내 취향에 반영하기</span>
            <span
              style={{
                fontSize: "0.625rem",
                position: "relative",
                top: "0.5rem",
              }}
            >
              마지막 반영일자 Feb 10, 2023
            </span>
          </FlexDiv>
        </FlexDiv>
      </ProfilePerfumeHeader>
      <div style={{ height: "150px" }}></div>
      {/* <ProfileMainBtn />
      <ProfileMainBtn />
      <ProfileMainBtn /> */}
    </ProfileOutletContainer>
  );
};

export default ProfilePerfumes;
