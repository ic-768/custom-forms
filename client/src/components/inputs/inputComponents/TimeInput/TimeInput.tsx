import classNames from "classnames";

import InputContainer from "../../InputContainer";

import ITimeInput from "./ITimeInput";
import "./TimeInput.scss";

const TimeInput = ({
  label,
  className,
  value,
  onChange,
  styles,
  placeholder,
}: ITimeInput) => {
  const inputClasses = classNames({
    "time-input": true,
    [className!]: !!className,
  });

  return (
    <InputContainer
      label={label}
      className={className}
      component={
        <input
          placeholder={placeholder}
          value={value}
          style={styles}
          className={inputClasses}
          type="time"
        />
      }
    />
  );
};

export default TimeInput;
