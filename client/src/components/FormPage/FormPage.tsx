import classNames from "classnames";
import { FormEvent, ReactElement } from "react";

import "./FormPage.scss";

const FormPage = ({
  content,
  onSubmit,
  className,
}: {
  content: ReactElement;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  className?: string;
}) => {
  const formClass = classNames({
    "form-page": true,
    [className!]: className,
  });

  return (
    <form className={formClass} onSubmit={onSubmit}>
      {content}
      <button className="form-page-submit-button" type="submit">
        Submit
      </button>
    </form>
  );
};
export default FormPage;
