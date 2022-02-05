import React from "react";
import classNames from "classnames";

import { classIfProvided } from "../../helpers/classes";

import INumberInput from "./INumberInput";
import "./NumberInput.scss";

const NumberInput = ({
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
    <input
      type="number"
      className={inputClasses}
      placeholder={placeholder}
      min={min}
      max={max}
      width={width}
    />
  );
};

export default NumberInput;
