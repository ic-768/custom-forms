import { useState, MouseEvent, ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

import InputContainer from "../../InputContainer";
import DropdownInputProps, { DropdownOption } from "./DropdownInputProps";

import "./DropdownInput.scss";

const DropdownInput = <T extends string>({
  title,
  subtitle,
  className,
  placeholder,
  style,
  options,
  onChange,
  value,
  selectionIcon,
}: DropdownInputProps<T>): ReactElement => {
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const onOptionSelect = (e: MouseEvent<HTMLLIElement>): void => {
    if (!onChange) return;
    const target = e.target as HTMLLIElement;
    const option = target.textContent as T;
    onChange(option!);
    setShowOptions(false);
  };

  const toggleOptionsVisibility = (): void => {
    setShowOptions(!showOptions);
  };

  const dropdownClasses = classNames({
    "dropdown-input-container": true,
    [className!]: !!className,
  });

  const placeholderClasses = classNames({
    "dropdown-input-placeholder": true,
    "showing-options": showOptions,
    "is-option-selected": value,
  });

  const dropdownOptionsClasses = classNames({
    "dropdown-input-options": true,
    "showing-options": showOptions,
  });

  const hasOptions = options?.length;

  const Option = ({ option }: { option: DropdownOption }): ReactElement => (
    <li
      className="dropdown-input-option"
      role="button"
      tabIndex={0}
      value={option.value}
      onClick={onOptionSelect}
    >
      {option.icon && (
        <FontAwesomeIcon className="dropdown-input-icon" icon={option.icon} />
      )}
      {option.label}
    </li>
  );
  const emptyOption: DropdownOption = {
    label: " ",
    value: " ",
  };

  const { marginBottom, ...placeholderStyle } = { ...style };

  return (
    <InputContainer
      title={title}
      subtitle={subtitle}
      className={className}
      component={
        <div
          style={{ marginBottom }}
          className={dropdownClasses}
          onMouseLeave={(): void => setShowOptions(false)}
        >
          <div
            className={placeholderClasses}
            role="button"
            tabIndex={0}
            onClick={toggleOptionsVisibility}
            onMouseEnter={(): void => setShowOptions(true)}
            style={placeholderStyle}
          >
            {selectionIcon && (
              <FontAwesomeIcon
                className="dropdown-input-icon dropdown-input-placeholder-icon"
                icon={selectionIcon}
              />
            )}
            {value || placeholder}
            <FontAwesomeIcon
              className="dropdown-input-chevron-icon"
              icon={showOptions ? faChevronUp : faChevronDown}
            />
          </div>
          <ul className={dropdownOptionsClasses}>
            {hasOptions ? (
              options.map((o, i) => (
                <Option key={`dropdown-input-${i}`} option={o} />
              ))
            ) : (
              <Option option={emptyOption} />
            )}
          </ul>
        </div>
      }
    />
  );
};
export default DropdownInput;
