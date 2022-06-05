import classNames from "classnames";

import InputContainer from "../../InputContainer";
import IDateInput from "./IDateInput";

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
}: IDateInput) => {
  const inputClasses = classNames({
    "date-input": true,
    [className!]: !!className,
  });

  return (
    <InputContainer
      title={title}
      className={className}
      component={
        <input
          style={style}
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
