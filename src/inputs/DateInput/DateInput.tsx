import React from "react";
import classNames from "classnames";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import Calendar from "react-modern-calendar-datepicker";

import { classIfProvided } from "../../helpers/classes";

import "./DateInput.scss";
import IDateInput from "./IDateInput";

const DateInput = ({ className, placeholder, date, onChange }: IDateInput) => {
  const inputClasses = classNames({
    "date-input": true,
    ...classIfProvided(className),
  });

  return (
    <Calendar
      inputPlaceholder={placeholder}
      inputClassName={inputClasses}
      value={date}
      onChange={onChange}
    />
  );
};

export default DateInput;
