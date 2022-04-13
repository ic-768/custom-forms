import { CSSProperties } from "react";
import classNames from "classnames";

import "./TextDescription.scss";

export interface ITextDescription {
  type?: "Text-Description";
  title?: string;
  text?: string;
  style?: CSSProperties;
  id?: string;
}

// TODO destructure styles and pass them to appropriate element
const TextDescription = ({ title, text, style }: ITextDescription) => {
  const descriptionClasses = classNames({
    "text-description-body": true,
    "has-placeholder": !text,
  });

  const descriptionStyles = style
    ? {
        height: style?.height,
        borderColor: style?.borderColor,
        borderWidth: style?.borderWidth,
        fontSize: style?.fontSize,
        marginBottom: style?.marginBottom,
        marginTop: style?.marginTop,
      }
    : undefined;

  return (
    <div className="text-description-container">
      {title && <span>{title}</span>}

      <span style={descriptionStyles} className={descriptionClasses}>
        {text || "Your explanatory text will go here"}
      </span>
    </div>
  );
};

export default TextDescription;
