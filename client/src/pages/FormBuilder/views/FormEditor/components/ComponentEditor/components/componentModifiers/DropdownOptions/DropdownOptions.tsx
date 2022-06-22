import { ReactElement, useState } from "react";

import { TextInput } from "components/inputs/inputComponents";
import { DropdownOption } from "components/inputs/inputComponents/DropdownInput";
import InputContainer from "components/inputs/InputContainer";

import "./DropdownOptions.scss";

interface DropdownOptionsProps {
  onChange: (options: DropdownOption[]) => void;
}

const DropdownOptions = ({ onChange }: DropdownOptionsProps): ReactElement => {
  const [dropdownOptions, setDropdownOptions] = useState<DropdownOption[]>([
    { value: "", label: "" },
  ]);

  // update local and outer state
  const updateOptions = (options: DropdownOption[]): void => {
    setDropdownOptions(options);
    onChange(options);
  };

  return (
    <InputContainer
      title="Options"
      subtitle="The selectable options for the dropdown input"
      component={
        <div className="dropdown-options-modifier-options">
          {dropdownOptions.map((o, i) => (
            <div
              key={`dropdown-options-modifier-input-${i}`}
              className="dropdown-options-modifier-option"
            >
              <TextInput
                onChange={(e): void => {
                  const updatedOptions = dropdownOptions.map((option, idx) =>
                    i === idx ? { ...option, label: e.target.value } : option
                  );
                  updateOptions(updatedOptions);
                }}
                value={o.label}
              />
              <div
                onClick={(): void => {
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
            onClick={(): void =>
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
