import React from "react";
import TimePicker from "react-time-picker";
import classNames from "classnames";

import { classIfProvided } from "../../../helpers/classes";
import InputContainer from "../../InputContainer";

import ITimeInput from "./ITimeInput";
import "./TimeInput.scss";

const TimeInput = ({
  label,
  className,
  value,
  onChange,
  maxDetail,
}: ITimeInput) => {
  const inputClasses = classNames({
    "time-input": true,
    "has-placeholder": !value,
    ...classIfProvided(className),
  });

  return (
    <InputContainer
      label={label}
      component={
        <TimePicker
          onChange={onChange}
          className={inputClasses}
          disableClock
          clearIcon={null}
          maxDetail={maxDetail}
          value={value}
        />
      }
    />
  );
};

export default TimeInput;
