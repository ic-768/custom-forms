import React from "react";
import classNames from "classnames";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import Calendar from "react-modern-calendar-datepicker";

import { classIfProvided } from "../../../../helpers/classes";
import InputContainer from "../../InputContainer";

import IDateInput from "./IDateInput";
import "./DateInput.scss";

const DateInput = ({
  label,
  className,
  placeholder,
  date,
  onChange,
  // TODO
  styles,
}: IDateInput) => {
  const inputClasses = classNames({
    "date-input": true,
    ...classIfProvided(className),
  });

  return (
    <InputContainer
      label={label}
      className={className}
      component={
        <Calendar
          inputPlaceholder={placeholder}
          inputClassName={inputClasses}
          value={date}
          onChange={onChange}
        />
      }
    />
  );
};

export default DateInput;
