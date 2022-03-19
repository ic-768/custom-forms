import classNames from "classnames";

import InputContainer from "../../InputContainer";
import IDateInput from "./IDateInput";

import "./DateInput.scss";

const DateInput = ({
  date,
  onChange,
  label,
  placeholder,
  className,
  styles,
  min,
  max,
}: IDateInput) => {
  const inputClasses = classNames({
    "date-input": true,
    [className!]: !!className,
  });

  return (
    <InputContainer
      label={label}
      className={className}
      component={
        <input
          style={styles}
          value={date}
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
