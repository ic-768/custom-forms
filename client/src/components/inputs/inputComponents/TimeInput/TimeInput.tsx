import TimePicker from "react-time-picker";
import classNames from "classnames";

import InputContainer from "../../InputContainer";

import ITimeInput from "./ITimeInput";
import "./TimeInput.scss";

const TimeInput = ({
  label,
  className,
  value,
  onChange,
  maxDetail,
  // TODO
  styles,
}: ITimeInput) => {
  const inputClasses = classNames({
    "time-input": true,
    "has-placeholder": !value,
    [className!]: !!className,
  });

  return (
    <InputContainer
      label={label}
      className={className}
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