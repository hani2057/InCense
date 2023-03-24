import React from "react";
import styled from "styled-components";
import { FlexDiv } from "../../common/FlexDiv/FlexDiv";

const ProfileTitle = styled.span`
  font-size: ${(props) => (props.isSub ? "0.8rem" : "1.3rem")};
  font-weight: 700;
`;

const ProfileTitleBox = ({ bgimgNo, title, subtitle }) => {
  return (
    <FlexDiv
      height="10rem"
      direction="column"
      gap="0.5rem"
      style={{ backgroundImage: `url("/assets/images/bgimg${bgimgNo}.png")` }}
    >
      {subtitle || <ProfileTitle isSub={true}>{subtitle}</ProfileTitle>}
      <ProfileTitle>{title}</ProfileTitle>
    </FlexDiv>
  );
};

export default ProfileTitleBox;
