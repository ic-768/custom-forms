import { ReactElement } from "react";
import classNames from "classnames";

import InputContainer from "../../InputContainer";
import MultipleChoiceInputProps, {
  MultipleChoiceOption,
} from "./MultipleChoiceInputProps";

import "./MultipleChoiceInput.scss";

const MultipleChoiceInput = ({
  title,
  choices,
  className,
  onChange,
  style,
}: MultipleChoiceInputProps): ReactElement => {
  const inputClasses = classNames({
    "multiple-choice-input": true,
    [className!]: !!className,
  });

  const updateChoices = (
    choice: MultipleChoiceOption
  ): MultipleChoiceOption[] =>
    choices.map((c) =>
      choice.label === c.label ? { ...c, isSelected: !c.isSelected } : c
    );

  return (
    <InputContainer
      title={title}
      className={className}
      component={
        <div style={style} className={inputClasses}>
          {choices &&
            choices.map((c) => (
              <div
                className="multiple-choice-input-choice-container"
                key={c.label}
              >
                <div
                  onClick={(): void => {
                    if (!onChange) return;
                    onChange(updateChoices(c));
                  }}
                  className="multiple-choice-input-choice-icon-container"
                >
                  <input
                    type="checkbox"
                    defaultChecked={c.isSelected || false}
                    value={c.label || ""}
                  />
                </div>

                <span>{c.label}</span>
              </div>
            ))}
        </div>
      }
    />
  );
};

export default MultipleChoiceInput;
