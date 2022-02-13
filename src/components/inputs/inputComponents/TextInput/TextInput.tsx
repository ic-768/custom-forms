import React from "react";
import classNames from "classnames";

import { classIfProvided } from "../../../../helpers/classes";
import InputContainer from "../../InputContainer";

import ITextInput from "./ITextInput";
import "./TextInput.scss";

const TextInput = ({
  label,
  className,
  placeholder,
  maxLength,
  modifiers,
}: ITextInput) => {
  const inputClasses = classNames({
    "text-input": true,
    ...classIfProvided(className),
  });

  return (
    <InputContainer
      label={label}
      component={
        <input
          style={modifiers}
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
