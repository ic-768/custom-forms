import { ReactElement } from "react";
import classNames from "classnames";

import { CustomInputStyles } from "resources/shared";

import "./InputContainer.scss";

interface InputContainerProps {
  component: ReactElement;
  className?: string;
  title?: string;
  subtitle?: string;
  style?: CustomInputStyles;
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

  const { titleColor, ...containerStyle } = { ...style };

  return (
    <div style={containerStyle} className={inputContainerClasses}>
      <div className="input-title-container">
        {title && <span style={{ color: titleColor }}>{title}</span>}
        {subtitle && <span className="input-subtitle">{subtitle}</span>}
      </div>
      {component}
    </div>
  );
};

export default InputContainer;
