import React from "react";
import CheckSetting from "./CheckSetting";
import { CheckBoxPickWrapper } from "./style";

/* 프롭스 설명
 *
 * (Array) textArr: 표시할 내용을 담을 배열
 * (Null or Number) pickedIdx: textArr에서 선택된 값의 idx.
 * (Function) setPickedIdx: pickedIdx state를 변경하는 함수
 *
 */

const CheckStatus = ({
  textArr,
  pickedIdx,
  setPickedIdx,
  width,
  height,
  margin,
  padding,
  color,
  colorPicked,
  onClickModal,
  isOpen,
  setIsOpen,
  category
}) => {

  // const onClickButton = () => {
  //   console.log(pickedIdx)
  // } 
  // console.log(pickedIdx)
  // if (pickedIdx || pickedIdx === 0) {
  //   setIsOpen(true)
  // }

  const onClickCheckList = () => {
    onClickModal()
  }

  return (
    <CheckBoxPickWrapper
      onClick={onClickCheckList}
      width={width}
      height={height}
      margin={margin}
      padding={padding}
      justify="space-around"
    >
      {textArr.map((text, idx) => (
        <CheckSetting
          text={text}
          isChecked={idx === pickedIdx ? true : false}
          funcClicked={() => setPickedIdx(idx)}
          // funcClicked={onClickButton}
          pointer={true}
          key={idx}
          color={color}
          colorPicked={colorPicked}
          category={category}
          // onClickModal={onClickModal}
          
          
        />
      ))}
    </CheckBoxPickWrapper>
  );
};

export default CheckStatus;
