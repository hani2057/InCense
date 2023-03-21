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
        <FlexDiv width="50%">
          <img src="/assets/icons/search.svg" alt="search" />
          <span>목록에 향수 추가</span>
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
