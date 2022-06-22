import { FormEvent, ReactElement } from "react";
import classNames from "classnames";

import { FormProps } from "resources/shared";
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
  styles: FormProps["styles"];
}): ReactElement => {
  const formClass = classNames({
    form: true,
    [className!]: className,
  });

  const backgroundImage = styles.backgroundImage
    ? `url(${styles.backgroundImage})`
    : undefined;

  return (
    <form
      style={{
        backgroundColor: styles.backgroundColor,
        backgroundPosition: styles.backgroundPosition,
        backgroundImage,
      }}
      className={formClass}
    >
      {content}
      <SubmitButton onSubmit={onSubmit} buttonStyle={styles.buttonStyle} />
    </form>
  );
};
export default Form;
