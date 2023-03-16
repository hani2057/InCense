import React from "react";
import CheckBox from "../CheckBox/CheckBox";
import { FlexDiv } from "../FlexDiv/FlexDiv";
import { CheckBoxPickWrapper } from "./style";

/* 프롭스 설명
 *
 * (Array) textArr: 표시할 내용을 담을 배열
 * (Null or Number) pickedIdx: textArr에서 선택된 값의 idx.
 * (Function) setPickedIdx: pickedIdx state를 변경하는 함수
 *
 */

const CheckBoxPickOne = ({
  textArr,
  pickedIdx,
  setPickedIdx,
  width,
  height,
  margin,
}) => {
  return (
    <CheckBoxPickWrapper
      width={width}
      height={height}
      margin={margin}
      justify="space-around"
    >
      {textArr.map((text, idx) => (
        <CheckBox
          text={text}
          isChecked={idx === pickedIdx ? true : false}
          funcClicked={() => setPickedIdx(idx)}
          key={idx}
        />
      ))}
    </CheckBoxPickWrapper>
  );
};

export default CheckBoxPickOne;
