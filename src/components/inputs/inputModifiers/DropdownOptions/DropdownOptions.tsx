import React, { useState, useEffect, ChangeEvent } from "react";
import { TextInput } from "../../inputComponents";
import { IDropdownOption } from "../../inputComponents/DropdownInput";
import InputContainer from "../../InputContainer";

import "./DropdownOptions.scss";

interface IDropdownOptions {
  onChange: (options: IDropdownOption[]) => void;
}

// TODO give option to also change the value (what is produced for form owner when an option is selected)
const DropdownOptions = ({ onChange }: IDropdownOptions) => {
  // when options are changed, update outer state

  const [dropdownOptions, setDropdownOptions] = useState<IDropdownOption[]>([
    { value: "", label: "" },
  ]);

  useEffect(() => {
    onChange(dropdownOptions);
  }, [dropdownOptions]);

  return (
    <InputContainer
      label="Add as many options as you'd like"
      component={
        <div className="dropdown-options-dropdown-options">
          {dropdownOptions.map((o, i) => (
            <div
              key={`dropdown-options-input-${i}`}
              className="dropdown-options-dropdown-option"
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
