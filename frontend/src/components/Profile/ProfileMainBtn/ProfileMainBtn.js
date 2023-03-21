import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ProfileMainBtnWrapper,
  ProfileMainBtnDiv,
  ProfileMainBtnSpan,
} from "./style";
import "./style.css";

const ProfileMainBtn = ({ title, subTitles }) => {
  const navigate = useNavigate();
  return (
    <ProfileMainBtnWrapper>
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
