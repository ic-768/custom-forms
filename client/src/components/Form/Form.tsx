import { FormEvent, ReactElement } from "react";
import classNames from "classnames";

import { FormStyles } from "resources/shared";
import SubmitButton from "../SubmitButton";

import "./Form.scss";

const Form = ({
  content,
  onSubmit,
  className,
  styles,
}: {
  content: ReactElement;
  onSubmit?: (e: FormEvent<HTMLButtonElement>) => void;
  className?: string;
  styles: FormStyles;
}): ReactElement => {
  const formClass = classNames({
    form: true,
    [className!]: className,
  });

  const { backgroundColor, backgroundPosition, buttonStyle } = { ...styles };

  const backgroundImage = styles.backgroundImage
    ? `url(${styles.backgroundImage})`
    : undefined;

  return (
    <form
      style={{
        backgroundColor: backgroundColor,
        backgroundPosition: backgroundPosition,
        backgroundImage,
      }}
      className={formClass}
    >
      {content}
      <SubmitButton onSubmit={onSubmit} buttonStyle={buttonStyle} />
    </form>
  );
};
export default Form;
