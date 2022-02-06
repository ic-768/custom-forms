import React from "react";

import classNames from "classnames";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { classIfProvided } from "../../helpers/classes";

import IMultipleChoiceInput, { IChoice } from "./IMultipleChoiceInput";
import "./MultipleChoiceInput.scss";

const MultipleChoiceInput = ({
  choices,
  className,
  onChange,
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
    <div className={inputClasses}>
      {choices.map((c) => (
        <div className="multiple-choice-input-choice-container" key={c.label}>
          <div
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
  );
};

export default MultipleChoiceInput;
