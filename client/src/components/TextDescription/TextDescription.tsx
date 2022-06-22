import { CSSProperties, ReactElement } from "react";
import classNames from "classnames";

import "./TextDescription.scss";

export interface TextDescriptionProps {
  type?: "Text-Description";
  title?: string;
  text?: string;
  style?: CSSProperties;
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

  return (
    <div className="text-description-container">
      {title && <span>{title}</span>}

      <span style={style} className={descriptionClasses}>
        {text || "Your explanatory text will go here"}
      </span>
    </div>
  );
};

export default TextDescription;
