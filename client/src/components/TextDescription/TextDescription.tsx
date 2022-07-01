import { ReactElement } from "react";
import classNames from "classnames";

import { CustomInputStyles } from "resources/shared";

import "./TextDescription.scss";

export interface TextDescriptionProps {
  type?: "Text-Description";
  title?: string;
  text?: string;
  style?: CustomInputStyles;
  id?: string;
}

const TextDescription = ({
  title,
  text,
  style,
}: TextDescriptionProps): ReactElement => {
  const descriptionClasses = classNames({
    "text-description-body": true,
    "has-placeholder": !text,
  });

  const { titleColor, marginTop, ...innerStyle } = { ...style };

  return (
    <div style={{ marginTop }} className="text-description-container">
      {title && <span style={{ color: titleColor }}>{title}</span>}

      <span style={innerStyle} className={descriptionClasses}>
        {text || "Your explanatory text will go here"}
      </span>
    </div>
  );
};

export default TextDescription;
