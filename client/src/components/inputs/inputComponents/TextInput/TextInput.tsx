import classNames from "classnames";

import InputContainer from "../../InputContainer";
import ITextInput from "./ITextInput";

import "./TextInput.scss";

const TextInput = ({
  onChange,
  value,
  title,
  subtitle,
  className,
  placeholder,
  maxLength,
  style,
  autoFocus,
}: ITextInput) => {
  const inputClasses = classNames({
    "text-input": true,
    [className!]: !!className,
  });

  return (
    <InputContainer
      title={title}
      subtitle={subtitle}
      className={className}
      component={
        <input
          autoFocus={autoFocus}
          onChange={onChange}
          value={value}
          style={style}
          className={inputClasses}
          type="text"
          placeholder={placeholder}
          maxLength={maxLength}
        />
      }
    />
  );
};

export default TextInput;
