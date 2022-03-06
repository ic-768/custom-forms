import { useState, ChangeEvent } from "react";
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

  // update local and outer state
  const updateOptions = (options: IDropdownOption[]) => {
    setDropdownOptions(options);
    onChange(options);
  };

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
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const updatedOptions = dropdownOptions.map((option, idx) =>
                    i === idx ? { ...option, label: e.target.value } : option
                  );
                  updateOptions(updatedOptions);
                }}
                value={o.label}
              />
              <div
                onClick={() => {
                  const updatedOptions = dropdownOptions.filter(
                    (_, idx) => i !== idx
                  );
                  updateOptions(updatedOptions);
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
