import {
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
  ReactElement,
  useCallback,
  useState,
} from "react";

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

  const onAddOption: FormEventHandler = (e) => {
    e.preventDefault();
    updateOptions(dropdownOptions.concat({ label: "", value: "" }));
  };

  const onChangeOption: (
    index: number
  ) => ChangeEventHandler<HTMLInputElement> = (index) => (e) => {
    const updatedOptions = dropdownOptions.map((option, idx) =>
      index === idx ? { ...option, label: e.target.value } : option
    );
    updateOptions(updatedOptions);
  };

  const onRemoveOption: (
    index: number
  ) => MouseEventHandler<HTMLButtonElement> = (index) => (e) => {
    e.preventDefault();
    const updatedOptions = dropdownOptions.filter((_, idx) => index !== idx);
    updateOptions(updatedOptions);
  };

  type OptionProps = {
    option: DropdownOption;
    onChange: ChangeEventHandler<HTMLInputElement>;
    onRemove: MouseEventHandler<HTMLButtonElement>;
    isLast?: boolean;
  };

  const Option = useCallback(
    ({ option, onChange, onRemove, isLast }: OptionProps): ReactElement => (
      <div className="dropdown-options-modifier-option">
        <TextInput
          autoFocus={isLast && dropdownOptions.length > 1}
          onChange={onChange}
          value={option.label}
        />
        <button
          type="button"
          onClick={onRemove}
          className="dropdown-options-remove-option-button"
        >
          X
        </button>
      </div>
    ),
    [dropdownOptions.length]
  );

  return (
    <InputContainer
      title="Options"
      subtitle="The selectable options for the dropdown input"
      component={
        <form
          onSubmit={onAddOption}
          className="dropdown-options-modifier-options"
        >
          {dropdownOptions.map((o, i) => (
            <Option
              isLast={i === dropdownOptions.length - 1}
              onChange={onChangeOption(i)}
              onRemove={onRemoveOption(i)}
              key={`dropdown-options-modifier-input-${i}`}
              option={o}
            />
          ))}
          <input
            className="dropdown-options-add-button"
            value="+"
            type="submit"
          />
        </form>
      }
    />
  );
};

export default DropdownOptions;
