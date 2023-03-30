import React from "react";
import { SignUpInput, SignUpMsg } from "../../pages/SignUpPage/style";
import CheckboxPickOne from "../common/CheckboxPickOne/CheckboxPickOne";
import { FlexDiv } from "../common/FlexDiv/FlexDiv";

const SignUpItem = ({
  type,
  inputValue,
  setInputValue,
  setNameChecked,
  msg,
  setMsg,
  genderPickedIdx,
  setGenderPickedIdx,
  isError,
}) => {
  return (
    <>
      {type === "gender" ? (
        <FlexDiv direction="column" align="start" width="auto">
          <CheckboxPickOne
            textArr={["남성", "여성"]}
            pickedIdx={genderPickedIdx}
            setPickedIdx={setGenderPickedIdx}
            width="23rem"
            height="3rem"
            margin="0 3rem 0 0"
          />
          <SignUpMsg color={isError?.gender ? "red" : null}>{msg}</SignUpMsg>
        </FlexDiv>
      ) : type === "name" ? (
        <FlexDiv direction="column" align="start" width="auto">
          <SignUpInput
            placeholder="닉네임을 입력해주세요"
            type="text"
            value={inputValue}
            onChange={(e) => {
              setNameChecked(false);
              // 길이 유효성 검사
              if (e.target.value.length <= 20) {
                setInputValue(e.target.value);
                setMsg("20자 이하의 닉네임을 입력해주세요");
                // setMsg(
                //   "name",
                //   "normal",
                //   "20자 이하의 닉네임을 입력해주세요"
                // );
              } else {
                setInputValue(inputValue.substring(0, 20));
              }
            }}
            required
            maxlength={20}
          />
          <SignUpMsg color={isError?.name ? "red" : null}>{msg}</SignUpMsg>
        </FlexDiv>
      ) : (
        <FlexDiv direction="column" align="start" width="auto">
          <SignUpInput
            placeholder="생년월일을 입력해주세요"
            value={inputValue}
            onChange={(e) => {
              // 길이 유효성 검사
              if (e.target.value.length <= 8) {
                setInputValue(e.target.value);
                setMsg("YYYYMMDD 형식의 8자리로 입력해주세요");
                // setMsg(
                //   "birth",
                //   "normal",
                //   "YYYYMMDD 형식의 8자리로 입력해주세요"
                // );
              } else {
                setInputValue(inputValue.substring(0, 8));
              }
            }}
            msgColor={isError.birth ? "red" : null}
            type="number"
            required
          />
          {/* <SignUpMsg color={isError.birth ? "red" : null}>
                  {inputMsg.birth}
                </SignUpMsg> */}
          <SignUpMsg color={isError?.birth ? "red" : null}>{msg}</SignUpMsg>
        </FlexDiv>
      )}
    </>
  );
};

export default SignUpItem;
