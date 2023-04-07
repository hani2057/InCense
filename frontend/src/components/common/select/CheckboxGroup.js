import CheckboxContext from "./CheckboxContext";

export default function CheckboxGroup({
  label,
  children,
  disabled: groupDisabled,
  values,
  onChange
}) {
  const isDisabled = (disabled) => disabled || groupDisabled;

  const isChecked = (value) => values.includes(value);

  const toggleValue = ({ checked, value }) => {
    if (checked) {
      onChange(values.concat(value));
    } else {
      // console.log(values)
      onChange(values.filter((v) => v !== value));
    }
  };

  return (
    <fieldset>
      <legend>{label}</legend>
      <CheckboxContext.Provider value={{ isDisabled, isChecked, toggleValue }} >
        {children}
      </CheckboxContext.Provider>
    </fieldset>
  );
}