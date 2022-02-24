import React, { useState, useEffect, ChangeEvent } from "react";
import { TextInput } from "../../inputComponents";
import { IDropdownOption } from "../../inputComponents/DropdownInput";
import InputContainer from "../../InputContainer";

import "./DropdownOptions.scss";

interface IDropdownOptions {
  onChange: (options: IDropdownOption[]) => void;
}

const DropdownOptions = ({ onChange }: IDropdownOptions) => {
  const [dropdownOptions, setDropdownOptions] = useState<IDropdownOption[]>([
    { value: "", label: "" },
  ]);

  // when options are changed, update outer state
  // TODO simplify logic and improve UX
  useEffect(() => {
    dropdownOptions.length &&
      dropdownOptions[dropdownOptions.length - 1].label &&
      onChange(dropdownOptions);
  }, [dropdownOptions]);

  return (
    <InputContainer
      label="Add as many options as you'd like"
      component={
        <div className="dropdown-options-modifier-options">
          {dropdownOptions.map((o, i) => (
            <div
              key={`dropdown-options-modifier-input-${i}`}
              className="dropdown-options-modifier-option"
            >
              <TextInput
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setDropdownOptions(
                    dropdownOptions.map((option, idx) =>
                      i === idx ? { ...option, label: e.target.value } : option
                    )
                  )
                }
                value={o.label}
              />
              <div
                onClick={() => {
                  setDropdownOptions(
                    dropdownOptions.filter((_, idx) => i !== idx)
                  );
                }}
                className="dropdown-options-remove-option-button"
              >
                X
              </div>
            </div>
          ))}
          <div
            className="dropdown-options-add-button"
            onClick={() =>
              setDropdownOptions(
                dropdownOptions.concat({ label: "", value: "" })
              )
            }
          >
            +
          </div>
        </div>
      }
    />
  );
};

export default DropdownOptions;
