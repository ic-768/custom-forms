import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

import { IForm } from "../../resources/shared";

import "./SubmitButton.scss";

const SubmitButton = ({
  buttonStyle,
}: {
  buttonStyle: IForm["styles"]["buttonStyle"];
}) => {
  const isFloating = buttonStyle === "Floating";
  const buttonClass = classNames({
    "submit-button": true,
    floating: isFloating,
  });

  return (
    <button className={buttonClass} type="submit">
      {isFloating ? <FontAwesomeIcon icon={faPaperPlane} /> : "Submit"}
    </button>
  );
};
export default SubmitButton;
