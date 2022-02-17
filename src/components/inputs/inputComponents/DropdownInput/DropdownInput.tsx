import React, { useState, MouseEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

import { classIfProvided } from "../../../../helpers/classes";
import InputContainer from "../../InputContainer";

import IDropdownInput from "./IDropdownInput";
import "./DropdownInput.scss";

const DropdownInput = ({
  label,
  className,
  placeholder,
  styles,
  options,
  onChange,
  selection,
  selectionIcon,
}: IDropdownInput) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const onOptionSelect = (e: MouseEvent<HTMLLIElement>): void => {
    const target = e.target as HTMLLIElement;
    const inputType = target.textContent;
    onChange(inputType || "");
    setShowOptions(false);
  };

  const toggleOptionsVisibility = (): void => {
    setShowOptions(!showOptions);
  };

  const dropdownClasses = classNames({
    "dropdown-input-container": true,
    ...classIfProvided(className),
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

  return (
    <InputContainer
      label={label}
      component={
        <div
          className={dropdownClasses}
          onMouseLeave={() => setShowOptions(false)}
        >
          <div
            className={placeholderClasses}
            onClick={toggleOptionsVisibility}
            onMouseEnter={() => setShowOptions(true)}
            style={styles}
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
              options.map((o) => (
                <li
                  className="dropdown-input-option"
                  key={o.value}
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
