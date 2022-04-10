import classNames from "classnames";

import InputContainer from "../../InputContainer";
import INumberInput from "./INumberInput";

import "./NumberInput.scss";

const NumberInput = ({
  value,
  onChange,
  title,
  subtitle,
  placeholder,
  className,
  min,
  max,
  style,
}: INumberInput) => {
  const inputClasses = classNames({
    "number-input": true,
    [className!]: !!className,
  });

  return (
    <InputContainer
      title={title}
      subtitle={subtitle}
      className={className}
      component={
        <input
          style={style}
          value={value}
          onChange={onChange}
          type="number"
          className={inputClasses}
          placeholder={placeholder}
          min={min}
          max={max}
        />
      }
    />
  );
};

export default NumberInput;
