import { ReactElement } from "react";
import classNames from "classnames";

import InputContainer from "../../InputContainer";
import NumberInputProps from "./NumberInputProps";

import "./NumberInput.scss";

const NumberInput = ({
  value,
  onChange,
  title,
  subtitle,
  placeholder,
  className,
  min,
  max,
  style,
}: NumberInputProps): ReactElement => {
  const inputClasses = classNames({
    "number-input": true,
    [className!]: !!className,
  });

  const { titleColor, marginTop, ...inputStyle } = { ...style };

  return (
    <InputContainer
      title={title}
      subtitle={subtitle}
      className={className}
      style={{ titleColor, marginTop }}
      component={
        <input
          style={inputStyle}
          value={value}
          onChange={onChange}
          type="number"
          className={inputClasses}
          placeholder={placeholder}
          min={min}
          max={max}
        />
      }
    />
  );
};

export default NumberInput;
