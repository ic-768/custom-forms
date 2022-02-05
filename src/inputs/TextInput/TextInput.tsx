import React from "react";
import classNames from "classnames";

import { classIfProvided } from "../../helpers/classes";

import ITextInput from "./ITextInput";
import "./TextInput.scss";

const TextInput = ({ className, placeholder, maxLength }: ITextInput) => {
  const inputClasses = classNames({
    "text-input": true,
    ...classIfProvided(className),
  });

  return (
    <input
      className={inputClasses}
      type="text"
      placeholder={placeholder}
      maxLength={maxLength}
    />
  );
};

export default TextInput;