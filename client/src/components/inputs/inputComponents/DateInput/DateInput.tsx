import { ReactElement } from "react";
import classNames from "classnames";

import InputContainer from "../../InputContainer";
import DateInputProps from "./DateInputProps";

import "./DateInput.scss";

const DateInput = ({
  value,
  onChange,
  title,
  placeholder,
  className,
  style,
  min,
  max,
}: DateInputProps): ReactElement => {
  const inputClasses = classNames({
    "date-input": true,
    [className!]: !!className,
  });

  const { titleColor, marginTop, ...inputStyle } = { ...style };

  return (
    <InputContainer
      title={title}
      className={className}
      style={{ marginTop, titleColor }}
      component={
        <input
          style={inputStyle}
          value={value}
          onChange={onChange}
          type="date"
          className={inputClasses}
          placeholder={placeholder}
          min={min}
          max={max}
        />
      }
    />
  );
};

export default DateInput;
