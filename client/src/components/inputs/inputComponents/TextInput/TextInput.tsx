import { ReactElement } from "react";
import classNames from "classnames";

import InputContainer from "../../InputContainer";
import TextInputProps from "./TextInputProps";

import "./TextInput.scss";

const TextInput = ({
  onChange,
  value,
  title,
  subtitle,
  className,
  placeholder,
  maxLength,
  style,
  autoFocus,
}: TextInputProps): ReactElement => {
  const inputClasses = classNames({
    "text-input": true,
    [className!]: !!className,
  });

  return (
    <InputContainer
      title={title}
      subtitle={subtitle}
      className={className}
      component={
        <input
          autoFocus={autoFocus}
          onChange={onChange}
          value={value}
          style={style}
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
