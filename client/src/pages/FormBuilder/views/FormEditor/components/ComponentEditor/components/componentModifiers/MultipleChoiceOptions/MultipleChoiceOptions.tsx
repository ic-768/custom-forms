import {
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
  ReactElement,
  useCallback,
  useState,
} from "react";

import { TextInput } from "components/inputs/inputComponents";
import { MultipleChoiceOption } from "components/inputs/inputComponents/MultipleChoiceInput";
import InputContainer from "components/inputs/InputContainer";

import "./MultipleChoiceOptions.scss";

interface MultipleChoiceOptionsProps {
  onChange: (options: MultipleChoiceOption[]) => void;
}

const MultipleChoiceOptions = ({
  onChange,
}: MultipleChoiceOptionsProps): ReactElement => {
  const [multipleChoiceOptions, setMultipleChoiceOptions] = useState<
    MultipleChoiceOption[]
  >([{ label: "" }]);

  // update local and outer state
  const updateOptions = (options: MultipleChoiceOption[]): void => {
    setMultipleChoiceOptions(options);
    onChange(options);
  };

  const onAddOption: FormEventHandler = (e) => {
    e.preventDefault();
    updateOptions(multipleChoiceOptions.concat({ label: "" }));
  };

  const onChangeOption: (
    index: number
  ) => ChangeEventHandler<HTMLInputElement> = (index) => (e) => {
    const updatedOptions = multipleChoiceOptions.map((option, idx) =>
      index === idx ? { ...option, label: e.target.value } : option
    );
    updateOptions(updatedOptions);
  };

  const onRemoveOption: (
    index: number
  ) => MouseEventHandler<HTMLButtonElement> = (index) => (e) => {
    e.preventDefault();
    const updatedOptions = multipleChoiceOptions.filter(
      (_, idx) => index !== idx
    );
    updateOptions(updatedOptions);
  };

  type OptionProps = {
    option: MultipleChoiceOption;
    onChange: ChangeEventHandler<HTMLInputElement>;
    onRemove: MouseEventHandler<HTMLButtonElement>;
    isLast?: boolean;
  };

  const Option = useCallback(
    ({ option, onChange, onRemove, isLast }: OptionProps): ReactElement => (
      <div className="multiple-choice-options-modifier-option">
        <TextInput
          autoFocus={isLast && multipleChoiceOptions.length > 1}
          onChange={onChange}
          value={option.label}
        />
        <button
          onClick={onRemove}
          type="button"
          className="multiple-choice-options-remove-option-button"
        >
          X
        </button>
      </div>
    ),
    [multipleChoiceOptions.length]
  );

  return (
    <InputContainer
      title="Options"
      subtitle="The selectable options for the multiple choice input"
      component={
        <form
          onSubmit={onAddOption}
          className="multiple-choice-options-modifier-options"
        >
          {multipleChoiceOptions.map((o, i) => (
            <Option
              isLast={i === multipleChoiceOptions.length - 1}
              onChange={onChangeOption(i)}
              onRemove={onRemoveOption(i)}
              key={`multiple-choice-options-modifier-input-${i}`}
              option={o}
            />
          ))}
          <input
            className="multiple-choice-options-add-button"
            value="+"
            type="submit"
          />
        </form>
      }
    />
  );
};

export default MultipleChoiceOptions;
