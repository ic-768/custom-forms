import { ReactElement, useState } from "react";

import { TextInput } from "components/inputs/inputComponents";
import { IMultipleChoiceOption } from "components/inputs/inputComponents/MultipleChoiceInput";
import InputContainer from "components/inputs/InputContainer";

import "./MultipleChoiceOptions.scss";

interface IMultipleChoiceOptions {
  onChange: (options: IMultipleChoiceOption[]) => void;
}

const MultipleChoiceOptions = ({
  onChange,
}: IMultipleChoiceOptions): ReactElement => {
  const [multipleChoiceOptions, setMultipleChoiceOptions] = useState<
    IMultipleChoiceOption[]
  >([{ label: "" }]);

  // update local and outer state
  const updateOptions = (options: IMultipleChoiceOption[]): void => {
    setMultipleChoiceOptions(options);
    onChange(options);
  };

  return (
    <InputContainer
      title="Options"
      subtitle="The selectable options for the multiple choice input"
      component={
        <div className="multiple-choice-options-modifier-options">
          {multipleChoiceOptions.map((o, i) => (
            <div
              key={`multiple-choice-options-modifier-input-${i}`}
              className="multiple-choice-options-modifier-option"
            >
              <TextInput
                onChange={(e): void => {
                  const updatedOptions = multipleChoiceOptions.map(
                    (option, idx) =>
                      i === idx ? { ...option, label: e.target.value } : option
                  );
                  updateOptions(updatedOptions);
                }}
                value={o.label}
              />
              <div
                onClick={(): void => {
                  const updatedOptions = multipleChoiceOptions.filter(
                    (_, idx) => i !== idx
                  );
                  updateOptions(updatedOptions);
                }}
                className="multiple-choice-options-remove-option-button"
              >
                X
              </div>
            </div>
          ))}
          <div
            className="multiple-choice-options-add-button"
            onClick={(): void =>
              setMultipleChoiceOptions(
                multipleChoiceOptions.concat({ label: "" })
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

export default MultipleChoiceOptions;
