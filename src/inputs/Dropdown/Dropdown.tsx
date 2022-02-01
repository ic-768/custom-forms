import React, { useState, MouseEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

import IDropdown from "./IDropdown";
import "./Dropdown.css";

const Dropdown = ({
  className,
  id,
  placeholder,
  options,
  onChange,
  selection,
  selectionIcon,
}: IDropdown) => {
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
    "dropdown-container": true,
    ...(typeof className === "string" ? { [className]: true } : {}),
  });

  const placeholderClasses = classNames({
    "dropdown-placeholder": true,
    "showing-options": showOptions,
    "is-option-selected": selection,
  });

  const dropdownOptionsClasses = classNames({
    "dropdown-options": true,
    "showing-options": showOptions,
  });

  return (
    <div
      id={id}
      className={dropdownClasses}
      onMouseLeave={() => setShowOptions(false)}
    >
      <div
        className={placeholderClasses}
        onClick={toggleOptionsVisibility}
        onMouseEnter={() => setShowOptions(true)}
      >
        {selectionIcon && (
          <FontAwesomeIcon
            className="dropdown-icon dropdown-placeholder-icon"
            icon={selectionIcon}
          />
        )}
        {selection || placeholder}
        <FontAwesomeIcon
          className="dropdown-chevron-icon"
          icon={showOptions ? faChevronUp : faChevronDown}
        />
      </div>
      <ul className={dropdownOptionsClasses}>
        {options.map((o) => (
          <li
            className="dropdown-option"
            key={o.value}
            value={o.value}
            onClick={onOptionSelect}
          >
            {o.icon && (
              <FontAwesomeIcon className="dropdown-icon" icon={o.icon} />
            )}
            {o.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Dropdown;
