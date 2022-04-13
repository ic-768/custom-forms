import { ReactElement } from "react";
import classNames from "classnames";

import "./InputContainer.scss";

interface IInputContainer {
  component: ReactElement;
  className?: string;
  title?: string;
  subtitle?: string;
}

/**
 * General-purpose wrapper for form inputs
 */
const InputContainer = ({
  component,
  title,
  subtitle,
  className,
}: IInputContainer) => {
  const inputContainerClasses = classNames({
    "input-container": true,
    [className!]: !!className,
  });

  return (
    <div className={inputContainerClasses}>
      <div className="input-title-container">
        {title && <span>{title}</span>}
        {subtitle && <span className="input-subtitle">{subtitle}</span>}
      </div>
      {component}
    </div>
  );
};

export default InputContainer;
