import React, { useState } from "react";
import CheckboxWithIcon from "../../components/common/CheckboxWithIcon/CheckboxWithIcon";
import CheckboxPickOne from "../../components/common/CheckboxPickOne/CheckboxPickOne";
import { FlexDiv } from "../../components/common/FlexDiv/FlexDiv";
import { TitleSpan } from "../LogInPage/style";
import { SignUpInput, SignUpItem, SignUpSpan, SignUpMsg } from "./style";

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
        <div style={{ height: "45%" }}>
          <FlexDiv
            direction="column"
            justify="start"
            align="start"
            height="auto"
          >
            <SignUpItem>
              <SignUpInput placeholder="닉네임을 입력해주세요" />
              <CheckboxWithIcon
                text={nameChecked ? "사용가능" : "중복검사"}
                isChecked={nameChecked ? true : false}
                funcClicked={() => setNameChecked((prev) => !prev)}
              />
            </SignUpItem>
            <SignUpItem direction="column" align="start">
              <FlexDiv>
                <SignUpInput placeholder="생년월일을 입력해주세요" />
                <span>토글 공개</span>
              </FlexDiv>
              <SignUpMsg>* YYYYMMDD 형식의 8자리로 입력해주세요</SignUpMsg>
            </SignUpItem>
            <SignUpItem>
              <CheckboxPickOne
                textArr={["남성", "여성"]}
                pickedIdx={genderPickedIdx}
                setPickedIdx={setGenderPickedIdx}
                width="23rem"
                height="3rem"
                margin="0 3rem 0 0"
              />
              <span>토글 공개</span>
            </SignUpItem>
          </FlexDiv>
        </div>
        <div style={{ height: "20%" }}>
          <button type="submit">완료</button>
        </div>
      </FlexDiv>
    </FlexDiv>
  );
};

export default SignUpPage;
