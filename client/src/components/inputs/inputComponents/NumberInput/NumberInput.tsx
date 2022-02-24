import React from "react";
import classNames from "classnames";

import { classIfProvided } from "../../../../helpers/classes";
import InputContainer from "../../InputContainer";

import INumberInput from "./INumberInput";
import "./NumberInput.scss";

const NumberInput = ({
  value,
  onChange,
  label,
  placeholder,
  className,
  min,
  max,
  width,
  styles,
}: INumberInput) => {
  const inputClasses = classNames({
    "number-input": true,
    ...classIfProvided(className),
  });

  return (
    <InputContainer
      label={label}
      className={className}
      component={
        <input
          style={styles}
          value={value}
          onChange={onChange}
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
