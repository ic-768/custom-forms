import {
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
  ReactElement,
  useCallback,
  useState,
} from "react";

import { TextInput } from "components/inputs/inputComponents";
import InputContainer from "components/inputs/InputContainer";

import "./MultipleEntryInput.scss";

type Option = { label: string };

interface MultipleEntryInputProps<T extends Option> {
  title: string;
  subtitle?: string;
  initialOptions: T[];
  emptyOption: T;
  onChange: (options: T[]) => void;
}

const MultipleEntryInput = <T extends Option>({
  title,
  subtitle,
  initialOptions,
  emptyOption,
  onChange,
}: MultipleEntryInputProps<T>): ReactElement => {
  const [options, setOptions] = useState<T[]>(initialOptions || []);

  type OptionProps = {
    option: T;
    onChange: ChangeEventHandler<HTMLInputElement>;
    onRemove: MouseEventHandler<HTMLButtonElement>;
    isLast?: boolean;
  };

  const updateOptions = (options: T[]): void => {
    onChange(options);
    setOptions(options);
  };

  const onAddOption: FormEventHandler = (e) => {
    e.preventDefault();
    updateOptions(options.concat(emptyOption));
  };

  const onChangeOption: (
    index: number
  ) => ChangeEventHandler<HTMLInputElement> = (index) => (e) => {
    const updatedOptions = options.map((option, idx) =>
      index === idx ? { ...option, label: e.target.value } : option
    );
    updateOptions(updatedOptions);
  };

  const onRemoveOption: (
    index: number
  ) => MouseEventHandler<HTMLButtonElement> = (index) => (e) => {
    e.preventDefault();
    const updatedOptions = options.filter((_, idx) => index !== idx);
    updateOptions(updatedOptions);
  };

  const Option = useCallback(
    ({ option, onChange, onRemove, isLast }: OptionProps): ReactElement => (
      <div className="multiple-entry-options-modifier-option">
        <TextInput
          autoFocus={isLast && options.length > 1}
          onChange={onChange}
          value={option.label}
        />
        <button
          onClick={onRemove}
          type="button"
          className="multiple-entry-options-remove-option-button"
        >
          X
        </button>
      </div>
    ),
    [options.length]
  );

  return (
    <InputContainer
      title={title}
      subtitle={subtitle}
      component={
        <form
          onSubmit={onAddOption}
          className="multiple-entry-options-modifier-options"
        >
          {options.map((o, i) => (
            <Option
              isLast={i === options.length - 1}
              onChange={onChangeOption(i)}
              onRemove={onRemoveOption(i)}
              key={`multiple-entry-options-modifier-input-${i}`}
              option={o}
            />
          ))}
          <input
            className="multiple-entry-options-add-button"
            value="+"
            type="submit"
          />
        </form>
      }
    />
  );
};

export default MultipleEntryInput;
