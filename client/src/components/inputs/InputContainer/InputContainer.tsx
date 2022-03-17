import { ReactElement } from "react";
import classNames from "classnames";

import "./InputContainer.scss";

interface IInputContainer {
  component: ReactElement;
  className?: string;
  label?: string;
}

/**
 * General-purpose wrapper for form inputs
 */
const InputContainer = ({ component, label, className }: IInputContainer) => {
  const inputContainerClasses = classNames({
    "input-container": true,
    [className!]: !!className,
  });

  return (
    <div className={inputContainerClasses}>
      <span className="input-label">{label}</span>
      {component}
    </div>
  );
};

export default InputContainer;
