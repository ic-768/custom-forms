import classNames from "classnames";
import React from "react";
import { classIfProvided } from "../../../helpers/classes";
import * as InputTypes from "../inputComponents/types";

interface IInputContainer {
  component: typeof InputTypes;
  className?: string;
  label?: string;
}

/**
 * General-purpose wrapper for form inputs
 */
const InputContainer = ({ component, label, className }: IInputContainer) => {
  const inputContainerClasses = classNames({
    "input-container": true,
    ...classIfProvided(className),
  });

  return (
    <div className={inputContainerClasses}>
      <span className="input-label">{label}</span>
      {component}
    </div>
  );
};

export default InputContainer;
