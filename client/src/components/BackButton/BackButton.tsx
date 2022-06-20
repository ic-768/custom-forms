import { MouseEventHandler, ReactElement } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

import "./BackButton.scss";

const BackButton = ({
  link = "/",
  onClick,
  className,
}: {
  link?: string;
  onClick?: MouseEventHandler;
  className?: string;
}): ReactElement => {
  const buttonClasses = classNames({
    "back-button": true,
    [className!]: className,
  });
  return (
    <Link className={buttonClasses} to={link} onClick={onClick}>
      <FontAwesomeIcon title="Go back" icon={faArrowLeft} />
    </Link>
  );
};
export default BackButton;
