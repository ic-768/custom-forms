import classNames from "classnames";
import { FormEvent, ReactElement } from "react";

import { IForm } from "resources/shared";
import SubmitButton from "../SubmitButton";

import "./FormPage.scss";

const FormPage = ({
  content,
  onSubmit,
  className,
  styles,
}: {
  content: ReactElement;
  onSubmit?: (e: FormEvent<HTMLButtonElement>) => void;
  className?: string;
  styles: IForm["styles"];
}) => {
  const formClass = classNames({
    "form-page": true,
    [className!]: className,
  });

  const backgroundImage = styles.backgroundImage
    ? `url(${styles.backgroundImage})`
    : undefined;

  return (
    <form
      style={{
        backgroundColor: styles.backgroundColor,
        backgroundImage,
        backgroundPosition: styles.backgroundPosition,
      }}
      className={formClass}
    >
      {content}
      <SubmitButton onSubmit={onSubmit} buttonStyle={styles.buttonStyle} />
    </form>
  );
};
export default FormPage;
