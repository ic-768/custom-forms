import React from "react";
import TimePicker from "react-time-picker";
import classNames from "classnames";

import { classIfProvided } from "../../helpers/classes";

import ITimeInput from "./ITimeInput";
import "./TimeInput.scss";

const TimeInput = ({ className, value, onChange, maxDetail }: ITimeInput) => {
  const inputClasses = classNames({
    "time-input": true,
    "has-placeholder": !value,
    ...classIfProvided(className),
  });

  return (
    <TimePicker
      onChange={onChange}
      className={inputClasses}
      disableClock
      clearIcon={null}
      maxDetail={maxDetail}
      value={value}
    />
  );
};

export default TimeInput;
