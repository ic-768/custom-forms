import { FormEventHandler, ReactElement } from "react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

import { IForm } from "resources/shared";

import "./SubmitButton.scss";

const SubmitButton = ({
  buttonStyle,
  onSubmit = (e): void => e.preventDefault(),
}: {
  buttonStyle: IForm["styles"]["buttonStyle"];
  onSubmit?: FormEventHandler;
}): ReactElement => {
  const isFloating = buttonStyle === "floating";
  const buttonClass = classNames({
    "submit-button": true,
    floating: isFloating,
  });

  return (
    <button className={buttonClass} type="submit" onClick={onSubmit}>
      {isFloating ? <FontAwesomeIcon icon={faPaperPlane} /> : "Submit"}
    </button>
  );
};
export default SubmitButton;
