import { ReactElement } from "react";
import classNames from "classnames";

import InputContainer from "../../InputContainer";
import MultipleChoiceInputProps, {
  MultipleChoiceOption,
} from "./MultipleChoiceInputProps";
import { emptyMultipleChoiceOption } from "resources/shared";

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

  const hasChoices = choices?.length;

  const Option = ({
    option,
  }: {
    option: MultipleChoiceOption;
  }): ReactElement => (
    <div className="multiple-choice-input-choice-container" key={option.label}>
      <div
        onClick={(): void => {
          if (!onChange) return;
          onChange(updateChoices(option));
        }}
        className="multiple-choice-input-choice-icon-container"
      >
        <input
          type="checkbox"
          defaultChecked={option.isSelected || false}
          value={option.label || ""}
        />
      </div>

      <span>{option.label}</span>
    </div>
  );

  return (
    <InputContainer
      title={title}
      className={className}
      component={
        <div style={style} className={inputClasses}>
          {hasChoices ? (
            choices.map((c, i) => <Option key={`${c.label}${i}`} option={c} />)
          ) : (
            <Option option={emptyMultipleChoiceOption} />
          )}
        </div>
      }
    />
  );
};

export default MultipleChoiceInput;
