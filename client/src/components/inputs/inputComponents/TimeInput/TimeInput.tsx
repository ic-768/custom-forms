import { ReactElement } from "react";
import classNames from "classnames";

import InputContainer from "../../InputContainer";
import ITimeInput from "./ITimeInput";

import "./TimeInput.scss";

const TimeInput = ({
  title,
  className,
  value,
  onChange,
  style,
  placeholder,
}: ITimeInput): ReactElement => {
  const inputClasses = classNames({
    "time-input": true,
    [className!]: !!className,
  });

  return (
    <InputContainer
      title={title}
      className={className}
      component={
        <input
          onChange={onChange}
          placeholder={placeholder}
          value={value}
          style={style}
          className={inputClasses}
          type="time"
        />
      }
    />
  );
};

export default TimeInput;
