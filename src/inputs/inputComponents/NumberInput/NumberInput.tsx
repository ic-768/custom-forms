import React from "react";
import classNames from "classnames";

import { classIfProvided } from "../../../helpers/classes";
import InputContainer from "../../InputContainer";

import INumberInput from "./INumberInput";
import "./NumberInput.scss";

const NumberInput = ({
  label,
  placeholder,
  className,
  min,
  max,
  width,
}: INumberInput) => {
  const inputClasses = classNames({
    "number-input": true,
    ...classIfProvided(className),
  });

  return (
    <InputContainer
      label={label}
      component={
        <input
          type="number"
          className={inputClasses}
          placeholder={placeholder}
          min={min}
          max={max}
          width={width}
        />
      }
    />
  );
};

export default NumberInput;