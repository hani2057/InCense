import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ProfileMainBtnWrapper,
  ProfileMainBtnDiv,
  ProfileMainBtnSpan,
} from "./style";

const ProfileMainBtn = ({ title, subTitles, bgimgNo }) => {
  const navigate = useNavigate();
  return (
    <ProfileMainBtnWrapper bgimgNo={bgimgNo}>
      <ProfileMainBtnDiv
        direction="column"
        justify="space-around"
        padding="1.6rem 0"
        onClick={() => navigate(`/profile/${title.toLowerCase()}`)}
      >
        <ProfileMainBtnSpan isTitle={true}>{title}</ProfileMainBtnSpan>
        {subTitles.map((subtitle, idx) => (
          <ProfileMainBtnSpan key={idx}>{subtitle}</ProfileMainBtnSpan>
        ))}
      </ProfileMainBtnDiv>
    </ProfileMainBtnWrapper>
  );
};

export default ProfileMainBtn;
