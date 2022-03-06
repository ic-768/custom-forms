import classNames from "classnames";

import InputContainer from "../../InputContainer";
import ITextInput from "./ITextInput";

import "./TextInput.scss";

const TextInput = ({
  onChange,
  value,
  label,
  className,
  placeholder,
  maxLength,
  styles,
}: ITextInput) => {
  const inputClasses = classNames({
    "text-input": true,
    [className!]: !!className,
  });

  return (
    <InputContainer
      label={label}
      className={className}
      component={
        <input
          onChange={onChange}
          value={value}
          style={styles}
          className={inputClasses}
          type="text"
          placeholder={placeholder}
          maxLength={maxLength}
        />
      }
    />
  );
};

export default TextInput;
