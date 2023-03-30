import React from "react";
import { FlexDiv } from "../../components/common/FlexDiv/FlexDiv";
import { ReactComponent as CheckSvg } from "../../components/common/CheckboxWithIcon/check.svg"

/* 프롭스 설명
 *
 * (String) text: 체크아이콘 옆에 표시할 내용
 * (Boolean) isChecked: 체크여부를 상위 컴포넌트에서 props로 내려줄 것
 *                      체크아이콘과 text가 true면 main color, false면 gray color로 표시됨
 * (Function) funcClicked: 클릭시 실행할 함수
 *
 */

const CheckSetting = ({
  text,
  isChecked,
  funcClicked,
  pointer,
  color,
  colorPicked,
}) => {
  return (
    <FlexDiv
      onClick={funcClicked}
      width="auto"
      height="auto"
      style={{ cursor: `${pointer ? "pointer" : "default"}` }}
    >
      <CheckSvg
        stroke="currentColor"
        style={{
          color:'lightgrey'
          // color: `${
          //   isChecked
          //     ? colorPicked
          //       ? `var(--${colorPicked}-color`
          //       : "var(--main-color)"
          //     : color
          //     ? `var(--${color}-color`
          //     : "var(--gray-color)"
          // }`,
        }}
      />
      <span
        style={{
          color:"lightgrey",
          // color: `${
          //   isChecked
          //     ? colorPicked
          //       ? `var(--${colorPicked}-color`
          //       : "var(--main-color)"
          //     : color
          //     ? `var(--${color}-color`
          //     : "var(--gray-color)"
          // }`,
          paddingLeft: "0.5rem",
        }}
      >
        {text}
      </span>
    </FlexDiv>
  );
};

export default CheckSetting;
