import React from "react";
import CheckboxWithIcon from "../CheckboxWithIcon/CheckboxWithIcon";
import { CheckBoxPickWrapper } from "./style";

/* 프롭스 설명
 *
 * (Array) textArr: 표시할 내용을 담을 배열
 * (Null or Number) pickedIdx: textArr에서 선택된 값의 idx.
 * (Function) setPickedIdx: pickedIdx state를 변경하는 함수
 *
 */

const CheckboxPickOne = ({
  textArr,
  pickedIdx,
  setPickedIdx,
  width,
  height,
  margin,
  padding,
}) => {
  return (
    <CheckBoxPickWrapper
      width={width}
      height={height}
      margin={margin}
      padding={padding}
      justify="space-around"
    >
      {textArr.map((text, idx) => (
        <CheckboxWithIcon
          text={text}
          isChecked={idx === pickedIdx ? true : false}
          funcClicked={() => setPickedIdx(idx)}
          pointer={true}
          key={idx}
        />
      ))}
    </CheckBoxPickWrapper>
  );
};

export default CheckboxPickOne;
