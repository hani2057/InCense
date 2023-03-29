import React from "react";
import { FlexDiv } from "../FlexDiv/FlexDiv";
import { ToggleWrapper, ToggleLabel, ToggleInput } from "./style";

/*
 * Pros 설명
 *
 * [required]
 * (string) id: 구분을 위한 id값. html input tag의 label과 연결을 위한 id로 사용됨
 * (boolean) checked: 토글 상태를 저장하기 위한 state
 * (function) setChecked: checked state를 업데이트하기 위한 함수
 *
 * [optional]
 * (string) msgChecked: checked가 true일 경우 표시될 문자열. 디폴트값은 '공개'
 * (string) msgUnchecked: checked가 false일 경우 표시될 문자열. 디폴트값은 '비공개'
 *
 */

const Toggle = ({
  id,
  checked,
  setChecked,
  msgChecked,
  msgUnchecked,
  padding,
}) => {
  return (
    <FlexDiv justify="space-between" align="center" padding={padding}>
      <ToggleWrapper>
        <ToggleInput
          id={id}
          type="checkbox"
          onChange={() => setChecked((prev) => !prev)}
          checked={checked}
        />
        <ToggleLabel htmlFor={id} />
      </ToggleWrapper>
      <span>{checked ? msgChecked || "공개" : msgUnchecked || "비공개"}</span>
    </FlexDiv>
  );
};

export default Toggle;
