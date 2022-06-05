import { useState, MouseEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

import InputContainer from "../../InputContainer";
import IDropdownInput from "./IDropdownInput";

import "./DropdownInput.scss";

const DropdownInput = <T extends string>({
  title,
  subtitle,
  className,
  placeholder,
  style,
  options,
  onChange,
  selection,
  selectionIcon,
}: IDropdownInput<T>) => {
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
    "is-option-selected": selection,
  });

  const dropdownOptionsClasses = classNames({
    "dropdown-input-options": true,
    "showing-options": showOptions,
  });

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
          onMouseLeave={() => setShowOptions(false)}
        >
          <div
            className={placeholderClasses}
            onClick={toggleOptionsVisibility}
            onMouseEnter={() => setShowOptions(true)}
            style={placeholderStyle}
          >
            {selectionIcon && (
              <FontAwesomeIcon
                className="dropdown-input-icon dropdown-input-placeholder-icon"
                icon={selectionIcon}
              />
            )}
            {selection || placeholder}
            <FontAwesomeIcon
              className="dropdown-input-chevron-icon"
              icon={showOptions ? faChevronUp : faChevronDown}
            />
          </div>
          <ul className={dropdownOptionsClasses}>
            {options &&
              options.map((o, i) => (
                <li
                  className="dropdown-input-option"
                  key={`dropdown-input-${i}`}
                  value={o.value}
                  onClick={onOptionSelect}
                >
                  {o.icon && (
                    <FontAwesomeIcon
                      className="dropdown-input-icon"
                      icon={o.icon}
                    />
                  )}
                  {o.label}
                </li>
              ))}
          </ul>
        </div>
      }
    />
  );
};
export default DropdownInput;
