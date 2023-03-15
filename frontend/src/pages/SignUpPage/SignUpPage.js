import React, { useState } from "react";
import CheckBox from "../../components/common/CheckBox/CheckBox";
import CheckBoxPickOne from "../../components/common/CheckBoxPickOne/CheckBoxPickOne";
import { FlexDiv } from "../../components/common/FlexDiv/FlexDiv";
import { TitleSpan } from "../LogInPage/style";
import { SignUpInput, SignUpSpan } from "./style";

const SignUpPage = () => {
  const [nameChecked, setNameChecked] = useState(false);
  const [genderPickedIdx, setGenderPickedIdx] = useState(null);

  return (
    <FlexDiv height="100vh">
      <FlexDiv
        direction="column"
        width="45%"
        style={{ backgroundImage: "url('/assets/images/bgimg1.png')" }}
      >
        <TitleSpan>In</TitleSpan>
        <TitleSpan>Cense</TitleSpan>
      </FlexDiv>
      <FlexDiv direction="column">
        <FlexDiv direction="column" height="35%">
          <SignUpSpan>보다 정확한 추천을 위해</SignUpSpan>
          <SignUpSpan>당신에 대해 알려주세요</SignUpSpan>
        </FlexDiv>
        <FlexDiv direction="column" justify="start" height="65%">
          <FlexDiv height="8rem">
            <SignUpInput placeholder="닉네임을 입력해주세요" />
            <CheckBox
              text={nameChecked ? "사용가능" : "중복검사"}
              isChecked={nameChecked ? true : false}
              funcClicked={() => setNameChecked((prev) => !prev)}
            />
          </FlexDiv>
          <FlexDiv height="8rem">
            <SignUpInput placeholder="생년월일을 입력해주세요" />
            <span>토글 공개</span>
          </FlexDiv>
          <FlexDiv height="8rem">
            <CheckBoxPickOne
              textArr={["남성", "여성"]}
              pickedIdx={genderPickedIdx}
              setPickedIdx={setGenderPickedIdx}
              width="10rem"
            />
            <span>토글 공개</span>
          </FlexDiv>
          <button type="submit">완료</button>
        </FlexDiv>
      </FlexDiv>
    </FlexDiv>
  );
};

export default SignUpPage;
