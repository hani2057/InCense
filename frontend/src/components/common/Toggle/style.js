import styled from "styled-components";

const ToggleWrapper = styled.div`
  position: relative;
  display: inline-block;
`;
const ToggleLabel = styled.label`
  position: absolute;
  top: 4px;
  left: 0;
  width: 42px;
  height: 24px;
  border-radius: 15px;
  background: var(--gray-color);
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;

const ToggleInput = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 24px;
  &:checked + ${ToggleLabel} {
    background: var(--main-color);
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;

export { ToggleWrapper, ToggleLabel, ToggleInput };
