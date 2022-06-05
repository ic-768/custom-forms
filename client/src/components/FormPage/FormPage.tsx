import classNames from "classnames";
import { FormEvent, ReactElement } from "react";

import { IForm } from "../../resources/shared";
import SubmitButton from "../SubmitButton";

import "./FormPage.scss";

const FormPage = ({
  content,
  onSubmit,
  className,
  styles,
}: {
  content: ReactElement;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  className?: string;
  styles: IForm["styles"];
}) => {
  const formClass = classNames({
    "form-page": true,
    [className!]: className,
  });

  return (
    <form className={formClass} onSubmit={onSubmit}>
      {content}
      <SubmitButton buttonStyle={styles.buttonStyle} />
    </form>
  );
};
export default FormPage;
