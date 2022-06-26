import { CSSProperties, ReactElement } from "react";
import classNames from "classnames";

import "./InputContainer.scss";

interface InputContainerProps {
  component: ReactElement;
  className?: string;
  title?: string;
  subtitle?: string;
  style?: CSSProperties;
}

/**
 * General-purpose wrapper for form inputs
 */
const InputContainer = ({
  component,
  title,
  subtitle,
  className,
  style,
}: InputContainerProps): ReactElement => {
  const inputContainerClasses = classNames({
    "input-container": true,
    [className!]: !!className,
  });

  return (
    <div style={style} className={inputContainerClasses}>
      <div className="input-title-container">
        {title && <span>{title}</span>}
        {subtitle && <span className="input-subtitle">{subtitle}</span>}
      </div>
      {component}
    </div>
  );
};

export default InputContainer;
