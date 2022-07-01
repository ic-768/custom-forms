import { ReactElement } from "react";
import classNames from "classnames";

import InputContainer from "../../InputContainer";
import TimeInputProps from "./TimeInputProps";

import "./TimeInput.scss";

const TimeInput = ({
  title,
  className,
  value,
  onChange,
  style,
  placeholder,
}: TimeInputProps): ReactElement => {
  const inputClasses = classNames({
    "time-input": true,
    [className!]: !!className,
  });

  const { titleColor, marginTop, ...inputStyle } = { ...style };

  return (
    <InputContainer
      title={title}
      className={className}
      style={{ titleColor, marginTop }}
      component={
        <input
          onChange={onChange}
          placeholder={placeholder}
          value={value}
          style={inputStyle}
          className={inputClasses}
          type="time"
        />
      }
    />
  );
};

export default TimeInput;
