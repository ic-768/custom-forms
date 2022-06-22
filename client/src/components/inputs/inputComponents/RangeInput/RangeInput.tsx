import { ReactElement } from "react";
import classNames from "classnames";

import InputContainer from "../../InputContainer";

import RangeInputProps from "./RangeInputProps";
import "./RangeInput.scss";

const RangeInput = ({
  title,
  className,
  value,
  onChange,
  style,
  min,
  max,
  step,
  placeholder,
}: RangeInputProps): ReactElement => {
  const inputClasses = classNames({
    "range-input": true,
    [className!]: !!className,
  });

  return (
    <InputContainer
      title={title}
      className={className}
      component={
        <div className="range-input-container">
          {value !== undefined && <span>{value}</span>}
          <input
            onChange={onChange}
            placeholder={placeholder}
            value={value}
            style={style}
            min={min}
            max={max}
            step={step}
            className={inputClasses}
            type="range"
          />
        </div>
      }
    />
  );
};

export default RangeInput;
