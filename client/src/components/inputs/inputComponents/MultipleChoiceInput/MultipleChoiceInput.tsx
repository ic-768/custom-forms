import classNames from "classnames";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import InputContainer from "../../InputContainer";
import IMultipleChoiceInput, { IChoice } from "./IMultipleChoiceInput";

import "./MultipleChoiceInput.scss";

const MultipleChoiceInput = ({
  label,
  choices,
  className,
  onChange,
  style,
}: IMultipleChoiceInput) => {
  const inputClasses = classNames({
    "multiple-choice-input": true,
    [className!]: !!className,
  });

  const updateChoices = (choice: IChoice) =>
    choices.map((c) =>
      choice.label === c.label ? { ...c, isSelected: !c.isSelected } : c
    );

  return (
    <InputContainer
      label={label}
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
                  style={style}
                  onClick={() => {
                    onChange(updateChoices(c));
                  }}
                  className="multiple-choice-input-choice-icon-container"
                >
                  {c.isSelected && <FontAwesomeIcon icon={faCheck} />}
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
