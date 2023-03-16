import React from "react";
import CheckboxContext from "./CheckboxContext";
import { useContext } from "react";

export default function Checkbox({ children, disabled, value, checked, onChange }) {
  const context = useContext(CheckboxContext);

  if (!context) {
    return (
      <label>
        <input
          type="checkbox"
          disabled={disabled}
          checked={checked}
          onChange={({ target: { checked } }) => onChange(checked)}
        />
        {children}
      </label>
    );
  }

  const { isDisabled, isChecked, toggleValue } = context;

  return (
    <label>
      <input
        type="checkbox"
        disabled={isDisabled(disabled)}
        checked={isChecked(value)}
        onChange={({ target: { checked } }) => toggleValue({ checked, value })}
      />
      {children}
    </label>
  );
}


// https://www.daleseo.com/react-context/ 참고