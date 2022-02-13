import React from "react";

import classNames from "classnames";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { classIfProvided } from "../../../../helpers/classes";
import InputContainer from "../../InputContainer";

import IMultipleChoiceInput, { IChoice } from "./IMultipleChoiceInput";
import "./MultipleChoiceInput.scss";

const MultipleChoiceInput = ({
  label,
  choices,
  className,
  onChange,
  modifiers,
}: IMultipleChoiceInput) => {
  const inputClasses = classNames({
    "multiple-choice-input": true,
    ...classIfProvided(className),
  });

  const updateChoices = (choice: IChoice) =>
    choices.map((c) =>
      choice.label === c.label ? { ...c, isSelected: !c.isSelected } : c
    );

  return (
    <InputContainer
      label={label}
      component={
        // TODO destructure style and functional modifiers
        <div style={modifiers} className={inputClasses}>
          {choices.map((c) => (
            <div
              className="multiple-choice-input-choice-container"
              key={c.label}
            >
              <div
                style={modifiers}
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
